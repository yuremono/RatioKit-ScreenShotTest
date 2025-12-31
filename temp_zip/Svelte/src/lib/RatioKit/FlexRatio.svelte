<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** クラス名 (flex55, flex46 等を指定) / Class name */
    class?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** 子要素 (2つの直系子要素を想定) / Child elements */
    children?: Snippet;
  }

  let { 
    class: className = "mb-0", 
    style = "", 
    children 
  }: Props = $props();
</script>

<div class="{className}" {style}>
  {@render children?.()}
</div>

