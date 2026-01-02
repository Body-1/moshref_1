import React from 'react';
import { PaperSize, Orientation } from '../types';

interface SetupScreenProps {
  onComplete: (size: PaperSize, orientation: Orientation) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [size, setSize] = React.useState<PaperSize>('A4');
  const [orientation, setOrientation] = React.useState<Orientation>('portrait');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full text-center">
        <div className="mb-6">
          <i className="fa-solid fa-book text-5xl text-gray-800 mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">إعدادات الصفحة</h1>
          <p className="text-gray-500">اختر مقاس واتجاه الورقة للبدء</p>
        </div>

        <div className="space-y-6">
          {/* Size Selection */}
          <div className="text-right">
            <label className="block text-sm font-semibold text-gray-700 mb-2">المقاس</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSize('A4')}
                className={`p-4 rounded-xl border transition-all ${
                  size === 'A4'
                    ? 'border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                A4
              </button>
              <button
                onClick={() => setSize('A5')}
                className={`p-4 rounded-xl border transition-all ${
                  size === 'A5'
                    ? 'border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                A5
              </button>
            </div>
          </div>

          {/* Orientation Selection */}
          <div className="text-right">
            <label className="block text-sm font-semibold text-gray-700 mb-2">الاتجاه</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOrientation('portrait')}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  orientation === 'portrait'
                    ? 'border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <i className="fa-regular fa-file text-xl"></i>
                <span>طولي</span>
              </button>
              <button
                onClick={() => setOrientation('landscape')}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  orientation === 'landscape'
                    ? 'border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <i className="fa-regular fa-file fa-rotate-90 text-xl"></i>
                <span>عرضي</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onComplete(size, orientation)}
            className="w-full py-3 mt-6 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>بدء الكتابة</span>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
};