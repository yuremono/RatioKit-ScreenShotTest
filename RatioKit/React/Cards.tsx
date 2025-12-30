import React from 'react';

/**
 * カラム数パターンのリテラル型 (col1 ~ col6, colflex, colfix)
 */
export type CardsColPattern = 'col1' | 'col2' | 'col3' | 'col4' | 'col5' | 'col6' | 'colflex' | 'colfix';

/**
 * Cards コンポーネントの Props
 */
export interface CardsProps {
  /** 
   * モディファイアクラス（col3, bp-sm, min2, is_layer 等）
   * @default "mb-0"
   */
  className?: CardsColPattern | string;
  /** 
   * インラインスタイル（CSS変数の上書き等に使用）
   */
  style?: React.CSSProperties;
  /** 
   * カード要素群 (CardItem を推奨)
   */
  children: React.ReactNode;
}

export interface CardItemProps {
  /**
   * モディファイアクラス (sheet, board 等)
   */
  className?: string;
  /** 
   * インラインスタイル
   */
  style?: React.CSSProperties;
  /**
   * 画像部分のコンテンツ（imgタグ等を直接記述）
   */
  figure?: React.ReactNode;
  /**
   * テキスト部分のコンテンツ
   */
  children: React.ReactNode;
}

/**
 * カード状の要素をグリッド配置するための親コンポーネント
 */
export const Cards: React.FC<CardsProps> = ({
  className = "mb-0",
  style,
  children
}) => {
  return (
    <div className={`cards ${className}`} style={style}>
      {children}
    </div>
  );
};

/**
 * Cards コンポーネントの子要素として使用する個別カード
 */
export const CardItem: React.FC<CardItemProps> = ({ 
  className = "", 
  style,
  figure,
  children
}) => {
  return (
    <div className={`item ${figure ? 'has_img' : ''} ${className}`} style={style}>
      {figure && <figure>{figure}</figure>}
      <div>
        {children}
      </div>
    </div>
  );
};
