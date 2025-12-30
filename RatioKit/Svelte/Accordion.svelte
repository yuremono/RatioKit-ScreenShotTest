<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Props Definition
   */
  interface Props {
    /** タイトル (summary) / Accordion title */
    title: string;
    /** クラス名 (is_qa 等を指定) / Class name */
    className?: string;
    /** インラインスタイル / Inline styles */
    style?: string | Record<string, any>;
    /** 初期状態で開くかどうか / Whether to open by default */
    open?: boolean;
    /** タイトル横の画像 (Snippet) / Image next to title */
    figureTitle?: Snippet;
    /** コンテンツ内の画像 (Snippet) / Image inside content */
    figure?: Snippet;
    /** コンテンツ本体 (Snippet) / Main content */
    children?: Snippet;
  }

  let { 
    title, 
    className = "mb-0", 
    style = "", 
    open = false,
    figureTitle,
    figure,
    children 
  }: Props = $props();
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

<style>
  /* 既存の RatioKit.scss で制御されます */
</style>
