export function getOpniUrlPrefix() {
  const isStandalone = (window as any).__NUXT__.config.isStandalone;

  return isStandalone ? '' : 'testing';
}
