<script>
import Main from '../components/Main';
import SLO from '../components/SLO';

export default {
  components: { SLO, Main },
  layout:     'plain',
  head() {
    return { title: 'Opni - SLO' };
  }
};
</script>
<template>
  <Main>
    <SLO />
  </Main>
</template>
