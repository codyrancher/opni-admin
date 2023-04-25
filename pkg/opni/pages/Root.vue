<script>
import Root from '../components/Root';

export default {
  components: { Root },
  layout:     'plain',
  created() {
    if (this.$config.isStandalone) {
      this.$router.push({ name: 'agents' });
    }
  },
  head() {
    return { title: 'Opni' };
  }
};
</script>
<template>
  <Root />
</template>
