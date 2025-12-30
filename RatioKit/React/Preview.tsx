import React, { useState, useRef } from 'react';
import { ImgText } from './ImgText';
import { Cards, CardItem } from './Cards';
import { FlexRatio } from './FlexRatio';
import { Accordion } from './Accordion';
import { Panel } from './Panel';
import '../RatioKit.scss';
import '../SnippetModal.css';

interface ContentItem {
  type: 'text' | 'code';
  content: string;
  title?: string;
  noCopy?: boolean;
}

/**
 * 各コンポーネントの表示を確認するためのプレビューページ
 */
export const Preview: React.FC = () => {
  const [modalItems, setModalItems] = useState<ContentItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [copyStates, setCopyStates] = useState<{[key: number]: string}>({});

  const flexRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const imgTextRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);

  const formatHTML = (html: string) => {
    let tab = '    ';
    let result = '';
    let indent = '';

    html.replace(/>\s*</g, '>\n<').split('\n').forEach(function(element) {
      element = element.trim();
      if (element.match(/^<\/\w/)) {
        indent = indent.substring(tab.length);
      }
      result += indent + element + '\n';
      if (element.match(/^<\w[^>]*[^\/]>$/) && !element.match(/^<(input|img|br|hr)/)) {
        indent += tab;
      }
    });

    return result.trim();
  };

  const cleanAttributes = (el: HTMLElement) => {
    const attrs = el.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i];
      if (attr && (attr.name.startsWith('data-cursor-') || attr.name === 'ref')) {
        el.removeAttribute(attr.name);
      }
    }
    Array.from(el.children).forEach(child => cleanAttributes(child as HTMLElement));
  };

  const openModal = (ref: React.RefObject<HTMLElement | null>, css: string) => {
    setIsSetup(false);
    if (!ref || !ref.current) return;
    const clone = ref.current.cloneNode(true) as HTMLElement;
    
    // 不要なボタンの削除
    const btn = clone.querySelector('button');
    if (btn) btn.remove();
    
    cleanAttributes(clone);

    const html = formatHTML(clone.outerHTML);
    const tailwindCdn = '\n\n<!-- <script src="https://cdn.tailwindcss.com"></script> -->';
    const content = html + tailwindCdn + '\n\n<style>\n' + css.trim() + '\n</style>';
    
    setModalItems([{ type: 'code', content }]);
    setShowModal(true);
    setCopyStates({ 0: 'Copy' });
    document.body.style.overflow = 'hidden';
  };

  const openSetupModal = () => {
    setIsSetup(true);
    const flexRatioSource = `import React from 'react';

export interface FlexRatioProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const FlexRatio: React.FC<FlexRatioProps> = ({ 
  className = "mb-0",
  style,
  children 
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};`;

    const items: ContentItem[] = [
      {
        type: 'text',
        content: 'React版 RatioKit は、Vite 6+ および Tailwind CSS v4 環境に最適化されたスターターキット形式で提供されています。',
        title: 'Getting Started (Vite & Tailwind v4)'
      },
      {
        type: 'text',
        content: 'まず、上の「Download Zip」ボタンからファイルをダウンロードしてください。`React/` フォルダに必要なファイルがすべて含まれています。',
        title: 'Step 1: Download'
      },
    {
      type: 'text',
      content: '既存の Vite プロジェクトに導入する場合、まず Sass と Tailwind v4 プラグインをインストールします。もし `npm run dev` でエラー（Pre-transform error 等）が発生した場合は、Vite のキャッシュクリア (`npx vite --force`) を試してください。',
      title: 'Step 2: Install Dependencies'
    },
      {
        type: 'code',
        content: 'npm install -D sass @tailwindcss/vite'
      },
      {
        type: 'text',
        content: '`vite.config.ts` に Tailwind v4 プラグインを登録してください。',
        title: 'Step 3: Vite Config'
      },
      {
        type: 'code',
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`
      },
      {
        type: 'text',
        content: '`React/src/components/RatioKit` フォルダと `RatioKit.scss` を自身の `src/` 配下にコピーしてください。',
        title: 'Step 4: Copy Files'
      },
      {
        type: 'text',
        content: '`main.tsx` 等で SCSS をインポートします。Tailwind v4 の `@import "tailwindcss";` より後に読み込むことで、RatioKit のベーススタイルが正しく適用されます。',
        title: 'Step 5: Global Styles'
      },
      {
        type: 'code',
        content: `// main.tsx
import './RatioKit.scss';`
      },
      {
        type: 'text',
        content: 'RatioKitのCSS変数を上書きすることで、プロジェクト全体の色やサイズを簡単に変更できます。',
        title: 'Step 6: Customization'
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
        content: 'コンポーネントのソースコードを確認・コピーして、手動でファイルを作成することもできます。',
        title: 'FlexRatio.tsx (Example)'
      },
      {
        type: 'code',
        content: flexRatioSource
      },
      {
        type: 'text',
        content: 'あとはカタログからコードをコピーして使うだけです。',
        title: 'Usage Example'
      },
      {
        type: 'code',
        content: `import { FlexRatio } from './components/RatioKit/index';

function MyPage() {
  return (
    <div className="p-8">
      <FlexRatio className="flex55 gap-8">
        <div className="bg-gray-100 p-4">左側のコンテンツ</div>
        <div className="bg-gray-200 p-4">右側のコンテンツ</div>
      </FlexRatio>
    </div>
  );
}`
      }
    ];
    setModalItems(items);
    const initialCopyStates: {[key: number]: string} = {};
    items.forEach((item, index) => {
      if (item.type === 'code') initialCopyStates[index] = 'Copy';
    });
    setCopyStates(initialCopyStates);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
    setCopyStates({});
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/RatioKit.zip';
    link.download = 'RatioKit.zip';
    link.click();
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStates(prev => ({ ...prev, [index]: 'Copied!' }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [index]: 'Copy' }));
      }, 2000);
    });
  };

  // 各セクションのCSS（HtmlPreview.htmlからコピー）
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
:where(.accordion) summary { list-style: none; outline: none; cursor: pointer; position: relative; background-color: var(--qBG, var(--bc, #fbf9ef)); padding: 1em; padding-right: 2.5em; -webkit-transition: 0.4s; transition: 0.4s; }
:where(.accordion) summary:hover { opacity: 0.8; }
:where(.accordion) summary::-webkit-details-marker { display: none; }
:where(.accordion) summary:after { content: ">"; font-weight: 900; font-family: var(--icon, inherit); font-size: 1.5em; position: absolute; right: 1em; top: 50%; translate: 0 -50%; -webkit-transition: 0.4s; transition: 0.4s; rotate: 90deg; }
:where(.accordion)[open] summary:after { rotate: -90deg; }
:where(.accordion) > div { position: relative; padding: 1em; background-color: var(--aBG, var(--wh, #fff)); }
:where(.accordion) .has_img { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -ms-flex-wrap: wrap; flex-wrap: wrap; gap: 1em; width: 100%; }
:where(.accordion) .has_img figure { max-width: 100%; -webkit-box-ordinal-group: 2; -ms-flex-order: 1; order: 1; width: var(--imgW, 30%); margin-left: auto; }
:where(.accordion) .has_img figure img { width: 100%; height: auto; display: block; }
:where(.accordion) .has_img > div { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; }
@media (max-width: 767px) { :where(.accordion) .has_img:not(.bp-sm) figure { width: 100%; margin-left: unset; } }
@media (max-width: 639px) { :where(.accordion) .has_img:is(.bp-sm) figure { width: 100%; margin-left: unset; } }
:where(.accordion).is_qa summary, :where(.accordion).is_qa > div { padding-left: 4em; }
:where(.accordion).is_qa summary:before, :where(.accordion).is_qa > div:before { content: ""; font-family: var(--Eng, sans-serif); color: var(--wh, #fff); background-color: var(--mc, #2db542); display: block; position: absolute; left: 1em; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); border-radius: var(--rad, 0vmin); width: 2em; aspect-ratio: 1; -ms-flex-line-pack: center; align-content: center; text-align: center; }
:where(.accordion).is_qa summary:before { content: "Q"; }
:where(.accordion).is_qa > div:before { content: "A"; background-color: var(--abfBG, var(--ac, #512db5)); }`;

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
@media (max-width: 639px) { :where(.img_text).is_rev:is(.bp-sm) figure { -webkit-box-ordinal-group: unset; -ms-flex-order: unset; order: unset; } }
:where(.img_text).img100 { --imgW: 100%; } :where(.img_text).img95 { --imgW: 95%; } :where(.img_text).img90 { --imgW: 90%; } :where(.img_text).img875 { --imgW: 87.5%; } :where(.img_text).img85 { --imgW: 85%; } :where(.img_text).img80 { --imgW: 80%; } :where(.img_text).img75 { --imgW: 75%; } :where(.img_text).img70 { --imgW: 70%; } :where(.img_text).img66 { --imgW: 66%; } :where(.img_text).img65 { --imgW: 65%; } :where(.img_text).img60 { --imgW: 60%; } :where(.img_text).img55 { --imgW: 55%; } :where(.img_text).img50 { --imgW: 50%; } :where(.img_text).img45 { --imgW: 45%; } :where(.img_text).img40 { --imgW: 40%; } :where(.img_text).img35 { --imgW: 35%; } :where(.img_text).img33 { --imgW: 33%; } :where(.img_text).img30 { --imgW: 30%; } :where(.img_text).img25 { --imgW: 25%; } :where(.img_text).img20 { --imgW: 20%; } :where(.img_text).img10 { --imgW: 10%; }`;

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

  return (
		<>
			{showModal && (
				<div id="snippetModal" className="active" onClick={closeModal}>
					<div
						className={`code-editor ${isSetup ? "setup-mode" : ""}`}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="code-header text-sm flex items-center gap-2">
							{isSetup ? (
								<button
									className="download-btn bg-green-600 hover:bg-green-700 text-white border-none mr-auto text-sm py-1 px-4 rounded"
									onClick={handleDownload}
								>
									Download Zip
								</button>
							) : (
								<span className="text-gray-400 mr-auto">
									フレームワークを使用しないhtml,cssの使用例です。シングルクラスの詳細度で上書きできます
								</span>
							)}
							{!isSetup &&
								modalItems.length > 0 &&
								modalItems[0] &&
								modalItems[0].type === "code" && (
									<button
										className="copy-btn"
										onClick={() =>
											handleCopy(
												0,
												(modalItems[0] as ContentItem)
													.content
											)
										}
									>
										{copyStates[0] || "Copy"}
									</button>
								)}
							<button className="close-btn" onClick={closeModal}>
								Close
							</button>
						</div>
						<div className="code-content px-10 py-8 overflow-y-auto">
							{modalItems.map((item, index) => {
								if (!item) return null;
								const title = item.title;

								return (
									<div
										key={index}
										className={
											item.type === "text"
												? "mb-6"
												: "mb-8 relative group"
										}
									>
										{title && (
											<h3 className="text-xl  mb-4 text-white">
												{title}
											</h3>
										)}
										{item.type === "text" ? (
											<p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
												{item.content}
											</p>
										) : (
											<div className="relative">
												{isSetup && !item.noCopy && (
													<button
														className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded z-10"
														onClick={() =>
															handleCopy(
																index,
																item.content
															)
														}
													>
														{copyStates[index] ||
															"Copy"}
													</button>
												)}
												<pre className="bg-black/50 p-6 rounded border border-gray-700 overflow-x-auto">
													<code className="text-sm font-mono text-blue-300">
														{item.content}
													</code>
												</pre>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
			<header className="into fixed w-full min-h-[--head] py-2 left-0 top-0 z-50 bg-white border-b-[1px] border-gray-200 border-solid flex items-center justify-end flex-wrap gap-2">
				<h1 className="mr-auto mb-0 leading-none pt-1">
					React Gallery
				</h1>
				<button
					onClick={openSetupModal}
					className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1 md:min-h-[3em]"
				>
					Setup / Download
				</button>
			</header>

			<main className="py-[--head] PX" id="contents">
				{/* FlexRatio Preview */}
				<section className="mt-8" ref={flexRef}>
					<div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
						<h2 className="mr-auto mb-0 leading-none pt-1">
							FlexRatio
						</h2>
						<button
							onClick={() => openModal(flexRef, flexCss)}
							className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1"
						>
							snippet
						</button>
					</div>
					<div className="mt-6">
						<h3 className="">1. className="flex55 mt-3"</h3>
						<FlexRatio className="flex55 mt-3">
							<div className="p-4 bg-gray-200">
								Left Content (50%)
							</div>
							<div className="p-4 bg-gray-300">
								Right Content (50%)
							</div>
						</FlexRatio>
					</div>
					<div className="mt-6">
						<h3 className="">2. className="flex46 mt-3"</h3>
						<FlexRatio className="flex46 mt-3">
							<div className="p-4 bg-blue-200">
								Left Content (40%)
							</div>
							<div className="p-4 bg-blue-300">
								Right Content (60%)
							</div>
						</FlexRatio>
					</div>
					<div className="mt-6">
						<h3 className="">3. className="flex73 bp-sm mt-3"</h3>
						<FlexRatio className="flex73 bp-sm mt-3">
							<div className="p-4 bg-green-100">
								Left Content(70%)
							</div>
							<div className="p-4 bg-green-200">
								Right Content(30%)
							</div>
						</FlexRatio>
					</div>
				</section>

				{/* Accordion Preview */}
				<section
					className=" wrapper into bg-green-100 mt-12"
					ref={accordionRef}
				>
					<div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
						<h2 className="mr-auto mb-0 leading-none pt-1">
							Accordion
						</h2>
						<button
							onClick={() =>
								openModal(accordionRef, accordionCss)
							}
							className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1"
						>
							snippet
						</button>
					</div>
					<div className="mt-6">
						<h3 className="">1. className="accordion mt-3"</h3>
						<Accordion
							className=" mt-3"
							figure={""}
							title="クリックして詳細を表示（基本形）"
						>
							<p>
								汎用的なアコーディオンですQ&A以外の用途（利用規約や補足説明など）に最適です
							</p>
						</Accordion>
					</div>
					<div className="mt-6">
						<h3 className="">
							2. className="accordion is_qa mt-3"
						</h3>
						<Accordion
							className="is_qa mt-3"
							figure={""}
							title="Q&Aスタイルの質問テキストです"
						>
							<p>
								is_qaクラスを付与することで、Q&Aのアイコンが表示されます
							</p>
						</Accordion>
					</div>
					<div className="mt-6">
						<h3 className="">
							3. className="accordion is_qa mt-3"
						</h3>
						<Accordion
							className="is_qa mt-3"
							figure={
								<img
									src="https://picsum.photos/id/60/400/300"
									alt=""
								/>
							}
							title="画像付きの質問です"
						>
							<p>
								回答部分に画像を表示する例ですPCでは横並び、スマホでは縦並びになります
							</p>
						</Accordion>
					</div>
				</section>

				{/* Panel Preview */}
				<section className="mt-12" ref={panelRef}>
					<div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
						<h2 className="mr-auto mb-0 leading-none pt-1">
							Panel
						</h2>
						<button
							onClick={() => openModal(panelRef, panelCss)}
							className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1"
						>
							snippet
						</button>
					</div>
					<div className="mt-6">
						<h3 className="">
							1. className="panel is_flow img20 mt-3"
						</h3>
						<Panel className="is_flow img20 mt-3">
							<Panel.Item
								className=""
								figure={
									<img
										src="https://picsum.photos/id/103/400/300"
										alt=""
									/>
								}
							>
								<h4>
									<span className="sub text-[--sc]">
										STEP 01
									</span>
									お問い合わせ
								</h4>
								<p>
									is_flowクラスとimg20クラスを付与した例です
								</p>
							</Panel.Item>
							<Panel.Item
								className="is_rev "
								figure={
									<img
										src="https://picsum.photos/id/104/400/300"
										alt=""
									/>
								}
							>
								<h4>
									<span className="sub text-[--sc]">
										STEP 02
									</span>
									ヒアリング
								</h4>
								<p>
									お客様のご要望を詳しくお伺いし、最適なプランをご提案いたします
								</p>
							</Panel.Item>
						</Panel>
					</div>
				</section>

				{/* ImgText Preview */}
				<section
					className="wrapper into bg-purple-100 mt-12"
					ref={imgTextRef}
				>
					<div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
						<h2 className="mr-auto mb-0 leading-none pt-1">
							ImgText
						</h2>
						<button
							onClick={() => openModal(imgTextRef, imgTextCss)}
							className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1"
						>
							snippet
						</button>
					</div>
					<div className="mt-6">
						<ImgText
							className="bp-sm mt-3"
							figure={
								<img
									src="https://picsum.photos/id/10/400/300"
									alt=""
								/>
							}
						>
							<h3 className="">
								1. className="img_text bp-sm mt-3"
							</h3>
							<p>
								基本ブレイクポイントはTailwindのmax-md(767px)
								<br />
								bp-smクラスでmax-sm(639px)に変更できます
							</p>
						</ImgText>
					</div>
					<div className="mt-6">
						<ImgText
							className="bp-sm img30 is_rev mt-3"
							figure={
								<img
									src="https://picsum.photos/id/20/400/300"
									alt=""
								/>
							}
						>
							<h3 className="">
								2. className="img_text bp-sm img30 is_rev mt-3"
							</h3>
							<p>画像30%指定かつ左右反転 </p>
						</ImgText>
					</div>
				</section>

				{/* Cards Preview */}
				<section className="mt-12" ref={cardsRef}>
					<div className="py-2 flex justify-end flex-wrap gap-3 border-0 border-b-4 border-gray-400 border-solid">
						<h2 className="mr-auto mb-0 leading-none pt-1">
							Cards
						</h2>
						<button
							onClick={() => openModal(cardsRef, cardsCss)}
							className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 py-1 px-2 md:px-3 rounded transition-colors border border-gray-300 mt-1"
						>
							snippet
						</button>
					</div>
					<div className="mt-6">
						<h3 className="">
							1. className="cards col3 justify-center mt-3"
						</h3>
						<Cards className="col3 justify-center mt-3">
							{[1, 2, 3].map((i) => (
								<CardItem
									className="sheet"
									key={i}
									figure={
										<img
											src="https://picsum.photos/id/10/400/250"
											alt=""
										/>
									}
								>
									<h4>Card {i}</h4>
									<p>
										col?
										でPCカラム数指定。max-mdで全種2カラム、max-xs(479px)で1カラムに
									</p>
								</CardItem>
							))}
						</Cards>
					</div>

					<div className="">
						<h3 className="mt-6">
							2. className="cards col4 min2 justify-center mt-3"
						</h3>
						<Cards className="col4 min2 justify-center mt-3">
							{[1, 2, 3, 4].map((i) => (
								<CardItem
									className="board"
									key={i}
									figure={
										<img
											src="https://picsum.photos/id/20/400/250"
											alt=""
										/>
									}
								>
									<h4>Card {i}</h4>
									<p>
										min2指定によりスマホサイズでも2列を維持します
									</p>
								</CardItem>
							))}
						</Cards>
					</div>

					<div className="mt-6">
						<h3 className="">
							3. className="cards col3 is_layer justify-center
							mt-3"
						</h3>
						<Cards className="col3 is_layer justify-center mt-3">
							{[1].map((i) => (
								<CardItem
									className=""
									key={i}
									figure={
										<img
											src="https://picsum.photos/id/30/600/600"
											alt=""
										/>
									}
								>
									<div className="bg-black/50 text-white p-5 flex flex-col justify-center items-center ">
										<h4 className="text-white">
											Layer {i}
										</h4>
										<p>画像の上に重なるレイヤー構造です</p>
									</div>
								</CardItem>
							))}
							{[1].map((i) => (
								<CardItem
									className=""
									key={i}
									figure={
										<img
											src="https://picsum.photos/id/30/600/600"
											alt=""
										/>
									}
								>
									<div className="bg-black/50 text-white p-5 flex flex-col justify-center items-center self-center">
										<h4 className="text-white">
											Layer {i}
										</h4>
										<p>画像の上に重なるレイヤー構造です</p>
									</div>
								</CardItem>
							))}
							{[1].map((i) => (
								<CardItem
									className=""
									key={i}
									figure={
										<img
											src="https://picsum.photos/id/30/600/600"
											alt=""
										/>
									}
								>
									<div className="bg-black/50 text-white p-5 flex flex-col justify-center items-center self-end">
										<h4 className="text-white">
											Layer {i}
										</h4>
										<p>画像の上に重なるレイヤー構造です</p>
									</div>
								</CardItem>
							))}
						</Cards>
					</div>

					<div className="mt-6">
						<h3 className="">4. className="cards colflex mt-3"</h3>
						<Cards className="colflex  mt-3">
							{[1, 2, 3].map((i) => (
								<CardItem
									className="bg-gray-100 p-4 rounded"
									key={i}
									figure={""}
								>
									<h4>Flexible {i}</h4>
									<p>均等に広がります</p>
								</CardItem>
							))}
						</Cards>
					</div>

					<div className="mt-6">
						<h3 className="">
							5. className="cards colfix" style="--itemW: 200px"{" "}
						</h3>
						<Cards
							className="colfix mt-3 justify-center"
							style={
								{ "--itemW": "200px" } as React.CSSProperties
							}
						>
							{[1, 2, 3, 4].map((i) => (
								<CardItem
									className="bg-gray-100 p-4 rounded"
									key={i}
									figure={""}
								>
									<h4>Fixed {i}</h4>
									<p>--itemW:固定幅</p>
								</CardItem>
							))}
						</Cards>
					</div>
				</section>
			</main>
		</>
  );
};

