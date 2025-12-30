import React from 'react';

export interface PanelProps {
  /** 
   * モディファイアクラス（is_flow, img30, bp-sm 等）
   * @default "mb-0"
   */
  className?: string;
  /** 
   * インラインスタイル
   */
  style?: React.CSSProperties;
  /** 
   * 子要素（Panel.Item）
   */
  children: React.ReactNode;
}

export interface PanelItemProps {
  /** 
   * 追加のクラス名
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
   * コンテンツ（タイトルタグ等を含めて自由に記述）
   */
  children: React.ReactNode;
}

/**
 * パネルコンポーネント
 * クラス名で画像サイズや矢印の有無を制御します。
 */
export const Panel: React.FC<PanelProps> & { Item: React.FC<PanelItemProps> } = ({
  className = "mb-0",
  style,
  children
}) => {
  return (
    <div className={`panel ${className}`} style={style}>
      {children}
    </div>
  );
};

export const PanelItem: React.FC<PanelItemProps> = ({
  className = "",
  style,
  figure,
  children
}) => {
  return (
    <div className={`item ${figure ? 'has_img' : ''} ${className}`} style={style}>
      <div>
        {children}
      </div>
      {figure && <figure>{figure}</figure>}
    </div>
  );
};

Panel.Item = PanelItem;
