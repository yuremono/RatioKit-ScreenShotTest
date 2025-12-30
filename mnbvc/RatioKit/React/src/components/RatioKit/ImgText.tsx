import React from 'react';

export interface ImgTextProps {
  /** 
   * モディファイアクラス（img30, is_rev, bp-sm 等）
   * @default "mb-0"
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
 * 画像テキストコンポーネント
 * クラス名で画像サイズや反転を制御します。
 */
export const ImgText: React.FC<ImgTextProps> = ({
  className = "mb-0",
  style,
  figure,
  children
}) => {
  return (
    <div className={`img_text ${figure ? 'has_img' : ''} ${className}`} style={style}>
      {figure && <figure>{figure}</figure>}
      <div>{children}</div>
    </div>
  );
};
