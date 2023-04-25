<script>
import Main from '../components/Main';
import MonitoringBackend from '../components/MonitoringBackend';

export default {
  components: { MonitoringBackend, Main },
  layout:     'plain',
  head() {
    return { title: 'Opni - Monitoring' };
  }
};
</script>
<template>
  <Main>
    <MonitoringBackend />
  </Main>
</template>
