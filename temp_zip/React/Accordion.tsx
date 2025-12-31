import React from 'react';

export interface AccordionProps {
  /** 
   * モディファイアクラス（is_qa, bp-sm 等）
   * @default "mb-0"
   */
  className?: string;
  /** 
   * インラインスタイル
   */
  style?: React.CSSProperties;
  /** 
   * 概要（クリックで表示される部分）
   */
  title: React.ReactNode;
  /** 
   * 詳細内容
   */
  children: React.ReactNode;
  /** 
   * タイトル部分の画像コンテンツ（is_qa等で使用）
   */
  figureTitle?: React.ReactNode;
  /** 
   * 内容部分の画像コンテンツ
   */
  figure?: React.ReactNode;
  /** 
   * 初期状態で開いておくかどうか
   */
  open?: boolean;
}

/**
 * アコーディオン（開閉コンテンツ）コンポーネント
 * details/summary タグを使用し、汎用的な折りたたみUIを提供します。
 * クラス名（is_qa等）でスタイルを切り替えます。
 */
export const Accordion: React.FC<AccordionProps> = ({
  className = "mb-0",
  style,
  title,
  children,
  figureTitle,
  figure,
  open = false
}) => {
  const renderContent = (content: React.ReactNode, figureNode?: React.ReactNode) => {
    if (figureNode) {
      return (
        <div className="has_img">
          <figure>{figureNode}</figure>
          <div>{content}</div>
        </div>
      );
    }
    return content;
  };

  return (
    <details className={`accordion ${className}`} style={style} open={open}>
      <summary>
        {renderContent(title, figureTitle)}
      </summary>
      <div className="">
        {renderContent(children, figure)}
      </div>
    </details>
  );
};
