<script>
import Main from '../components/Main';
import WorkloadModelConfig from '../components/WorkloadModelConfig';

export default {
  components: { WorkloadModelConfig, Main },
  layout:     'plain',
  head() {
    return { title: 'Opni - Workload' };
  }
};
</script>
<template>
  <Main>
    <WorkloadModelConfig />
  </Main>
</template>
