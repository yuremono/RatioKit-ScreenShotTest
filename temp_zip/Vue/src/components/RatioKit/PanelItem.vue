<script setup lang="ts">
/**
 * PanelItem コンポーネント (Panel Item Component)
 * Panel コンポーネントの子要素です。テキストの後に画像が来る構造を持ちます。
 */
interface Props {
  /** モディファイアクラス (is_rev 等) */
  class?: string;
  /** インラインスタイル */
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  class: ""
});
</script>

<template>
  <div :class="['item', $slots.figure ? 'has_img' : '', props.class]" :style="style">
    <div>
      <slot></slot>
    </div>
    <figure v-if="$slots.figure">
      <slot name="figure"></slot>
    </figure>
  </div>
</template>


