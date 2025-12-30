<script setup lang="ts">
/**
 * Cards コンポーネント (Cards)
 * カード状の要素をグリッド配置するための親コンポーネントです。
 */
interface Props {
  /** モディファイアクラス (col3, col4, min2, is_layer 等) */
  class?: string;
  /** インラインスタイル */
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  class: "mb-0"
});
</script>

<template>
  <div :class="['cards', props.class]" :style="style">
    <slot></slot>
  </div>
</template>

