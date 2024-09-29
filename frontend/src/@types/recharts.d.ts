declare module 'recharts' {
    import * as React from 'react';
  
    export type ResponsiveContainerProps = {
      width?: string | number;
      height?: string | number;
      children: React.ReactNode;
    };
  
    export const ResponsiveContainer: React.FC<ResponsiveContainerProps>;
  
    export type PieChartProps = {
      width?: number;
      height?: number;
      children?: React.ReactNode;
    };
  
    export const PieChart: React.FC<PieChartProps>;
  
    export type PieProps = {
      data: Array<any>;
      dataKey: string;
      nameKey: string;
      outerRadius?: number;
      fill?: string;
      children?: React.ReactNode;
    };
  
    export const Pie: React.FC<PieProps>;
  
    // Add Cell component type
    export type CellProps = {
      fill?: string;
      stroke?: string;
      children?: React.ReactNode;
    };
  
    export const Cell: React.FC<CellProps>;
  
    export type BarChartProps = {
      data: Array<any>;
      children?: React.ReactNode;
    };
  
    export const BarChart: React.FC<BarChartProps>;
  
    export type BarProps = {
      dataKey: string;
      fill?: string;
      children?: React.ReactNode;
    };
  
    export const Bar: React.FC<BarProps>;
  
    export type XAxisProps = {
      dataKey: string;
    };
  
    export const XAxis: React.FC<XAxisProps>;
  
    export type YAxisProps = {};
  
    export const YAxis: React.FC<YAxisProps>;
  
    export type TooltipProps = {};
  
    export const Tooltip: React.FC<TooltipProps>;
  
    export type LegendProps = {};
  
    export const Legend: React.FC<LegendProps>;
  }
  