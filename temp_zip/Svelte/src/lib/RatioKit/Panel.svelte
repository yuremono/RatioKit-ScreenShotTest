<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** クラス名 (is_flow, img20 等を指定) / Class name */
    class?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** パネル要素群 (PanelItem 等を想定) / Child panel elements */
    children?: Snippet;
  }

  let { 
    class: className = "mb-0", 
    style = "", 
    children 
  }: Props = $props();
</script>

<div class="panel {className}" {style}>
  {@render children?.()}
</div>

