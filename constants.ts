import { PaperSize, Orientation, PaperDimensions } from './types';

// Dimensions in mm for screen display approximation (scaling might be needed via CSS)
export const PAPER_DIMENSIONS: Record<PaperSize, Record<Orientation, PaperDimensions>> = {
  A4: {
    portrait: { width: '210mm', height: '297mm' },
    landscape: { width: '297mm', height: '210mm' },
  },
  A5: {
    portrait: { width: '148mm', height: '210mm' },
    landscape: { width: '210mm', height: '148mm' },
  },
};
