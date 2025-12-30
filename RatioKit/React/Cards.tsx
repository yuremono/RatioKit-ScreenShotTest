import React from 'react';

/**
 * Cards コンポーネント
 */
export interface CardsProps {
  /** 
   * モディファイアクラス（col3, bp-sm, min2, is_layer 等）
   * @default "mb-0"
   */
  className?: string;
  /** 
   * インラインスタイル（CSS変数の上書き等に使用）
   */
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface CardItemProps {
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
 * CardItem コンポーネント
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
