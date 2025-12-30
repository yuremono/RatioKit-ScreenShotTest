<script lang="ts">
  /**
   * Accordion コンポーネント (Accordion)
   * details/summary タグを使用した折りたたみ可能なコンテンツです。
   */
  let { 
    title, 
    className = "mb-0", 
    style = {}, 
    open = false,
    figureTitle,
    figure,
    children 
  } = $props<{
    title: string;
    className?: string;
    style?: any;
    open?: boolean;
    figureTitle?: import('svelte').Snippet;
    figure?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }>();
</script>

<details class="accordion {className}" {style} {open}>
  <summary>
    {#if figureTitle}
      <div class="has_img">
        <figure>{@render figureTitle()}</figure>
        <div>{title}</div>
      </div>
    {:else}
      {title}
    {/if}
  </summary>
  <div>
    {#if figure}
      <div class="has_img">
        <figure>{@render figure()}</figure>
        <div>
          {#if children}
            {@render children()}
          {/if}
        </div>
      </div>
    {:else if children}
      {@render children()}
    {/if}
  </div>
</details>

