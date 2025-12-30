import React from 'react';
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
 * RatioKit Starter Kit - React Preview
 * このファイルは配布用Zip内のプレビュー（Starter Kit）として使用されます。
 * 公開用マニュアル（ギャラリー）と同じカタログ内容を表示します。
 * 更新確認用タイムスタンプ: 2025-12-31 19:15
 */
const StarterApp: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="into fixed w-full min-h-[var(--head)] py-2 left-0 top-0 z-50 bg-white border-b-[1px] border-gray-200 border-solid flex items-center justify-end flex-wrap gap-2">
        <h1 className="mr-auto mb-0 leading-none pt-1">
          React Preview
        </h1>
      </header>

      <main className="py-[var(--head)] PX" id="contents">

        {/* FlexRatio Preview */}
        <section className="mt-8">
          <div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
            <h2 className="mr-auto mb-0 leading-none pt-1">FlexRatio</h2>
          </div>
          <div className="mt-6">
            <h3>1. className="flex55 mt-3"</h3>
            <FlexRatio className="flex55 mt-3">
              <div className="p-4 bg-gray-200">Left Content (50%)</div>
              <div className="p-4 bg-gray-300">Right Content (50%)</div>
            </FlexRatio>
          </div>
          <div className="mt-6">
            <h3>2. className="flex46 mt-3"</h3>
            <FlexRatio className="flex46 mt-3">
              <div className="p-4 bg-blue-200">Left Content (40%)</div>
              <div className="p-4 bg-blue-300">Right Content (60%)</div>
            </FlexRatio>
          </div>
          <div className="mt-6">
            <h3>3. className="flex73 bp-sm mt-3"</h3>
            <FlexRatio className="flex73 bp-sm mt-3">
              <div className="p-4 bg-green-100">Left Content(70%)</div>
              <div className="p-4 bg-green-200">Right Content(30%)</div>
            </FlexRatio>
          </div>
        </section>

        {/* Accordion Preview */}
        <section className="wrapper into bg-green-100 mt-12">
          <div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
            <h2 className="mr-auto mb-0 leading-none pt-1">Accordion</h2>
          </div>
          <div className="mt-6">
            <h3>1. className="accordion mt-3"</h3>
            <Accordion className="mt-3" title="クリックして詳細を表示（基本形）">
              <p>汎用的なアコーディオンですQ&A以外の用途（利用規約や補足説明など）に最適です</p>
            </Accordion>
          </div>
          <div className="mt-6">
            <h3>2. className="accordion is_qa mt-3"</h3>
            <Accordion className="is_qa mt-3" title="Q&Aスタイルの質問テキストです">
              <p>is_qaクラスを付与することで、Q&Aのアイコンが表示されます</p>
            </Accordion>
          </div>
          <div className="mt-6">
            <h3>3. className="accordion is_qa mt-3"</h3>
            <Accordion className="is_qa mt-3" title="画像付きの質問です" 
              figure={<img src="https://picsum.photos/id/60/400/300" alt="" />}>
              <p>回答部分に画像を表示する例ですPCでは横並び、スマホでは縦並びになります</p>
            </Accordion>
          </div>
        </section>

        {/* Panel Preview */}
        <section className="mt-12">
          <div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
            <h2 className="mr-auto mb-0 leading-none pt-1">Panel</h2>
          </div>
          <div className="mt-6">
            <h3>1. className="panel is_flow img20 mt-3"</h3>
            <Panel className="is_flow img20 mt-3">
              <PanelItem figure={<img src="https://picsum.photos/id/103/400/300" alt="" />}>
                <h4><span className="sub text-[--sc]">STEP 01</span>お問い合わせ</h4>
                <p>is_flowクラスとimg20クラスを付与した例です</p>
              </PanelItem>
              <PanelItem className="is_rev" figure={<img src="https://picsum.photos/id/104/400/300" alt="" />}>
                <h4><span className="sub text-[--sc]">STEP 02</span>ヒアリング</h4>
                <p>お客様のご要望を詳しくお伺いし、最適なプランをご提案いたします</p>
              </PanelItem>
            </Panel>
          </div>
        </section>

        {/* ImgText Preview */}
        <section className="wrapper into bg-purple-100 mt-12">
          <div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
            <h2 className="mr-auto mb-0 leading-none pt-1">ImgText</h2>
          </div>
          <div className="mt-6">
            <ImgText className="bp-sm mt-3" figure={<img src="https://picsum.photos/id/10/400/300" alt="" />}>
              <h3>1. className="img_text bp-sm mt-3"</h3>
              <p>基本ブレイクポイントはTailwindのmax-md(767px)<br />
                 bp-smクラスでmax-sm(639px)に変更できます
              </p>
            </ImgText>
          </div>
          <div className="mt-6">
            <ImgText className="bp-sm img30 is_rev mt-3" figure={<img src="https://picsum.photos/id/20/400/300" alt="" />}>
              <h3>2. className="img_text bp-sm img30 is_rev mt-3"</h3>
              <p>画像30%指定かつ左右反転</p>
            </ImgText>
          </div>
        </section>

        {/* Cards Preview */}
        <section className="mt-12">
          <div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
            <h2 className="mr-auto mb-0 leading-none pt-1">Cards</h2>
          </div>
          <div className="mt-6">
            <h3>1. className="cards col3 justify-center mt-3"</h3>
            <Cards className="col3 justify-center mt-3">
              {[1, 2, 3].map(i => (
                <CardItem key={i} className="sheet" figure={<img src="https://picsum.photos/id/10/400/250" alt="" />}>
                  <h4>Card {i}</h4>
                  <p>col? でPCカラム数指定。max-mdで全種2カラム、max-xs(479px)で1カラムに</p>
                </CardItem>
              ))}
            </Cards>
          </div>
          <div className="mt-6">
            <h3>2. className="cards col4 min2 justify-center mt-3"</h3>
            <Cards className="col4 min2 justify-center mt-3">
              {[1, 2, 3, 4].map(i => (
                <CardItem key={i} className="board" figure={<img src="https://picsum.photos/id/20/400/250" alt="" />}>
                  <h4>Card {i}</h4>
                  <p>min2指定によりスマホサイズ電源列を維持します</p>
                </CardItem>
              ))}
            </Cards>
          </div>
          <div className="mt-6">
            <h3>3. className="cards col3 is_layer justify-center mt-3"</h3>
            <Cards className="col3 is_layer justify-center mt-3">
              {[
                { pos: 'items-center', self: '' },
                { pos: 'items-center', self: 'self-center' },
                { pos: 'items-center', self: 'self-end' }
              ].map((item, i) => (
                <CardItem key={i} figure={<img src="https://picsum.photos/id/30/600/600" alt="" />}>
                  <div className={`bg-black/50 text-white p-5 flex flex-col justify-center ${item.pos} ${item.self}`}>
                    <h4 className="text-white">Layer</h4>
                    <p>画像の上に重なるレイヤー構造です</p>
                  </div>
                </CardItem>
              ))}
            </Cards>
          </div>
          <div className="mt-6">
            <h3>4. className="cards colflex mt-3"</h3>
            <Cards className="colflex mt-3">
              {[1, 2, 3].map(i => (
                <CardItem key={i} className="bg-gray-100 p-4 rounded">
                  <h4>Flexible {i}</h4>
                  <p>均等に広がります</p>
                </CardItem>
              ))}
            </Cards>
          </div>
          <div className="mt-6">
            <h3>5. className="cards colfix" style={{ '--itemW': '200px' } as React.CSSProperties}>
            <Cards className="colfix mt-3 justify-center" style={{ '--itemW': '200px' } as React.CSSProperties}>
              {[1, 2, 3, 4].map(i => (
                <CardItem key={i} className="bg-gray-100 p-4 rounded">
                  <h4>Fixed {i}</h4>
                  <p>--itemW:固定幅</p>
                </CardItem>
              ))}
            </Cards>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10 mt-20">
        <div className="wrapper into text-center">
          <p className="opacity-50 text-sm">&copy; 2026 RatioKit Project. All rights reserved.</p>
          <p className="opacity-30 text-[10px] mt-4">Build: 2025-12-31 19:15</p>
        </div>
      </footer>
    </div>
  );
};

export default StarterApp;
