<script lang="ts">
  /**
   * Panel コンポーネント (Panel)
   * 画像とテキストのセット（ステップ表示など）を管理する親コンポーネントです。
   */
  let { 
    className = "mb-0", 
    style = {}, 
    children 
  } = $props<{
    className?: string;
    style?: any;
    children?: import('svelte').Snippet;
  }>();
</script>

<div class="panel {className}" {style}>
  {#if children}
    {@render children()}
  {/if}
</div>

