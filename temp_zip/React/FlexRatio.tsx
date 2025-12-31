import React from 'react';

export interface FlexRatioProps {
  /** 
   * モディファイアクラス（flex55, bp-sm 等）
   * @default "mb-0"
   */
  className?: string;
  /** 
   * インラインスタイル
   */
  style?: React.CSSProperties;
  /** 
   * 子要素（原則2つ）
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
