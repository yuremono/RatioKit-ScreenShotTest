<script setup lang="ts">
/**
 * Panel コンポーネント (Panel)
 * 画像とテキストのセット（ステップ表示など）を管理する親コンポーネントです。
 */
interface Props {
  /** モディファイアクラス (is_flow, img20, img30, bp-sm 等) */
  class?: string;
  /** インラインスタイル */
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  class: "mb-0"
});
</script>

<template>
  <div :class="['panel', props.class]" :style="style">
    <slot></slot>
  </div>
</template>

