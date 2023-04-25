import axios from 'axios';

export const NAME = 'AI Chat';
export function init(plugin: any, store: any) {
  const {
    product,
    // basicType,
    // configureType,
    // virtualType,
    // headers,
    // hideBulkActions,
  } = plugin.DSL(store, NAME);
  product({
    inStore:             'management',
    icon:                'gear',
    label:               'AI Chat',
    removable:           false,
    showClusterSwitcher: false,
    category:            'global',
    to:                  { name: 'ai-chat' }
  });
}
