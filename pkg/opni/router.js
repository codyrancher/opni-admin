import Vue from 'vue';
import Router from 'vue-router';

import WorkloadModelConfig from './pages/WorkloadModelConfig';
import SLO from './pages/SLO';
import Endpoints from './pages/Endpoints';
import Endpoint from './pages/Endpoint';
import Alarms from './pages/Alarms';
import Alarm from './pages/Alarm';
import AlertingOverview from './pages/AlertingOverview';
import AlertingBackend from './pages/AlertingBackend';
import AiOpsBackend from './pages/AiOpsBackend';
import MonitoringBackend from './pages/MonitoringBackend';
import Agent from './pages/Agent';
import Roles from './pages/Roles';
import Role from './pages/Role';
import RoleBindings from './pages/RoleBindings';
import RoleBinding from './pages/RoleBinding';
import Configuration from './pages/Configuration';
import LoggingBackend from './pages/LoggingBackend';
import SLOs from './pages/SLOs';
import Agents from './pages/Agents';
import Root from './pages/Root';
import { createRoutesFromNavigation } from './utils/navigation';

Vue.use(Router);

export const NAVIGATION = {
  routes: [
    {
      name:      'opni',
      path:      '/',
      component: Root,
      display:   false
    },
    {
      name:      'agents',
      path:      '/agents',
      labelKey:  'opni.nav.agents',
      component: Agents,
      routes:    [
        {
          name:      'agent-create',
          path:      '/create',
          labelKey:  'opni.nav.clusters',
          component: Agent,
          display:   false
        },
      ]
    },
    {
      name:      'logging-config',
      path:      '/logging-config',
      labelKey:  'opni.nav.loggingConfig',
      component: LoggingBackend,
      display:   true
    },
    {
      name:      'monitoring',
      path:      '/monitoring',
      labelKey:  'opni.nav.monitoring',
      component: MonitoringBackend,
      display:   true,
      routes:    [
        {
          name:     'rbac',
          path:     '/rbac',
          labelKey: 'opni.nav.rbac',
          display:   true,
          redirect: { name: 'roles' },
          routes:   [
            {
              name:      'roles',
              path:      '/roles',
              labelKey:  'opni.nav.roles',
              component: Roles,
              routes:    [
                {
                  name:      'role-create',
                  path:      '/create',
                  labelKey:  'opni.nav.roles',
                  component: Role,
                  display:   false
                },
              ]
            },
            {
              name:      'role-bindings',
              path:      '/role-bindings',
              labelKey:  'opni.nav.roleBindings',
              component: RoleBindings,
              routes:    [
                {
                  name:      'role-binding-create',
                  path:      '/create',
                  labelKey:  'opni.nav.roleBindings',
                  component: RoleBinding,
                  display:   false
                },
              ]
            },
          ]
        },
      ]
    },
    {
      name:      'alerting',
      path:      '/alerting',
      labelKey:  'opni.nav.alerting',
      display:   true,
      component: AlertingBackend,
      routes:    [
        {
          name:      'alerting-overview',
          path:      '/overview',
          labelKey:  'opni.nav.alertingOverview',
          component: AlertingOverview,
          display:   true
        },
        {
          name:      'endpoints',
          path:      '/endpoints',
          labelKey:  'opni.nav.endpoints',
          component: Endpoints,
          display:   true,
          routes:    [
            {
              name:      'endpoint',
              path:      '/:id',
              labelKey:  'opni.nav.endpoints',
              component: Endpoint,
              display:   false
            },
            {
              name:      'endpoint-create',
              path:      '/create',
              labelKey:  'opni.nav.endpoints',
              component: Endpoint,
              display:   false
            },
          ]
        },
        {
          name:      'alarms',
          path:      '/alarms',
          labelKey:  'opni.nav.alarms',
          component: Alarms,
          display:   true,
          routes:    [
            {
              name:      'alarm',
              path:      '/:id',
              labelKey:  'opni.nav.alarms',
              component: Alarm,
              display:   false
            },
            {
              name:      'alarm-create',
              path:      '/create',
              labelKey:  'opni.nav.alarms',
              component: Alarm,
              display:   false
            },
          ]
        },
        {
          name:      'slos',
          path:      '/slos',
          labelKey:  'opni.nav.slos',
          component: SLOs,
          display:   true,
          routes:    [
            {
              name:      'slo',
              path:      '/:id',
              labelKey:  'opni.nav.slos',
              component: SLO,
              display:   false
            },
            {
              name:      'slo-create',
              path:      '/create',
              labelKey:  'opni.nav.slos',
              component: SLO,
              display:   false
            },
          ]
        },
      ]
    },
    {
      name:      'ai-ops',
      path:      '/ai-ops',
      labelKey:  'opni.nav.aiOps',
      component: AiOpsBackend,
      display:   true,
      routes:    [
        {
          name:      'workload-model-config',
          path:      '/workload-model-config',
          labelKey:  'opni.nav.workloadModel',
          component: WorkloadModelConfig,
          display:   true
        },
      ]
    },
    {
      name:      'configuration',
      path:      '/configuration',
      labelKey:  'opni.nav.configuration',
      icon:      'gear',
      component: Configuration,
      display:   true
    },
  ]
};

export function createRouter() {
  return new Router({
    mode:   'history',
    routes: createRoutesFromNavigation(NAVIGATION)
  });
}
