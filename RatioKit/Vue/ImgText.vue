<script setup lang="ts">
/**
 * ImgText コンポーネント (Image Text Component)
 * 画像 (figure) とテキストコンテンツを並べて表示します。
 */
interface Props {
  /** モディファイアクラス (img30, is_rev, bp-sm 等) */
  className?: string;
  /** インラインスタイル */
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  className: "mb-0"
});
</script>

<template>
  <div :class="['img_text', $slots.figure ? 'has_img' : '', className]" :style="style">
    <figure v-if="$slots.figure">
      <slot name="figure"></slot>
    </figure>
    <div>
      <slot></slot>
    </div>
  </div>
</template>


<style scoped>
/* このコンポーネント固有のスタイルが必要な場合はここに記述してください */
</style>
