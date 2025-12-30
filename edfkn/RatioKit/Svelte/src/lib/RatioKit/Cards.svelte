<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** クラス名 (col3, colflex 等を指定) / Class name */
    className?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** カード要素群 (CardItem 等を想定) / Child card elements */
    children?: Snippet;
  }

  let { 
    className = "mb-0", 
    style = "", 
    children 
  }: Props = $props();
</script>

<div class="cards {className}" {style}>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  /* 既存の RatioKit.scss で制御されます */
</style>
