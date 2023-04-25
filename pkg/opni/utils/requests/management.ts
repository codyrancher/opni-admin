import axios, { AxiosResponse } from 'axios';
import { TokensResponse, Token } from '../../models/Token';
import {
  Cluster, ClustersResponse, HealthResponse, CapabilityStatusResponse, ClusterResponse
} from '../../models/Cluster';
import { LABEL_KEYS } from '../../models/shared';
import { GatewayConfig, ConfigDocument } from '../../models/Config';
import { MatchLabel, Role, RolesResponse } from '../../models/Role';
import { RoleBinding, RoleBindingsResponse } from '../../models/RoleBinding';
import { base64Encode } from '../crypto';

export async function installCapabilityV2(capability: string, clusterId: string) {
  return (await axios.post(`opni-api/management/clusters/${ clusterId }/capabilities/${ capability }/install`)).data;
}

export async function uninstallCapabilityStatusV2(capability: string, clusterId: string) {
  return await axios.get(`opni-api/management/clusters/${ clusterId }/capabilities/${ capability }/uninstall/status`);
}

export interface CapabilityInstallerResponse {
  command: string;
}

export interface DashboardGlobalSettings {
  defaultImageRepository?: string;
  defaultTokenTtl?: string;
  defaultTokenLabels?: { [key: string]: string };
}
export interface DashboardSettings {
  global?: DashboardGlobalSettings;
  user?: { [key: string]: string };
}

export async function getTokens(vue: any) {
  const tokensResponse = (await axios.get<TokensResponse>(`opni-api/management/tokens`)).data.items;

  return tokensResponse.map(tokenResponse => new Token(tokenResponse, vue));
}

export async function getDefaultImageRepository() {
  return (await axios.get<DashboardSettings>(`opni-api/management/dashboard/settings`)).data.global?.defaultImageRepository;
}

export async function getCapabilities(vue: any) {
  const capabilitiesResponse = (await axios.get<any>(`opni-api/management/capabilities`)).data.items;

  return capabilitiesResponse;
}

export function uninstallCapability(clusterId: string, capability: string, deleteStoredData: boolean, vue: any) {
  const initialDelay = deleteStoredData ? { initialDelay: '1m' } : {};

  return axios.post<any>(`opni-api/management/clusters/${ clusterId }/capabilities/${ capability }/uninstall`, { options: { ...initialDelay, deleteStoredData } });
}

export async function cancelCapabilityUninstall(clusterId: string, capabilityName: string) {
  await axios.post(`opni-api/management/clusters/${ clusterId }/capabilities/${ capabilityName }/uninstall/cancel`, {
    name:    capabilityName,
    cluster: { id: clusterId }
  });
}

export async function uninstallCapabilityStatus(clusterId: string, capability: string, vue: any) {
  return (await axios.get<CapabilityStatusResponse>(`opni-api/management/clusters/${ clusterId }/capabilities/${ capability }/uninstall/status`)).data;
}

export async function getCapabilityInstaller(capability: string, token: string, pin: string) {
  return (await axios.post<CapabilityInstallerResponse>(`opni-api/management/capabilities/${ capability }/installer`, {
    token,
    pin,
  })).data.command;
}

export async function createToken(ttlInSeconds: string, name: string | null, capabilities: any[]) {
  const labels = name ? { labels: { [LABEL_KEYS.NAME]: name } } : { labels: {} };

  const raw = (await axios.post<any>(`opni-api/management/tokens`, {
    ttl: ttlInSeconds,
    ...labels,
    capabilities,
  })).data;

  return new Token(raw, null);
}

export function deleteToken(id: string): Promise<undefined> {
  return axios.delete(`opni-api/management/tokens/${ id }`);
}

export interface CertResponse {
  issuer: string;
  subject: string;
  isCA: boolean;
  notBefore: string;
  notAfter: string;
  fingerprint: string;
}

export interface CertsResponse {
  chain: CertResponse[];
}

export async function getCerts(): Promise<CertResponse[]> {
  return (await axios.get<CertsResponse>(`opni-api/management/certs`)).data.chain;
}

export async function getClusterFingerprint() {
  const certs = await getCerts();

  return certs.length > 0 ? certs[certs.length - 1].fingerprint : {};
}

export async function updateCluster(id: string, name: string, labels: { [key: string]: string }) {
  labels = { ...labels, [LABEL_KEYS.NAME]: name };
  if (name === '') {
    delete labels[LABEL_KEYS.NAME];
  }
  (await axios.put<any>(`opni-api/management/clusters/${ id }`, {
    cluster: { id },
    labels
  }));
}

export async function getClusters(vue: any): Promise<Cluster[]> {
  const clustersResponse = (await axios.get<ClustersResponse>(`opni-api/management/clusters`)).data.items;
  const healthResponses = await Promise.allSettled(clustersResponse.map(clustersResponse => axios.get<HealthResponse>(`opni-api/management/clusters/${ clustersResponse.id }/health`)));

  const notConnected: HealthResponse = {
    status: { connected: false },
    health: { ready: false, conditions: [] }
  };

  return clustersResponse.map((clusterResponse, i) => {
    if (healthResponses[i].status === 'fulfilled') {
      return new Cluster(clusterResponse, (healthResponses[i] as PromiseFulfilledResult<AxiosResponse<HealthResponse>>).value.data, vue);
    }

    return new Cluster(clusterResponse, notConnected, vue);
  });
}

export async function getCluster(id: string, vue: any) {
  const clusterResponse = (await axios.get<ClusterResponse>(`opni-api/management/clusters/${ id }`)).data;

  return new Cluster(clusterResponse, null as any, vue);
}

export function deleteCluster(id: string): Promise<undefined> {
  return axios.delete(`opni-api/management/clusters/${ id }`);
}

export async function getRoles(vue: any): Promise<Role[]> {
  const rolesResponse = (await axios.get<RolesResponse>(`opni-api/management/roles`)).data.items;

  return rolesResponse.map(roleResponse => new Role(roleResponse, vue));
}

export function deleteRole(id: string): Promise<undefined> {
  return axios.delete(`opni-api/management/roles/${ id }`);
}

export async function createRole(name: string, clusterIDs: string[], matchLabels: MatchLabel) {
  (await axios.post<any>(`opni-api/management/roles`, {
    id: name, clusterIDs, matchLabels
  }));
}

export async function getRoleBindings(vue: any): Promise<RoleBinding[]> {
  const roleBindingsResponse = (await axios.get<RoleBindingsResponse>(`opni-api/management/rolebindings`)).data.items;

  return roleBindingsResponse.map(roleBindingResponse => new RoleBinding(roleBindingResponse, vue));
}

export function deleteRoleBinding(id: string): Promise<undefined> {
  return axios.delete(`opni-api/management/rolebindings/${ id }`);
}

export async function createRoleBinding(name: string, roleName: string, subjects: string[]) {
  (await axios.post<any>(`opni-api/management/rolebindings`, {
    id: name, roleId: roleName, subjects
  }));
}

export async function getGatewayConfig(vue: any): Promise<ConfigDocument[]> {
  const config = (await axios.get<GatewayConfig>(`opni-api/management/config`)).data;

  return config.documents.map(configDocument => new ConfigDocument(configDocument, vue));
}

export function updateGatewayConfig(jsonDocuments: string[]): Promise<undefined> {
  const documents = [];

  for (const jsonDocument of jsonDocuments) {
    documents.push({ json: base64Encode(jsonDocument) });
  }

  return axios.put(`opni-api/management/config`, { documents });
}
