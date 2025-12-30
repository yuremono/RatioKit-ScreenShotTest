<script lang="ts">
  /**
   * ImgText コンポーネント (Image Text Component)
   * 画像 (figure) とテキストコンテンツを並べて表示します。
   */
  let { 
    class: className = "mb-0", 
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

<div class="img_text {figure ? 'has_img' : ''} {className}" {style}>
  {#if figure}
    <figure>{@render figure()}</figure>
  {/if}
  <div>
    {@render children?.()}
  </div>
</div>

