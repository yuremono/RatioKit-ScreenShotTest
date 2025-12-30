<script setup lang="ts">
/**
 * Accordion コンポーネント (Accordion)
 * details/summary タグを使用した折りたたみ可能なコンテンツです。
 */
interface Props {
  /** 概要部分のテキスト */
  title: string;
  /** モディファイアクラス (is_qa, bp-sm 等) */
  className?: string;
  /** インラインスタイル */
  style?: any;
  /** 初期状態で開くかどうか */
  open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  className: "mb-0",
  open: false
});
</script>

<template>
  <details :class="['accordion', className]" :style="style" :open="open">
    <summary>
      <!-- タイトル部分の画像がある場合 -->
      <div v-if="$slots.figureTitle" class="has_img">
        <figure><slot name="figureTitle"></slot></figure>
        <div>{{ title }}</div>
      </div>
      <template v-else>
        {{ title }}
      </template>
    </summary>
    <div>
      <!-- コンテンツ部分の画像がある場合 -->
      <div v-if="$slots.figure" class="has_img">
        <figure><slot name="figure"></slot></figure>
        <div><slot></slot></div>
      </div>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </details>
</template>


<style scoped>
/* このコンポーネント固有のスタイルが必要な場合はここに記述してください */
</style>
