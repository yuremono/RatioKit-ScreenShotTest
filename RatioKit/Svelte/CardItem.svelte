<script lang="ts">
  /**
   * CardItem コンポーネント (Card Item Component)
   * Cards コンポーネントの子要素として使用する個別カードです。
   */
  let { 
    className = "", 
    style = {}, 
    figure, 
    children 
  } = $props<{
    className?: string;
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
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

