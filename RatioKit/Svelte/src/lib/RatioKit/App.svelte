<script lang="ts">
  import ImgText from './ImgText.svelte';
  import FlexRatio from './FlexRatio.svelte';
  import Accordion from './Accordion.svelte';
  import Cards from './Cards.svelte';
  import CardItem from './CardItem.svelte';
  import Panel from './Panel.svelte';
  import PanelItem from './PanelItem.svelte';
  import '../../RatioKit.scss';
  import './SnippetModal.css';

  interface ContentItem {
    type: 'text' | 'code';
    content: string;
    title?: string;
  }

  let showModal = $state(false);
  let isSetup = $state(false);
  let modalItems = $state<ContentItem[]>([]);
  let copyStates = $state<{[key: number]: string}>({});

  const formatHTML = (html: string) => {
    let tab = '    ';
    let result = '';
    let indent = '';

    const formatted = html.replace(/</g, '\n<').replace(/>/g, '>\n');

    formatted.split('\n').forEach(function(element) {
      element = element.trim();
      if (!element) return;

      if (element.match(/^<\/\w/)) {
        indent = indent.substring(tab.length);
      }
      
      result += indent + element + '\n';
      
      if (element.match(/^<\w[^>]*[^\/]>$/) && !element.match(/^<(input|img|br|hr|meta|link)/)) {
        indent += tab;
      }
    });

    return result.trim();
  };

  const cleanAttributes = (el: HTMLElement) => {
    const attrs = el.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const name = attrs[i].name;
      if (name.startsWith('data-cursor-') || name.includes('svelte-')) {
        el.removeAttribute(name);
      }
    }
    Array.from(el.children).forEach(child => cleanAttributes(child as HTMLElement));
  };

  const openSnippetModal = (event: MouseEvent, css: string) => {
    isSetup = false;
    const btn = event.currentTarget as HTMLButtonElement;
    const section = btn.closest('section');
    if (!section) return;

    const clone = section.cloneNode(true) as HTMLElement;
    const snippetBtn = clone.querySelector('button');
    if (snippetBtn) snippetBtn.remove();
    
    cleanAttributes(clone);

    // Svelteのハイドレーション用空コメントを削除
    let html = clone.outerHTML.replace(/<!---->/g, '');
    html = formatHTML(html);
    
    const tailwindCdn = '\n\n<!-- <scr' + 'ipt src="https://cdn.tailwindcss.com"></scr' + 'ipt> -->';
    const content = html + tailwindCdn + '\n\n<style>\n' + css.trim() + '\n</style>';
    
    modalItems = [{ type: 'code', content }];
    copyStates = { 0: 'Copy' };
    showModal = true;
    document.body.style.overflow = 'hidden';
  };

  const openSetupModal = () => {
    isSetup = true;
    const items: ContentItem[] = [
      {
        type: 'text',
        content: 'Svelte版 RatioKit は、Vite 6+ および Tailwind CSS v4 環境に最適化されたスターターキット形式で提供されています。Svelte 5 の最新機能（Runes, Snippets）を活用しています。',
        title: 'Getting Started (Vite & Tailwind v4)'
      },
      {
        type: 'text',
        content: 'まず、上の「Download Zip」ボタンからファイルをダウンロードしてください。`Svelte/` フォルダに必要なファイルがすべて含まれています。',
        title: '1 Download'
      },
    {
      type: 'text',
      content: '既存の Vite プロジェクトに導入する場合、まず Sass と Tailwind v4 プラグインをインストールします。もし `npm run dev` でエラー（Pre-transform error 等）が発生した場合は、Vite のキャッシュクリア (`npx vite --force`) を試してください。',
      title: '2 Install Dependencies'
    },
      {
        type: 'code',
        content: 'npm install -D sass @tailwindcss/vite'
      },
      {
        type: 'text',
        content: '`vite.config.ts` に Tailwind v4 プラグインを登録してください。',
        title: '3 Vite Config'
      },
      {
        type: 'code',
        content: `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ratiokit': path.resolve(__dirname, './src/lib/RatioKit'),
    },
  },
  optimizeDeps: {
    // 依存関係のエラー回避用
    exclude: ['@tailwindcss/oxide', 'lightningcss']
  }
})`
      },
      {
        type: 'text',
        content: '`Svelte/src/lib/RatioKit` フォルダと `RatioKit.scss` を自身の `src/lib/` 配下にコピーしてください。',
        title: '4 Copy Files'
      },
      {
        type: 'text',
        content: 'プロジェクトのエントリファイル（`main.ts` や `+layout.svelte`）で SCSS をインポートします。Tailwind v4 の `@import "tailwindcss";` より後に読み込むようにしてください。',
        title: '5 Global Styles'
      },
      {
        type: 'code',
        content: `// main.ts 等
import './RatioKit.scss';`
      },
      {
        type: 'text',
        content: 'Svelte 5 での初期化は `mount` 関数を使用することが推奨されます。',
        title: '6 Svelte 5 Mount'
      },
      {
        type: 'code',
        content: `import { mount } from 'svelte';
import App from './App.svelte';

mount(App, { target: document.getElementById('app')! });`
      },
      {
        type: 'text',
        content: 'RatioKitのCSS変数を上書きすることで、デザインをカスタマイズ可能です。',
        title: '7 Customization'
      },
      {
        type: 'code',
        content: `:root {
  --mc: #2db542; /* メインカラー */
  --gap: 30px;   /* 余白 */
}`
      },
      {
        type: 'text',
        content: 'あとはカタログからコードをコピーして使うだけです。`{#snippet figure()}` などを活用してください。',
        title: '8 Usage Example'
      },
      {
        type: 'code',
        content: `<script>
  import { FlexRatio } from '@ratiokit';
</scr` + `ipt>

<div class="p-8">
  <FlexRatio class="flex55 mt-8">
    {#snippet children()}
      <div class="bg-gray-100 p-4">左側のコンテンツ</div>
      <div class="bg-gray-200 p-4">右側のコンテンツ</div>
    {/snippet}
  </FlexRatio>
</div>`
      }
    ];
    modalItems = items;
    const initialCopyStates: {[key: number]: string} = {};
    items.forEach((item, index) => {
      if (item.type === 'code') initialCopyStates[index] = 'Copy';
    });
    copyStates = initialCopyStates;
    showModal = true;
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    showModal = false;
    document.body.style.overflow = '';
    copyStates = {};
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/RatioKit.zip';
    link.download = 'RatioKit.zip';
    link.click();
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      copyStates[index] = 'Copied!';
      setTimeout(() => copyStates[index] = 'Copy', 2000);
    });
  };

  // React/Preview.tsx と同期したCSS
  const flexCss = `.wrapper {padding-block: var(--MY, 60px);margin-inline: var(--out, calc(50% - 50vw));max-width: unset;width: unset;position: relative;}
:where(.wrapper) > * {margin-inline: auto;max-width: 100%;}
:where(.wrapper) > * + * {margin-top: var(--MY, 60px);}
.into {padding-inline: var(--into, calc(50vw - clamp(0px, 50vw - var(--PX, 20px), var(--wid, 1080px) / 2)));}
:where(.flex55) > * { width: calc(50% - var(--gap, 30px) / 2); }
.flex46 { --few: 40%; }
:where(.flex46) > :where(:nth-child(1)) { width: calc(var(--few, 40%)); }
:where(.flex46) > :where(:nth-child(2)) { width: calc(100% - var(--few, 40%) - var(--gap, 30px)); }
.flex64 { --few: 40%; }
:where(.flex64) > :where(:nth-child(1)) { width: calc(100% - var(--few, 40%) - var(--gap, 30px)); }
:where(.flex64) > :where(:nth-child(2)) { width: calc(var(--few, 40%)); }
.flex37 { --few: 30%; }
:where(.flex37) > :where(:nth-child(1)) { width: calc(var(--few, 30%)); }
:where(.flex37) > :where(:nth-child(2)) { width: calc(100% - var(--few, 30%) - var(--gap, 30px)); }
.flex73 { --few: 30%; }
:where(.flex73) > :where(:nth-child(1)) { width: calc(100% - var(--few, 30%) - var(--gap, 30px)); }
:where(.flex73) > :where(:nth-child(2)) { width: calc(var(--few, 30%)); }
.flex28 { --few: 20%; }
:where(.flex28) > :where(:nth-child(1)) { width: calc(var(--few, 20%)); }
:where(.flex28) > :where(:nth-child(2)) { width: calc(100% - var(--few, 20%) - var(--gap, 30px)); }
.flex82 { --few: 20%; }
:where(.flex82) > :where(:nth-child(1)) { width: calc(100% - var(--few, 20%) - var(--gap, 30px)); }
:where(.flex82) > :where(:nth-child(2)) { width: calc(var(--few, 20%)); }
:is(.flex55, .flex28, .flex37, .flex46, .flex64, .flex73, .flex82) { gap: var(--gap, 30px); display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; }
:where(:is(.flex55, .flex28, .flex37, .flex46, .flex64, .flex73, .flex82)) img { width: 100%; }
@media (max-width: 767px) { :where(:is(.flex55, .flex28, .flex37, .flex46, .flex64, .flex73, .flex82)):not(.bp-sm) > * { width: 100%; } }
@media (max-width: 639px) { :where(:is(.flex55, .flex28, .flex37, .flex46, .flex64, .flex73, .flex82)):is(.bp-sm) > * { width: 100%; } }`;

  const accordionCss = `.wrapper {padding-block: var(--MY, 60px);margin-inline: var(--out, calc(50% - 50vw));max-width: unset;width: unset;position: relative;}
:where(.wrapper) > * {margin-inline: auto;max-width: 100%;}
:where(.wrapper) > * + * {margin-top: var(--MY, 60px);}
.into {padding-inline: var(--into, calc(50vw - clamp(0px, 50vw - var(--PX, 20px), var(--wid, 1080px) / 2)));}
.accordion::details-content { -webkit-transition: height 0.4s ease, content-visibility 0.4s allow-discrete; transition: height 0.4s ease, content-visibility 0.4s allow-discrete; height: 0; overflow: hidden; }
.accordion[open]::details-content { height: auto; }
:where(.accordion) summary { list-style: none; outline: none; cursor: pointer; position: relative; background-color: var(--bc, #fbf9ef); padding: 1em; padding-right: 2.5em; -webkit-transition: 0.4s; transition: 0.4s; }
:where(.accordion) summary:hover { opacity: 0.8; }
:where(.accordion) summary::-webkit-details-marker { display: none; }
:where(.accordion) summary:after { content: ">"; font-weight: 900; font-family: var(--icon, inherit); font-size: 1.5em; position: absolute; right: 1em; top: 50%; translate: 0 -50%; -webkit-transition: 0.4s; transition: 0.4s; rotate: 90deg; }
:where(.accordion)[open] summary:after { rotate: -90deg; }
:where(.accordion) > div { position: relative; padding: 1em; background-color: var(--wh, #fff); }
:where(.accordion).is_qa summary, :where(.accordion).is_qa > div { padding-left: 4em; }
:where(.accordion).is_qa summary:before, :where(.accordion).is_qa > div:before { content: ""; font-family: var(--Eng, sans-serif); color: var(--wh, #fff); background-color: var(--mc, #2db542); display: block; position: absolute; left: 1em; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); border-radius: var(--rad, 0vmin); width: 2em; aspect-ratio: 1; -ms-flex-line-pack: center; align-content: center; text-align: center; }
:where(.accordion).is_qa summary:before { content: "Q"; }
:where(.accordion).is_qa > div:before { content: "A"; background-color: var(--ac, #512db5); }`;

  const panelCss = `.wrapper {padding-block: var(--MY, 60px);margin-inline: var(--out, calc(50% - 50vw));max-width: unset;width: unset;position: relative;}
:where(.wrapper) > * {margin-inline: auto;max-width: 100%;}
:where(.wrapper) > * + * {margin-top: var(--MY, 60px);}
.into {padding-inline: var(--into, calc(50vw - clamp(0px, 50vw - var(--PX, 20px), var(--wid, 1080px) / 2)));}
.panel { position: relative; --mt: var(--MY5, 30px); --p: 1em; --bg: var(--bc, #fbf9ef); --beforeFZ: 75%; --beforeC: var(--mc, #2db542); --afterW: 2em; --afterBG: var(--sc, #3194c9); --imgW: 30%; }
:where(.panel) .item { background-color: var(--bg, var(--bc, #fbf9ef)); counter-increment: cnt; width: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; border-radius: var(--rad, 0vmin); padding: var(--p, 1em); gap: var(--gap, 30px); position: relative; }
:where(.panel) .item + .item { margin-top: var(--gap, 30px); }
:where(.panel) .item figure { width: var(--imgW, 30%); }
:where(.panel) .item figure:is(.is_rev *) { -webkit-box-ordinal-group: 0; -ms-flex-order: -1; order: -1; }
:where(.panel) .item figure img { width: 100%; height: auto; display: block; }
:where(.panel) .item > div { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; }
:where(.panel) .item > div .sub { font-size: 0.75em; color: var(--mc, #2db542); margin-right: 0.5em; }
@media (max-width: 767px) { :where(.panel) .item:not(.bp-sm) figure { width: 100%; } }
@media (max-width: 639px) { :where(.panel) .item:is(.bp-sm) figure { width: 100%; } }
:where(.panel).img20 { --imgW: 20%; } :where(.panel).img30 { --imgW: 30%; } :where(.panel).img40 { --imgW: 40%; } :where(.panel).img50 { --imgW: 50%; }
:where(.panel).is_flow .item + .item { margin-top: calc(var(--afterW, 2em) + 2em); }
:where(.panel).is_flow .item:after { content: ""; display: block; position: absolute; top: calc(100% + 1em); left: 50%; -webkit-transform: translateX(-50%); transform: translateY(-50%); width: var(--afterW, 2em); aspect-ratio: 1; background-color: var(--afterBG, var(--sc, #3194c9)); -webkit-clip-path: polygon(0 0%, 50% 85%, 100% 0%); clip-path: polygon(0 0%, 50% 85%, 100% 0%); }
:where(.panel).is_flow .item:last-child:after { display: none; }`;

  const imgTextCss = `.wrapper {padding-block: var(--MY, 60px);margin-inline: var(--out, calc(50% - 50vw));max-width: unset;width: unset;position: relative;}
:where(.wrapper) > * {margin-inline: auto;max-width: 100%;}
:where(.wrapper) > * + * {margin-top: var(--MY, 60px);}
.into {padding-inline: var(--into, calc(50vw - clamp(0px, 50vw - var(--PX, 20px), var(--wid, 1080px) / 2)));}
.img_text { display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; -webkit-box-align: start; -ms-flex-align: start; align-items: flex-start; gap: var(--gap, 30px); --imgW: calc(50% - var(--gap, 30px)/2); }
:where(.img_text) figure { width: var(--imgW, calc(50% - var(--gap, 30px)/2)); margin-inline: auto; }
:where(.img_text) figure > a, :where(.img_text) figure img { display: block; width: 100%; height: auto; }
:where(.img_text) > div { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; }
@media (max-width: 767px) { :where(.img_text):not(.bp-sm) figure { -webkit-box-ordinal-group: 2; -ms-flex-order: 1; order: 1; width: 100%; } }
@media (max-width: 639px) { :where(.img_text):is(.bp-sm) figure { -webkit-box-ordinal-group: 2; -ms-flex-order: 1; order: 1; width: 100%; } }
:where(.img_text).is_rev figure { -webkit-box-ordinal-group: 2; -ms-flex-order: 1; order: 1; }
@media (max-width: 767px) { :where(.img_text).is_rev:not(.bp-sm) figure { -webkit-box-ordinal-group: unset; -ms-flex-order: unset; order: unset; } }
@media (max-width: 639px) { :where(.img_text).is_rev:is(.bp-sm) figure { -webkit-box-ordinal-group: unset; -ms-flex-order: unset; order: unset; } }`;

  const cardsCss = `.wrapper {padding-block: var(--MY, 60px);margin-inline: var(--out, calc(50% - 50vw));max-width: unset;width: unset;position: relative;}
:where(.wrapper) > * {margin-inline: auto;max-width: 100%;}
:where(.wrapper) > * + * {margin-top: var(--MY, 60px);}
.into {padding-inline: var(--into, calc(50vw - clamp(0px, 50vw - var(--PX, 20px), var(--wid, 1080px) / 2)));}
.cards { display: -webkit-box; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; gap: var(--gap, 30px); }
:where(.cards) .btn { min-width: 100%; }
:where(.cards) .item { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; gap: 1em; margin-top: unset; }
:where(.cards) .item img { width: 100%; }
:where(.cards).is_layer .item { display: grid; }
:where(.cards).is_layer .item > * { grid-area: 1/1; z-index: 1; }
:where(.cards).is_layer .item figure { width: 100%; height: 100%; margin: 0; }
:where(.cards).is_layer .item figure img { height: 100%; -o-object-fit: cover; object-fit: cover; }
:where(.cards).colflex .item { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; width: auto; }
:where(.cards).colfix { --itemW: 240px; }
:where(.cards).colfix .item { width: var(--itemW, 240px); }
:where(.cards).col1 { --itemW: calc((100% - (var(--gap, 30px) * 0)) / 1); } :where(.cards).col1 .item { width: var(--itemW); }
:where(.cards).col2 { --itemW: calc((100% - (var(--gap, 30px) * 1)) / 2); } :where(.cards).col2 .item { width: var(--itemW); }
:where(.cards).col3 { --itemW: calc((100% - (var(--gap, 30px) * 2)) / 3); } :where(.cards).col3 .item { width: var(--itemW); }
:where(.cards).col4 { --itemW: calc((100% - (var(--gap, 30px) * 3)) / 4); } :where(.cards).col4 .item { width: var(--itemW); }
:where(.cards).col5 { --itemW: calc((100% - (var(--gap, 30px) * 4)) / 5); } :where(.cards).col5 .item { width: var(--itemW); }
:where(.cards).col6 { --itemW: calc((100% - (var(--gap, 30px) * 5)) / 6); } :where(.cards).col6 .item { width: var(--itemW); }
@media (max-width: 767px) { :where(.cards):not(.bp-sm) > .item { width: calc(50% - var(--gap, 30px) / 2); -webkit-box-flex: unset; -ms-flex: unset; flex: unset; } }
@media (max-width: 639px) { :where(.cards):is(.bp-sm) > .item { width: calc(50% - var(--gap, 30px) / 2); -webkit-box-flex: unset; -ms-flex: unset; flex: unset; } }
@media (max-width: 479px) { :where(.cards):not(.min2) > .item { width: 100%; } }`;
</script>

{#if showModal}
  <div id="snippetModal" class="active" onclick={closeModal} role="presentation">
    <div class="code-editor {isSetup ? 'setup-mode' : ''}" onclick={e => e.stopPropagation()} role="presentation">
      <div class="code-header text-sm flex items-center gap-2">
        {#if isSetup}
          <button 
            class="download-btn bg-green-600 hover:bg-green-700 text-white border-none mr-auto text-sm py-1 px-4 rounded"
            onclick={handleDownload}
          >
            Download Zip
          </button>
        {:else}
          <span class="text-gray-400 mr-auto">フレームワークを使用しないhtml,cssの使用例です。シングルクラスの詳細度で上書きできます</span>
        {/if}
        {#if !isSetup && modalItems.length > 0}
          <button class="copy-btn" onclick={() => handleCopy(0, modalItems[0].content)}>
            {copyStates[0] || 'Copy'}
          </button>
        {/if}
        <button class="close-btn" onclick={closeModal}>Close</button>
      </div>
      <div class="code-content p-6 overflow-y-auto">
        {#each modalItems as item, index}
          <div class={item.type === 'text' ? 'mb-6' : 'mb-8 relative group'}>
            {#if item.title}
              <h3 class="text-xl font-bold mb-3 text-white">
                {#if isSetup && item.title.startsWith('Step')}
                  <span class="setup-step-number">{item.title.split(':')[0].replace('Step ', '')}</span>
                  {item.title.split(':')[1] || item.title}
                {:else}
                  {item.title}
                {/if}
              </h3>
            {/if}
            {#if item.type === 'text'}
              <p class="text-gray-300 leading-relaxed whitespace-pre-wrap">{item.content}</p>
            {:else}
              <div class="relative">
                {#if isSetup}
                  <button 
                    class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded z-10"
                    onclick={() => handleCopy(index, item.content)}
                  >
                    {copyStates[index] || 'Copy'}
                  </button>
                {/if}
                <pre class="bg-black/50 p-4 rounded border border-gray-700 overflow-x-auto"><code class="text-sm font-mono text-blue-300">{item.content}</code></pre>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<header class="into fixed w-full min-h-[var(--head)] py-2 left-0 top-0 z-50 bg-white border-b-[1px] border-gray-200 border-solid flex items-center justify-end flex-wrap gap-2">
  <h1 class="mr-auto mb-0 leading-none pt-1">
    Svelte Gallery
  </h1>
  <button onclick={openSetupModal} class="float-right text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-3 rounded transition-colors border border-gray-300 mt-1 md:min-h-[3em]">Setup / Download</button>
</header>

<main class="py-[var(--head)] PX" id="contents">

  <!-- FlexRatio Preview -->
  <section class="mt-8">
    <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
      <h2 class="mr-auto mb-0 leading-none pt-1">FlexRatio
      </h2>
      <button onclick={(e) => openSnippetModal(e, flexCss)} class="float-right text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1">snippet</button>
    </div>
    <div class="mt-6">
      <h3>1. class="flex55 mt-3"</h3>
      <FlexRatio class="flex55 mt-3">
        {#snippet children()}
          <div class="p-4 bg-gray-200">Left Content (50%)</div>
          <div class="p-4 bg-gray-300">Right Content (50%)</div>
        {/snippet}
      </FlexRatio>
    </div>
    <div class="mt-6">
      <h3>2. class="flex46 mt-3"</h3>
      <FlexRatio class="flex46 mt-3">
        {#snippet children()}
          <div class="p-4 bg-blue-200">Left Content (40%)</div>
          <div class="p-4 bg-blue-300">Right Content (60%)</div>
        {/snippet}
      </FlexRatio>
    </div>
    <div class="mt-6">
      <h3>3. class="flex73 bp-sm mt-3"</h3>
      <FlexRatio class="flex73 bp-sm mt-3">
        {#snippet children()}
          <div class="p-4 bg-green-100">Left Content(70%)</div>
          <div class="p-4 bg-green-200">Right Content(30%)</div>
        {/snippet}
      </FlexRatio>
    </div>
  </section>

  <!-- Accordion Preview -->
  <section class="wrapper into bg-green-100 mt-12">
    <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
      <h2 class="mr-auto mb-0 leading-none pt-1">Accordion
      </h2>
      <button onclick={(e) => openSnippetModal(e, accordionCss)} class="float-right text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1">snippet</button>
    </div>
    <div class="mt-6">
      <h3>1. class="accordion mt-3"</h3>
      <Accordion class="mt-3" title="クリックして詳細を表示（基本形）">
        {#snippet children()}
          <p>汎用的なアコーディオンですQ&A以外の用途（利用規約や補足説明など）に最適です</p>
        {/snippet}
      </Accordion>
    </div>
    <div class="mt-6">
      <h3>2. class="accordion is_qa mt-3"</h3>
      <Accordion class="is_qa mt-3" title="Q&Aスタイルの質問テキストです">
        {#snippet children()}
          <p>is_qaクラスを付与することで、Q&Aのアイコンが表示されます</p>
        {/snippet}
      </Accordion>
    </div>
    <div class="mt-6">
      <h3>3. class="accordion is_qa mt-3"</h3>
      <Accordion class="is_qa mt-3" title="画像付きの質問です">
        {#snippet figure()}
          <img src="https://picsum.photos/id/60/400/300" alt="" />
        {/snippet}
        {#snippet children()}
          <p>回答部分に画像を表示する例ですPCでは横並び、スマホでは縦並びになります</p>
        {/snippet}
      </Accordion>
    </div>
  </section>

  <!-- Panel Preview -->
  <section class="mt-12">
    <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
      <h2 class="mr-auto mb-0 leading-none pt-1">Panel
      </h2>
      <button onclick={(e) => openSnippetModal(e, panelCss)} class="float-right text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1">snippet</button>
    </div>
    <div class="mt-6">
      <h3>1. class="panel is_flow img20 mt-3"</h3>
      <Panel class="is_flow img20 mt-3">
        {#snippet children()}
          <PanelItem>
            {#snippet figure()}<img src="https://picsum.photos/id/103/400/300" alt="" />{/snippet}
            {#snippet children()}
              <h4><span class="sub text-[--sc]">STEP 01</span>お問い合わせ</h4>
              <p>is_flowクラスとimg20クラスを付与した例です</p>
            {/snippet}
          </PanelItem>
          <PanelItem class="is_rev">
            {#snippet figure()}<img src="https://picsum.photos/id/104/400/300" alt="" />{/snippet}
            {#snippet children()}
              <h4><span class="sub text-[--sc]">STEP 02</span>ヒアリング</h4>
              <p>お客様のご要望を詳しくお伺いし、最適なプランをご提案いたします</p>
            {/snippet}
          </PanelItem>
        {/snippet}
      </Panel>
    </div>
  </section>

  <!-- ImgText Preview -->
  <section class="wrapper into bg-purple-100 mt-12">
    <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
      <h2 class="mr-auto mb-0 leading-none pt-1">ImgText
      </h2>
      <button onclick={(e) => openSnippetModal(e, imgTextCss)} class="float-right text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1">snippet</button>
    </div>
    <div class="mt-6">
      <ImgText class="bp-sm mt-3">
        {#snippet figure()}<img src="https://picsum.photos/id/10/400/300" alt="" />{/snippet}
        {#snippet children()}
          <h3>1. class="img_text bp-sm mt-3"</h3>
          <p>基本ブレイクポイントはTailwindのmax-md(767px)<br />
             bp-smクラスでmax-sm(639px)に変更できます
          </p>
        {/snippet}
      </ImgText>
    </div>
    <div class="mt-6">
      <ImgText class="bp-sm img30 is_rev mt-3">
        {#snippet figure()}<img src="https://picsum.photos/id/20/400/300" alt="" />{/snippet}
        {#snippet children()}
          <h3>2. class="img_text bp-sm img30 is_rev mt-3"</h3>
          <p>画像30%指定かつ左右反転</p>
        {/snippet}
      </ImgText>
    </div>
  </section>

  <!-- Cards Preview -->
  <section class="mt-12">
    <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
      <h2 class="mr-auto mb-0 leading-none pt-1">Cards
      </h2>
      <button onclick={(e) => openSnippetModal(e, cardsCss)} class="float-right text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1">snippet</button>
    </div>
    <div class="mt-6">
      <h3>1. class="cards col3 justify-center mt-3"</h3>
      <Cards class="col3 justify-center mt-3">
        {#snippet children()}
          {#each [1, 2, 3] as i}
            <CardItem class="sheet">
              {#snippet figure()}<img src="https://picsum.photos/id/10/400/250" alt="" />{/snippet}
              {#snippet children()}
                <h4>Card {i}</h4>
                <p>col? でPCカラム数指定。max-mdで全種2カラム、max-xs(479px)で1カラムに</p>
              {/snippet}
            </CardItem>
          {/each}
        {/snippet}
      </Cards>
    </div>
    <div class="mt-6">
      <h3>2. class="cards col4 min2 justify-center mt-3"</h3>
      <Cards class="col4 min2 justify-center mt-3">
        {#snippet children()}
          {#each [1, 2, 3, 4] as i}
            <CardItem class="board">
              {#snippet figure()}<img src="https://picsum.photos/id/20/400/250" alt="" />{/snippet}
              {#snippet children()}
                <h4>Card {i}</h4>
                <p>min2指定によりスマホサイズ電源列を維持します</p>
              {/snippet}
            </CardItem>
          {/each}
        {/snippet}
      </Cards>
    </div>
    <div class="mt-6">
      <h3>3. class="cards col3 is_layer justify-center mt-3"</h3>
      <Cards class="col3 is_layer justify-center mt-3">
        {#snippet children()}
          {#each [
            { pos: 'items-center', self: '' },
            { pos: 'items-center', self: 'self-center' },
            { pos: 'items-center', self: 'self-end' }
          ] as item}
            <CardItem>
              {#snippet figure()}<img src="https://picsum.photos/id/30/600/600" alt="" />{/snippet}
              {#snippet children()}
                <div class="bg-black/50 text-white p-5 flex flex-col justify-center {item.pos} {item.self}">
                  <h4 class="text-white">Layer</h4>
                  <p>画像の上に重なるレイヤー構造です</p>
                </div>
              {/snippet}
            </CardItem>
          {/each}
        {/snippet}
      </Cards>
    </div>
    <div class="mt-6">
      <h3>4. class="cards colflex mt-3"</h3>
      <Cards class="colflex mt-3">
        {#snippet children()}
          {#each [1, 2, 3] as i}
            <CardItem class="bg-gray-100 p-4 rounded">
              {#snippet children()}
                <h4>Flexible {i}</h4>
                <p>均等に広がります</p>
              {/snippet}
            </CardItem>
          {/each}
        {/snippet}
      </Cards>
    </div>
    <div class="mt-6">
      <h3>5. class="cards colfix" style="--itemW: 200px"</h3>
      <Cards class="colfix mt-3 justify-center" style="--itemW: 200px">
        {#snippet children()}
          {#each [1, 2, 3, 4] as i}
            <CardItem class="bg-gray-100 p-4 rounded">
              {#snippet children()}
                <h4>Fixed {i}</h4>
                <p>--itemW:固定幅</p>
              {/snippet}
            </CardItem>
          {/each}
        {/snippet}
      </Cards>
    </div>
  </section>
</main>
