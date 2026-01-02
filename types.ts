export type PaperSize = 'A4' | 'A5';
export type Orientation = 'portrait' | 'landscape';

export interface AppConfig {
  size: PaperSize;
  orientation: Orientation;
}

export interface PaperDimensions {
  width: string;
  height: string;
}
