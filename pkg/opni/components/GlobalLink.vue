<script>

import IconOrSvg from '@shell/components/IconOrSvg';

export default { components: { IconOrSvg } };
</script>

<template>
  <nuxt-link
    class="option"
    :to="{name: 'chat'}"
  >
    <IconOrSvg
      icon="icon-fleet"
    />
    <div>AI Chat</div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
  $icon-size: 25px;
  $option-padding: 4px;
  $option-height: $icon-size + $option-padding + $option-padding;

  .option {
    align-items: center;
    cursor: pointer;
    display: flex;
    color: var(--link);

    &:hover {
      text-decoration: none;
    }

    &:focus {
      outline: 0;
      > div {
        text-decoration: underline;
      }
    }

    > i {
      width: $icon-size;
      font-size: $icon-size;
      margin-right: 8px;
    }
    svg {
      margin-right: 8px;
      fill: var(--link);
    }
    img {
      margin-right: 8px;
    }

    > div {
      color: var(--link);
    }

    &:hover {
      color: var(--primary-hover-text);
      background: var(--primary-hover-bg);
      border-radius: 5px;
      > div {
        color: var(--primary-hover-text);
      }
      svg {
        fill: var(--primary-hover-text);
      }
      div {
        color: var(--primary-hover-text);
      }
    }
  }

  .option, .option-disabled {
    padding: $option-padding 0 $option-padding 10px;
  }
</style>
