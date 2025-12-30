<script setup lang="ts">
import ImgText from '@ratiokit/ImgText.vue';
import FlexRatio from '@ratiokit/FlexRatio.vue';
import Accordion from '@ratiokit/Accordion.vue';
import Cards from '@ratiokit/Cards.vue';
import CardItem from '@ratiokit/CardItem.vue';
import Panel from '@ratiokit/Panel.vue';
import PanelItem from '@ratiokit/PanelItem.vue';

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
      <section class="wrapper into py-20 bg-emerald-50/30">
        <div class="max-w-3xl">
          <h2 class="text-5xl font-black mb-6 leading-tight">
            Vue 3 で実現する、<br />
            比率ベースの美しさと効率。
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed mb-10">
            RatioKit は Vue 3 (Composition API) に完全対応。
            SFC（単一ファイルコンポーネント）として提供され、あなたのプロジェクトに即座に馴染みます。
          </p>
          <div class="flex gap-4">
            <a href="#demo" class="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
              デモを見る
            </a>
          </div>
        </div>
      </section>

      <!-- Features - ImgText -->
      <section id="features" class="wrapper into py-20">
        <div class="mb-12 text-center">
          <span class="text-emerald-600 font-bold tracking-widest uppercase text-sm">ImgText</span>
          <h2 class="text-3xl font-bold mt-2">画像とテキストの最適化</h2>
        </div>
        
        <ImgText class="img_text img40 gap-16 AIC">
          <template #figure>
            <figure class="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/id/180/800/600" alt="Vue Demo" />
            </figure>
          </template>
          <div>
            <h3 class="text-2xl font-bold mb-4">モバイルファーストの設計</h3>
            <p class="text-gray-600 leading-loose">
              <code>img40</code> 指定で、PCでは画像を40%の幅に。スマホでは自動的に100%幅になり、
              コンテンツの順序も最適化されます。Vue の <code>slot</code> を活用した柔軟なマークアップが可能です。
            </p>
          </div>
        </ImgText>
      </section>

      <!-- Components Demo - Accordion -->
      <section id="demo" class="wrapper into py-20 bg-gray-50 rounded-[3rem] my-20">
        <div class="flex flex-wrap gap-16">
          <div class="flex-1 min-w-[300px]">
            <h2 class="text-3xl font-bold mb-8">Accordion</h2>
            <div class="space-y-4">
              <Accordion class="accordion is_qa">
                <template #summary>Vue版の特徴は何ですか？</template>
                <div>
                  <p><code>&lt;script setup&gt;</code> と TypeScript を使用しており、高い開発効率と型安全性を両立しています。</p>
                </div>
              </Accordion>
              <Accordion class="accordion is_qa">
                <template #summary>Scoped CSSに対応していますか？</template>
                <div>
                  <p>はい、コンポーネントは <code>scoped</code> スタイルを使用しており、既存のスタイルとの干渉を防ぎます。</p>
                </div>
              </Accordion>
            </div>
          </div>
          
          <div class="flex-1 min-w-[300px]">
            <h2 class="text-3xl font-bold mb-8">Panel Flow</h2>
            <Panel class="is_flow img30">
              <PanelItem class="item">
                <template #figure>
                  <figure><img src="https://picsum.photos/id/210/200/200" alt="Step" class="rounded-full" /></figure>
                </template>
                <div>
                  <h4 class="font-bold text-emerald-600">Step 01</h4>
                  <p class="text-gray-700">コンポーネントを <code>src/components</code> にコピー。</p>
                </div>
              </PanelItem>
              <PanelItem class="item">
                <template #figure>
                  <figure><img src="https://picsum.photos/id/211/200/200" alt="Step" class="rounded-full" /></figure>
                </template>
                <div>
                  <h4 class="font-bold text-emerald-600">Step 02</h4>
                  <p class="text-gray-700"><code>main.ts</code> で SCSS をインポートして完了です。</p>
                </div>
              </PanelItem>
            </Panel>
          </div>
        </div>
      </section>

      <!-- Cards Grid -->
      <section class="wrapper into py-20">
        <div class="mb-12">
          <h2 class="text-3xl font-bold">Cards Layout</h2>
        </div>
        <Cards class="col4 gap-6">
          <CardItem v-for="i in 4" :key="i" class="item board p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <template #figure>
              <figure class="rounded-lg overflow-hidden mb-3">
                <img :src="`https://picsum.photos/id/${150 + i}/400/300`" alt="Item" />
              </figure>
            </template>
            <h4 class="font-bold">Card Title {{ i }}</h4>
            <p class="text-gray-500 text-xs">シンプルな <code>col4</code> 指定による4カラムレイアウトです。</p>
          </CardItem>
        </Cards>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-emerald-900 text-white py-20 mt-20">
      <div class="wrapper into text-center">
        <h2 class="text-3xl font-bold mb-8">RatioKit Vue Starter</h2>
        <p class="opacity-50 text-sm">&copy; 2026 RatioKit Project. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* スターターキット固有のスタイル */
</style>

