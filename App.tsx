import React, { useState, useRef, useEffect } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { Toolbar } from './components/Toolbar';
import { PaperSize, Orientation, AppConfig } from './types';
import { PAPER_DIMENSIONS } from './constants';
import { convertPhysicsText } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [content, setContent] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  
  // Use a ref to access the text area content directly if needed, 
  // though controlled state is used here.
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSetupComplete = (size: PaperSize, orientation: Orientation) => {
    setConfig({ size, orientation });
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من العودة؟ سيتم فقد النص الحالي.')) {
      setConfig(null);
      setContent('');
    }
  };

  const handleConvert = async () => {
    if (!content.trim()) return;

    setIsConverting(true);
    try {
      const convertedText = await convertPhysicsText(content);
      setContent(convertedText);
    } catch (error) {
      alert('حدث خطأ أثناء التحويل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsConverting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Inject dynamic print styles based on configuration
  useEffect(() => {
    if (!config) return;

    const styleId = 'dynamic-page-style';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // CSS @page rule requires exact sizing for proper browser PDF generation
    const width = config.size === 'A4' ? '210mm' : '148mm';
    const height = config.size === 'A4' ? '297mm' : '210mm';

    // Swap for landscape
    const finalWidth = config.orientation === 'portrait' ? width : height;
    const finalHeight = config.orientation === 'portrait' ? height : width;

    styleEl.innerHTML = `
      @page {
        size: ${config.size} ${config.orientation};
        margin: 0;
      }
      @media print {
        body {
          padding: 0;
          margin: 0;
        }
        #paper-container {
            width: ${finalWidth} !important;
            height: ${finalHeight} !important;
            margin: 0 !important;
            padding: 20mm !important; /* Standard print margin */
            border: none !important;
            box-shadow: none !important;
        }
        /* Hide placeholder in print */
        textarea::placeholder {
            color: transparent;
        }
      }
    `;

    return () => {
      // Cleanup NOT strictly necessary as the app persists, but good practice
    };
  }, [config]);

  if (!config) {
    return <SetupScreen onComplete={handleSetupComplete} />;
  }

  const dimensions = PAPER_DIMENSIONS[config.size][config.orientation];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-24 pb-12 print:p-0 print:bg-white">
      <Toolbar 
        onConvert={handleConvert}
        onPrint={handlePrint}
        onReset={handleReset}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isConverting={isConverting}
      />

      <div className="flex-1 flex items-center justify-center w-full overflow-auto print:overflow-visible">
        {/* Paper Container */}
        <div
          id="paper-container"
          className="print-only bg-white shadow-lg transition-all relative"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            padding: '20mm', // Visual padding on screen
          }}
        >
          {/* 
            We use a textarea for editing to keep it simple and robust. 
            For printing, we ensure it looks clean.
          */}
          <textarea
            ref={textAreaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب النص هنا..."
            className="w-full h-full resize-none outline-none border-none bg-transparent text-gray-900 leading-normal"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: 'Cairo, sans-serif',
            }}
            spellCheck={false}
          />
        </div>
      </div>
      
      <div className="no-print mt-8 text-gray-400 text-sm">
        <p>Made with ❤️ by Abdel Rahman Elbanna</p>
      </div>
    </div>
  );
};

export default App;
