<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** クラス名 (is_rev 等を指定) / Class name */
    className?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** 画像エリア (Snippet) / Image content */
    figure?: Snippet;
    /** コンテンツ本体 (Snippet) / Main content */
    children?: Snippet;
  }

  let { 
    className = "", 
    style = "", 
    figure, 
    children 
  }: Props = $props();
</script>

<div class="item {figure ? 'has_img' : ''} {className}" {style}>
  <div>
    {#if children}
      {@render children()}
    {/if}
  </div>
  {#if figure}
    <figure>{@render figure()}</figure>
  {/if}
</div>

<style>
  /* 既存の RatioKit.scss で制御されます */
</style>
