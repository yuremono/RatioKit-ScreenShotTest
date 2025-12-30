<script lang="ts">
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
   * RatioKit Starter Kit - Svelte Preview
   * 配布用Zip内の独立したプレビュー（Starter Kit）
   * HtmlPreview.htmlと同じカタログ内容を表示します
   */
</script>

<div class="bg-white text-gray-900">
  <header class="into fixed w-full min-h-[var(--head)] py-2 left-0 top-0 z-50 bg-white border-b-[1px] border-gray-200 border-solid flex items-center justify-end flex-wrap gap-2">
    <h1 class="mr-auto mb-0 leading-none pt-1">
      Svelte Gallery
    </h1>
  </header>

  <main class="py-[var(--head)] PX" id="contents">
    <!-- FlexRatio Preview -->
    <section class="mt-8">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">FlexRatio</h2>
      </div>
      <div class="mt-6">
        <h3>1. className="flex55 mt-3"</h3>
        <div class="flex55 mt-3">
          <div class="p-4 bg-gray-200">Left Content (50%)</div>
          <div class="p-4 bg-gray-300">Right Content (50%)</div>
        </div>
      </div>
      <div class="mt-6">
        <h3>2. className="flex46 mt-3"</h3>
        <div class="flex46 mt-3">
          <div class="p-4 bg-blue-200">Left Content (40%)</div>
          <div class="p-4 bg-blue-300">Right Content (60%)</div>
        </div>
      </div>
      <div class="mt-6">
        <h3>3. className="flex73 bp-sm mt-3"</h3>
        <div class="flex73 bp-sm mt-3">
          <div class="p-4 bg-green-100">Left Content(70%)</div>
          <div class="p-4 bg-green-200">Right Content(30%)</div>
        </div>
      </div>
    </section>

    <!-- Accordion Preview -->
    <section class="wrapper into bg-green-100">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">Accordion</h2>
      </div>
      <div class="mt-6">
        <h3>1. className="accordion mt-3"</h3>
        <Accordion class="mt-3" title="クリックして詳細を表示（基本形）">
          {#snippet children()}
            <p>汎用的なアコーディオンですQ&A以外の用途（利用規約や補足説明など）に最適です</p>
          {/snippet}
        </Accordion>
      </div>
      <div class="mt-6">
        <h3>2. className="accordion is_qa mt-3"</h3>
        <Accordion class="is_qa mt-3" title="Q&Aスタイルの質問テキストです">
          {#snippet children()}
            <p>is_qaクラスを付与することで、Q&Aのアイコンが表示されます</p>
          {/snippet}
        </Accordion>
      </div>
      <div class="mt-6">
        <h3>3. className="accordion is_qa mt-3"</h3>
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
    <section class="">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">Panel</h2>
      </div>
      <div class="mt-6">
        <h3>1. className="panel is_flow img20 mt-3"</h3>
        <Panel class="is_flow img20 mt-3">
          <PanelItem class="has_img">
            {#snippet figure()}
              <img src="https://picsum.photos/id/103/400/300" alt="" />
            {/snippet}
            {#snippet children()}
              <h4><span class="sub text-[--sc]">STEP 01</span>お問い合わせ</h4>
              <p>is_flowクラスとimg20クラスを付与した例です</p>
            {/snippet}
          </PanelItem>
          <PanelItem class="has_img is_rev">
            {#snippet figure()}
              <img src="https://picsum.photos/id/104/400/300" alt="" />
            {/snippet}
            {#snippet children()}
              <h4><span class="sub text-[--sc]">STEP 02</span>ヒアリング</h4>
              <p>お客様のご要望を詳しくお伺いし、最適なプランをご提案いたします</p>
            {/snippet}
          </PanelItem>
        </Panel>
      </div>
    </section>

    <!-- ImgText Preview -->
    <section class="wrapper into bg-purple-100">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">ImgText</h2>
      </div>
      <div class="mt-6">
        <ImgText class="has_img bp-sm mt-3">
          {#snippet figure()}
            <img src="https://picsum.photos/id/10/400/300" alt="" />
          {/snippet}
          {#snippet children()}
            <h3>1. className="img_text bp-sm mt-3"</h3>
            <p>基本ブレイクポイントはTailwindのmax-md(767px)<br />
              bp-smクラスでmax-sm(639px)に変更できます
            </p>
          {/snippet}
        </ImgText>
      </div>
      <div class="mt-6">
        <ImgText class="has_img bp-sm img30 is_rev mt-3">
          {#snippet figure()}
            <img src="https://picsum.photos/id/20/400/300" alt="" />
          {/snippet}
          {#snippet children()}
            <h3>2. className="img_text bp-sm img30 is_rev mt-3"</h3>
            <p>画像30%指定かつ左右反転 </p>
          {/snippet}
        </ImgText>
      </div>
    </section>

    <!-- Cards Preview -->
    <section class="">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">Cards</h2>
      </div>
      <div class="mt-6">
        <h3>1. className="cards col3 justify-center mt-3"</h3>
        <Cards class="col3 justify-center mt-3">
          {#each Array(3) as _, i}
            <CardItem class="has_img sheet" key={i}>
              {#snippet figure()}
                <img src="https://picsum.photos/id/10/400/250" alt="" />
              {/snippet}
              {#snippet children()}
                <h4>Card {i + 1}</h4>
                <p>col? でPCカラム数指定。max-mdで全種2カラム、max-xs(479px)で1カラムに</p>
              {/snippet}
            </CardItem>
          {/each}
        </Cards>
      </div>

      <div class="mt-6">
        <h3 class="">2. className="cards col4 min2 justify-center mt-3"</h3>
        <Cards class="col4 min2 justify-center mt-3">
          {#each Array(4) as _, i}
            <CardItem class="has_img board" key={i}>
              {#snippet figure()}
                <img src="https://picsum.photos/id/20/400/250" alt="" />
              {/snippet}
              {#snippet children()}
                <h4>Card {i + 1}</h4>
                <p>min2指定によりスマホサイズでも2列を維持します</p>
              {/snippet}
            </CardItem>
          {/each}
        </Cards>
      </div>

      <div class="mt-6">
        <h3>3. className="cards col3 is_layer justify-center mt-3"</h3>
        <Cards class="col3 is_layer justify-center mt-3">
          {#each Array(3) as _, i}
            <CardItem class="has_img" key={i}>
              {#snippet figure()}
                <img src="https://picsum.photos/id/30/600/600" alt="" />
              {/snippet}
              {#snippet children()}
                <div class={`bg-black/50 text-white p-5 flex flex-col justify-center items-center ${i === 1 ? 'self-center' : i === 2 ? 'self-end' : ''}`}>
                  <h4 class="text-white">Layer 1</h4>
                  <p>画像の上に重なるレイヤー構造です</p>
                </div>
              {/snippet}
            </CardItem>
          {/each}
        </Cards>
      </div>

      <div class="mt-6">
        <h3>4. className="cards colflex mt-3"</h3>
        <Cards class="colflex mt-3">
          {#each Array(3) as _, i}
            <CardItem class="bg-gray-100 p-4 rounded" key={i}>
              {#snippet children()}
                <h4>Flexible {i + 1}</h4>
                <p>均等に広がります</p>
              {/snippet}
            </CardItem>
          {/each}
        </Cards>
      </div>

      <div class="mt-6">
        <h3>5. className="cards colfix" style="--itemW: 200px" </h3>
        <Cards class="colfix mt-3 justify-center" style="--itemW: 200px">
          {#each Array(4) as _, i}
            <CardItem class="bg-gray-100 p-4 rounded" key={i}>
              {#snippet children()}
                <h4>Fixed {i + 1}</h4>
                <p>--itemW:固定幅</p>
              {/snippet}
            </CardItem>
          {/each}
        </Cards>
      </div>
    </section>
  </main>
</div>

<style>
/* スターターキット固有のスタイル */
</style>
