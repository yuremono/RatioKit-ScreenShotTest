<script setup lang="ts">
/**
 * Cards コンポーネント (Cards)
 * カード状の要素をグリッド配置するための親コンポーネントです。
 */
interface Props {
  /** モディファイアクラス (col3, col4, min2, is_layer 等) */
  className?: string;
  /** インラインスタイル */
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  className: "mb-0"
});
</script>

<template>
  <div :class="['cards', className]" :style="style">
    <slot></slot>
  </div>
</template>


<style scoped>
/* このコンポーネント固有のスタイルが必要な場合はここに記述してください */
</style>
