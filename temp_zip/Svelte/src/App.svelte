<script lang="ts">
  import { 
    ImgText,
    FlexRatio,
    Accordion,
    Cards,
    CardItem,
    Panel,
    PanelItem
  } from '@ratiokit';

  /**
   * RatioKit Starter Kit - Svelte Preview
   * 配布用Zip内の独立したプレビュー（Starter Kit）
   * 公開用マニュアル（ギャラリー）と同じカタログ内容を表示します
   * 更新確認用タイムスタンプ: 2025-12-31 19:15
   */
</script>

<div class="bg-white text-gray-900 min-h-screen">
  <header class="into fixed w-full min-h-[var(--head)] py-2 left-0 top-0 z-50 bg-white border-b-[1px] border-gray-200 border-solid flex items-center justify-end flex-wrap gap-2">
    <h1 class="mr-auto mb-0 leading-none pt-1">
      Svelte Preview
    </h1>
  </header>

  <main class="py-[var(--head)] PX" id="contents">

    <!-- FlexRatio Preview -->
    <section class="mt-8">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">FlexRatio</h2>
      </div>
      <div class="mt-6">
        <h3>1. class="flex55 mt-3"</h3>
        <FlexRatio class="flex55 mt-3">
          <div class="p-4 bg-gray-200">Left Content (50%)</div>
          <div class="p-4 bg-gray-300">Right Content (50%)</div>
        </FlexRatio>
      </div>
      <div class="mt-6">
        <h3>2. class="flex46 mt-3"</h3>
        <FlexRatio class="flex46 mt-3">
          <div class="p-4 bg-blue-200">Left Content (40%)</div>
          <div class="p-4 bg-blue-300">Right Content (60%)</div>
        </FlexRatio>
      </div>
      <div class="mt-6">
        <h3>3. class="flex73 bp-sm mt-3"</h3>
        <FlexRatio class="flex73 bp-sm mt-3">
          <div class="p-4 bg-green-100">Left Content(70%)</div>
          <div class="p-4 bg-green-200">Right Content(30%)</div>
        </FlexRatio>
      </div>
    </section>

    <!-- Accordion Preview -->
    <section class="wrapper into bg-green-100 mt-12">
      <div class="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
        <h2 class="mr-auto mb-0 leading-none pt-1">Accordion</h2>
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
        <h2 class="mr-auto mb-0 leading-none pt-1">Panel</h2>
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
        <h2 class="mr-auto mb-0 leading-none pt-1">ImgText</h2>
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
        <h2 class="mr-auto mb-0 leading-none pt-1">Cards</h2>
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

  <!-- Footer -->
  <footer class="bg-slate-900 text-white py-10 mt-20">
    <div class="wrapper into text-center">
      <p class="opacity-50 text-sm">&copy; 2026 RatioKit Project. All rights reserved.</p>
      <p class="opacity-30 text-[10px] mt-4">Build: 2025-12-31 19:15</p>
    </div>
  </footer>
</div>
