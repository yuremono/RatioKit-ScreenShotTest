<script lang="ts">
  /**
   * PanelItem コンポーネント (Panel Item Component)
   * Panel コンポーネントの子要素です。テキストの後に画像が来る構造を持ちます。
   */
  let { 
    class: className = "", 
    style = {}, 
    figure, 
    children 
  } = $props<{
    class?: string;
    style?: any;
    figure?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }>();
</script>

<div class="item {figure ? 'has_img' : ''} {className}" {style}>
  <div>
    {@render children?.()}
  </div>
  {#if figure}
    <figure>{@render figure()}</figure>
  {/if}
</div>

