<script>
import Main from '../components/Main';
import RBAC from '../components/RBAC';

export default {
  components: { RBAC, Main },
  layout:     'plain',
  head() {
    return { title: 'Opni - RBAC' };
  }
};
</script>
<template>
  <Main>
    <RBAC />
  </Main>
</template>
