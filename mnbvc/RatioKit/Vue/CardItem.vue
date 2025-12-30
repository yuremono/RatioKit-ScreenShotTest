<script setup lang="ts">
/**
 * CardItem コンポーネント (Card Item Component)
 * Cards コンポーネントの子要素として使用する個別カードです。
 */
interface Props {
  /** モディファイアクラス (sheet, board 等) */
  className?: string;
  /** インラインスタイル */
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  className: ""
});
</script>

<template>
  <div :class="['item', $slots.figure ? 'has_img' : '', className]" :style="style">
    <figure v-if="$slots.figure">
      <slot name="figure"></slot>
    </figure>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

