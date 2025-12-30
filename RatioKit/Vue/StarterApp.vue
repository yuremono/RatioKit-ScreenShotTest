<script setup lang="ts">
import { 
  FlexRatio, 
  Accordion, 
  Panel, 
  PanelItem,
  ImgText, 
  Cards, 
  CardItem 
} from '@ratiokit';

/**
 * RatioKit Starter Kit - Vue Preview
 * このファイルは配布用Zip内のプレビュー（Starter Kit）として使用されます。
 * ギャラリー（公開用マニュアル）とは独立したデモページです。
 */
</script>

<template>
  <div class="bg-white text-gray-900 min-h-screen font-sans">
    <!-- Header -->
    <header class="into fixed w-full min-h-[var(--head)] py-4 left-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center">
      <div class="flex items-center justify-between w-full">
        <h1 class="text-2xl font-black tracking-tighter m-0">RatioKit <span class="text-emerald-600">Starter</span></h1>
        <nav class="hidden md:flex gap-8 font-bold text-sm">
          <a href="#features" class="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#demo" class="hover:text-emerald-600 transition-colors">Demo</a>
          <a href="https://github.com/yuremono/RatioKit-ScreenShotTest" target="_blank" rel="noreferrer" class="hover:text-emerald-600 transition-colors">GitHub</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="pt-[var(--head)]">
      <section class="wrapper into py-20 bg-slate-50">
        <div class="max-w-3xl">
          <h2 class="text-5xl font-black mb-6 leading-tight">
            比率でデザインする、<br />
            次世代のUIテンプレート。
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed mb-10">
            RatioKitは、レスポンシブデザインの複雑さを「比率（Ratio）」で解決します。
            React, Vue, Svelteに対応し、Tailwind CSS v4環境で最高のパフォーマンスを発揮します。
          </p>
          <div class="flex gap-4">
            <a href="#demo" class="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
              デモを見る
            </a>
          </div>
        </div>
      </section>

      <!-- Features - FlexRatio -->
      <section id="features" class="wrapper into py-20">
        <div class="mb-12">
          <span class="text-emerald-600 font-bold tracking-widest uppercase text-sm">FlexRatio</span>
          <h2 class="text-3xl font-bold mt-2">柔軟な比率レイアウト</h2>
        </div>
        
        <FlexRatio class="flex64 gap-12 AIC">
          <div>
            <h3 class="text-2xl font-bold mb-4">6:4 の黄金比レイアウト</h3>
            <p class="text-gray-600 leading-loose">
              <code>flex64</code> クラスを指定するだけで、デスクトップでは完璧な比率で配置され、
              モバイルでは自動的に最適化されたスタックレイアウトに切り替わります。
            </p>
          </div>
          <template #default>
            <figure class="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/id/160/800/600" alt="Demo" />
            </figure>
          </template>
        </FlexRatio>
      </section>

      <!-- Components Demo - Cards -->
      <section id="demo" class="wrapper into py-20 bg-gray-50 rounded-[3rem] my-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold">主要コンポーネント</h2>
          <p class="text-gray-500 mt-4">これらはすべて、配布パッケージに含まれる標準コンポーネントです。</p>
        </div>

        <Cards class="col3 gap-8">
          <CardItem class="item sheet p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <template #figure>
              <figure class="rounded-xl overflow-hidden mb-4">
                <img src="https://picsum.photos/id/101/400/300" alt="Card" />
              </figure>
            </template>
            <h4 class="text-xl font-bold">Responsive Cards</h4>
            <p class="text-gray-600 text-sm">カラム数を指定するだけで、デバイスサイズに合わせて最適化されます。</p>
          </CardItem>
          <CardItem class="item sheet p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <template #figure>
              <figure class="rounded-xl overflow-hidden mb-4">
                <img src="https://picsum.photos/id/102/400/300" alt="Card" />
              </figure>
            </template>
            <h4 class="text-xl font-bold">Ratio Control</h4>
            <p class="text-gray-600 text-sm">画像の比率を保ったまま、美しくコンテンツを表示可能です。</p>
          </CardItem>
          <CardItem class="item sheet p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <template #figure>
              <figure class="rounded-xl overflow-hidden mb-4">
                <img src="https://picsum.photos/id/103/400/300" alt="Card" />
              </figure>
            </template>
            <h4 class="text-xl font-bold">Tailwind v4 Ready</h4>
            <p class="text-gray-600 text-sm">最新のTailwindエンジンoxideに完全対応しています。</p>
          </CardItem>
        </Cards>
      </section>

      <!-- Accordion & Panel -->
      <section class="wrapper into py-20">
        <FlexRatio class="flex55 gap-16">
          <div>
            <h3 class="text-2xl font-bold mb-8">よくある質問</h3>
            <div class="space-y-4">
              <Accordion class="accordion is_qa">
                <template #summary>商用利用は可能ですか？</template>
                <div>
                  <p>はい、RatioKitは商用プロジェクトでも自由にご利用いただけます。</p>
                </div>
              </Accordion>
              <Accordion class="accordion is_qa">
                <template #summary>対応しているフレームワークは？</template>
                <div>
                  <p>React, Vue 3, Svelte 5 に対応しています。また純粋なHTML/CSS版も提供しています。</p>
                </div>
              </Accordion>
            </div>
          </div>
          <template #default>
            <div>
              <h3 class="text-2xl font-bold mb-8">導入の流れ</h3>
              <Panel class="is_flow img20">
                <PanelItem class="item">
                  <template #figure>
                    <figure><img src="https://picsum.photos/id/201/200/200" alt="Step" class="rounded-lg" /></figure>
                  </template>
                  <div>
                    <h4 class="font-bold"><span class="text-emerald-600 mr-2">01</span>ダウンロード</h4>
                    <p class="text-sm text-gray-500">Zipファイルを解凍してプロジェクトに配置します。</p>
                  </div>
                </PanelItem>
                <PanelItem class="item">
                  <template #figure>
                    <figure><img src="https://picsum.photos/id/202/200/200" alt="Step" class="rounded-lg" /></figure>
                  </template>
                  <div>
                    <h4 class="font-bold"><span class="text-emerald-600 mr-2">02</span>セットアップ</h4>
                    <p class="text-sm text-gray-500">SCSSをインポートし、変数をカスタマイズします。</p>
                  </div>
                </PanelItem>
              </Panel>
            </div>
          </template>
        </FlexRatio>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-20 mt-20">
      <div class="wrapper into text-center">
        <h2 class="text-3xl font-bold mb-8">RatioKit Starter Kit</h2>
        <p class="opacity-50 text-sm">&copy; 2026 RatioKit Project. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* コンポーネント固有のスタイル */
</style>
