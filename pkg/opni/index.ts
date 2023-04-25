import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import { NAVIGATION } from './router';
import { flattenNavigation } from './utils/navigation';

// Init the package
export default function(plugin: IPlugin, context: any) {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  // Load a product
  plugin.addProduct(require('./product'));

  if (!context.app.$config.isStandalone) {
    const flatNavigation = flattenNavigation(NAVIGATION);

    plugin.addRoutes(flatNavigation);
  }
}
