import React from 'react';

/**
 * FlexRatio プレフィックス (flex28, flex37, flex46, flex55, flex64, flex73, flex82)
 */
export type FlexRatioPattern = 'flex28' | 'flex37' | 'flex46' | 'flex55' | 'flex64' | 'flex73' | 'flex82';

export interface FlexRatioProps {
  /** 
   * モディファイアクラス (flex55, bp-sm 等)
   * RatioKit の比率クラスを指定します。
   * @default "mb-0"
   */
  className?: FlexRatioPattern | string;
  /** 
   * インラインスタイル
   */
  style?: React.CSSProperties;
  /** 
   * 子要素（原則2つの直系子要素を想定）
   */
  children: React.ReactNode;
}

/**
 * 2つの要素を指定された比率で並べるフレックスコンポーネント
 * クラス名（flex55等）で比率を制御します。
 */
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
};
