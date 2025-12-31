<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** クラス名 (sheet, board 等を指定) / Class name */
    class?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** 画像エリア (Snippet) / Image content */
    figure?: Snippet;
    /** コンテンツ本体 (Snippet) / Main content */
    children?: Snippet;
  }

  let { 
    class: className = "", 
    style = "", 
    figure, 
    children 
  }: Props = $props();
</script>

<div class="item {figure ? 'has_img' : ''} {className}" {style}>
  {#if figure}
    <figure>{@render figure()}</figure>
  {/if}
  <div>
    {@render children?.()}
  </div>
</div>

