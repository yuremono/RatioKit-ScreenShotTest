<script lang="ts">
  /**
   * Cards コンポーネント (Cards)
   * カード状の要素をグリッド配置するための親コンポーネントです。
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

<div class="cards {className}" {style}>
  {#if children}
    {@render children()}
  {/if}
</div>

