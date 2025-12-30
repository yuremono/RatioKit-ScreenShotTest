<script lang="ts">
  /**
   * FlexRatio コンポーネント (Flex Ratio Component)
   * 2つの要素を指定された比率 (flex55, flex46 等) で並べます。
   */
  let { 
    class: className = "mb-0", 
    style = {}, 
    children 
  } = $props<{
    class?: string;
    style?: any;
    children?: import('svelte').Snippet;
  }>();
</script>

<div class="{className}" {style}>
  {#if children}
    {@render children()}
  {/if}
</div>

