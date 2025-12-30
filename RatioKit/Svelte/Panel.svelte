<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** クラス名 (is_flow, img20 等を指定) / Class name */
    className?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** パネル要素群 (PanelItem 等を想定) / Child panel elements */
    children?: Snippet;
  }

  let { 
    className = "mb-0", 
    style = "", 
    children 
  }: Props = $props();
</script>

<div class="panel {className}" {style}>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  /* 既存の RatioKit.scss で制御されます */
</style>
