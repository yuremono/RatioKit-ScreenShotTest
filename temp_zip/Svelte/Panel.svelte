<script lang="ts">
  /**
   * Panel コンポーネント (Panel)
   * 画像とテキストのセット（ステップ表示など）を管理する親コンポーネントです。
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

<div class="panel {className}" {style}>
  {@render children?.()}
</div>

