<script setup lang="ts">
interface Props {
  className?: string;
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  className: "mb-0"
});
</script>

<template>
  <div :class="className" :style="style">
    <slot></slot>
  </div>
</template>

<style scoped>
/* このコンポーネント固有のスタイルが必要な場合はここに記述してください */
</style>
