import { Capability, CapabilityStatuses } from '../../models/Capability';
import { getClusters } from './management';

export async function getCapabilities(type: keyof CapabilityStatuses, vue: any): Promise<Capability[]> {
  const clusters = getClusters(vue);

  return (await clusters).map((c: any) => new Capability(type, c, vue));
}
