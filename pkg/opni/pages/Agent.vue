<script>
import Main from '../components/Main';
import Agent from '../components/Agent';

export default {
  components: { Agent, Main },
  layout:     'plain',
  head() {
    return { title: 'Opni - Agent' };
  }
};
</script>
<template>
  <Main>
    <Agent />
  </Main>
</template>
