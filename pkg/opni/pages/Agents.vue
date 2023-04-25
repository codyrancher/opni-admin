<script>
import Main from '../components/Main';
import AgentsStandalone from '../components/AgentsStandalone';
import AgentsExtension from '../components/AgentsExtension';

export default {
  components: {
    AgentsStandalone, AgentsExtension, Main
  },
  layout: 'plain',
  head() {
    return { title: 'Opni - Agents' };
  }
};
</script>
<template>
  <Main>
    <AgentsStandalone v-if="$config.isStandalone" />
    <AgentsExtension v-else />
  </Main>
</template>
