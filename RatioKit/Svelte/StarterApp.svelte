<script lang="ts">
  import ImgText from '@ratiokit/ImgText.svelte';
  import FlexRatio from '@ratiokit/FlexRatio.svelte';
  import Accordion from '@ratiokit/Accordion.svelte';
  import Cards from '@ratiokit/Cards.svelte';
  import CardItem from '@ratiokit/CardItem.svelte';
  import Panel from '@ratiokit/Panel.svelte';
  import PanelItem from '@ratiokit/PanelItem.svelte';

  /**
   * RatioKit Starter Kit - Svelte Preview
   * このファイルは配布用Zip内のプレビュー（Starter Kit）として使用されます。
   * ギャラリー（公開用マニュアル）とは独立したデモページです。
   */
</script>

<div class="bg-white text-gray-900 min-h-screen font-sans">
  <!-- Header -->
  <header class="into fixed w-full min-h-[var(--head)] py-4 left-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl font-black tracking-tighter m-0">RatioKit <span class="text-orange-600">Starter</span></h1>
      <nav class="hidden md:flex gap-8 font-bold text-sm">
        <a href="#features" class="hover:text-orange-600 transition-colors">Features</a>
        <a href="#demo" class="hover:text-orange-600 transition-colors">Demo</a>
        <a href="https://github.com/yuremono/RatioKit-ScreenShotTest" target="_blank" rel="noreferrer" class="hover:text-orange-600 transition-colors">GitHub</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="pt-[var(--head)]">
    <section class="wrapper into py-20 bg-orange-50/20">
      <div class="max-w-3xl">
        <h2 class="text-5xl font-black mb-6 leading-tight">
          Svelte 5 で体験する、<br />
          究極の速記性と反応性。
        </h2>
        <p class="text-xl text-gray-600 leading-relaxed mb-10">
          RatioKit は Svelte 5 の <code>Runes</code> と <code>Snippets</code> に最適化。
          コンパイル後のランタイムフットプリントを最小限に抑え、驚くほど高速なUIを実現します。
        </p>
        <div class="flex gap-4">
          <a href="#demo" class="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
            デモを見る
          </a>
        </div>
      </div>
    </section>

    <!-- Features - FlexRatio -->
    <section id="features" class="wrapper into py-20">
      <div class="mb-12">
        <span class="text-orange-600 font-bold tracking-widest uppercase text-sm">Snippets</span>
        <h2 class="text-3xl font-bold mt-2">パワフルな Snippet 連携</h2>
      </div>
      
      <FlexRatio className="flex37 gap-12 AIC">
        {#snippet children()}
          <figure class="rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/id/190/800/600" alt="Svelte Demo" />
          </figure>
          <div>
            <h3 class="text-2xl font-bold mb-4">簡潔なコンポーネント構文</h3>
            <p class="text-gray-600 leading-loose">
              Svelte 5 の Snippet 機能を活用し、マークアップを疎結合に保ちながらも、
              直感的で強力なコンポーネント操作が可能です。
            </p>
          </div>
        {/snippet}
      </FlexRatio>
    </section>

    <!-- Components Demo - Cards -->
    <section id="demo" class="wrapper into py-20 bg-gray-50 rounded-[3rem] my-20">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800">Components Demo</h2>
      </div>

      <Cards className="col3 gap-10">
        {#each Array(3) as _, i}
          <CardItem className="item sheet p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:scale-[1.02] transition-transform">
            {#snippet figure()}
              <figure class="rounded-2xl overflow-hidden mb-6">
                <img src="https://picsum.photos/id/{140 + i}/400/300" alt="Svelte Item" />
              </figure>
            {/snippet}
            <h4 class="text-xl font-black">Feature Item {i + 1}</h4>
            <p class="text-gray-500 mt-2 text-sm leading-relaxed">
              Svelteの <code>{#each}</code> ブロックとの相性も抜群です。
            </p>
          </CardItem>
        {/each}
      </Cards>
    </section>

    <!-- Accordion & Panel -->
    <section class="wrapper into py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 class="text-2xl font-bold mb-8">Accordion Demo</h3>
          <div class="space-y-4">
            <Accordion className="accordion">
              {#snippet summary()}Svelte 5 の Snippet で実装されていますか？{/snippet}
              <div>
                <p>はい、すべてのスロット部分は <code>Snippet</code> として定義されており、より現代的な Svelte 開発が可能です。</p>
              </div>
            </Accordion>
            <Accordion className="accordion is_qa">
              {#snippet summary()}TypeScript での開発は可能ですか？{/snippet}
              <div>
                <p>もちろんです。すべてのコンポーネントは TypeScript で記述されています。</p>
              </div>
            </Accordion>
          </div>
        </div>
        
        <div>
          <h3 class="text-2xl font-bold mb-8">Panel Step Flow</h3>
          <Panel className="is_flow img20">
            <PanelItem className="item">
              {#snippet figure()}
                <figure><img src="https://picsum.photos/id/220/200/200" alt="Step" class="rounded-xl" /></figure>
              {/snippet}
              <div>
                <h4 class="font-bold text-orange-600 uppercase tracking-tighter">Step 01</h4>
                <p class="text-gray-600">スターターキットを展開。</p>
              </div>
            </PanelItem>
            <PanelItem className="item">
              {#snippet figure()}
                <figure><img src="https://picsum.photos/id/221/200/200" alt="Step" class="rounded-xl" /></figure>
              {/snippet}
              <div>
                <h4 class="font-bold text-orange-600 uppercase tracking-tighter">Step 02</h4>
                <p class="text-gray-600">すぐに開発を開始できます。</p>
              </div>
            </PanelItem>
          </Panel>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-orange-950 text-white py-20 mt-20">
    <div class="wrapper into text-center">
      <h2 class="text-3xl font-bold mb-8 italic">RatioKit Svelte 5 Starter</h2>
      <p class="opacity-50 text-sm">&copy; 2026 RatioKit Project. All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
  /* Svelte 固有のスタイル */
</style>

