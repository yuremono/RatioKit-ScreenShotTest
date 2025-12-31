<script lang="ts">
  /**
   * CardItem コンポーネント (Card Item Component)
   * Cards コンポーネントの子要素として使用する個別カードです。
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
  {#if figure}
    <figure>{@render figure()}</figure>
  {/if}
  <div>
    {@render children?.()}
  </div>
</div>

