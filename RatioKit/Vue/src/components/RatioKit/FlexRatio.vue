<script setup lang="ts">
interface Props {
  class?: string;
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  class: "mb-0"
});
</script>

<template>
  <div :class="props.class" :style="style">
    <slot></slot>
  </div>
</template>

