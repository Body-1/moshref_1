import React from 'react';

interface ToolbarProps {
  onConvert: () => void;
  onPrint: () => void;
  onReset: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  isConverting: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onConvert,
  onPrint,
  onReset,
  fontSize,
  setFontSize,
  isConverting,
}) => {
  return (
    <div className="no-print fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 shadow-sm z-50 flex flex-wrap items-center justify-between gap-4">
      
      {/* Right Side: Title & Reset */}
      <div className="flex items-center gap-4">
        <button 
            onClick={onReset}
            className="text-gray-500 hover:text-red-600 transition-colors"
            title="عودة للإعدادات"
        >
            <i className="fa-solid fa-arrow-right text-xl"></i>
        </button>
        <h1 className="font-bold text-gray-800 text-lg hidden sm:block">
          <i className="fa-solid fa-pen-nib ml-2"></i>
          المحرر الفيزيائي
        </h1>
      </div>

      {/* Center: Font Controls */}
      <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
        <button
          onClick={() => setFontSize(Math.max(12, fontSize - 2))}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all text-gray-700"
        >
          <i className="fa-solid fa-minus text-xs"></i>
        </button>
        <span className="w-12 text-center text-sm font-mono font-bold text-gray-700">
          {fontSize}px
        </span>
        <button
          onClick={() => setFontSize(Math.min(72, fontSize + 2))}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all text-gray-700"
        >
          <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>

      {/* Left Side: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onConvert}
          disabled={isConverting}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            isConverting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
          }`}
        >
          {isConverting ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              <span>جاري التحويل...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>تحويل الرموز</span>
            </>
          )}
        </button>

        <button
          onClick={onPrint}
          className="px-4 py-2 rounded-lg font-semibold bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-print"></i>
          <span>طباعة / PDF</span>
        </button>
      </div>
    </div>
  );
};
