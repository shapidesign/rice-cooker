import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  currentPageName?: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          :root {
            --pixel-cream: #F5E6D3;
            --pixel-tan: #E8D5B7;
            --pixel-brown: #B4A485;
            --pixel-dark: #8B7355;
          }
          
          * {
            box-sizing: border-box;
          }
          
          .pixel-font {
            font-family: 'Press Start 2P', cursive;
            font-size: 8px;
            line-height: 1.4;
            image-rendering: pixelated;
            text-rendering: optimizeSpeed;
            -webkit-font-smoothing: none;
          }
          
          .app-container {
            background: var(--pixel-cream);
            height: 100vh;
            max-height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 16px;
            overflow: hidden;
          }
          
          .pixel-border {
            border: 2px solid var(--pixel-dark);
            box-shadow: 2px 2px 0px var(--pixel-brown);
            image-rendering: pixelated;
          }
          
          .retro-button {
            background: var(--pixel-tan);
            border: 2px solid var(--pixel-dark);
            box-shadow: 
              2px 2px 0px var(--pixel-brown),
              inset 1px 1px 0px var(--pixel-cream);
            transition: none;
            image-rendering: pixelated;
            padding: 8px 12px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            touch-action: manipulation;
            user-select: none;
            min-height: 40px;
            font-size: 8px;
            line-height: 1.2;
            position: relative;
          }
          
          .retro-button:hover {
            background: var(--pixel-cream);
          }
          
          .retro-button:active,
          .retro-button.pressed {
            background: var(--pixel-brown);
            color: var(--pixel-cream);
            box-shadow: none;
            transform: translate(2px, 2px);
          }
          
          .retro-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
          
          .retro-button.active {
            background: var(--pixel-brown);
            color: var(--pixel-cream);
          }
          
          .bounce-animation {
            animation: bounce 2s infinite ease-in-out;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          
          .blink-animation {
            animation: blink 1.5s infinite;
          }
          
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          
          .victory-animation {
            animation: victory 1s infinite alternate ease-in-out;
          }
          
          @keyframes victory {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }

          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            height: 32px;
            flex-shrink: 0;
          }

          .page-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
          }

          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            height: 100%;
          }

          .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 6px;
          }

          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .opacity-60 { opacity: 0.6; }
          .opacity-70 { opacity: 0.7; }
          .opacity-80 { opacity: 0.8; }

          .mb-1 { margin-bottom: 4px; }
          .mb-2 { margin-bottom: 8px; }
          .mb-3 { margin-bottom: 12px; }
          .mb-4 { margin-bottom: 16px; }
          .mb-6 { margin-bottom: 24px; }

          .mt-1 { margin-top: 4px; }
          .mt-2 { margin-top: 8px; }
          .mt-4 { margin-top: 16px; }
          .mt-auto { margin-top: auto; }

          .p-2 { padding: 8px; }
          .p-3 { padding: 12px; }
          .p-4 { padding: 16px; }

          .px-2 { padding-left: 8px; padding-right: 8px; }
          .py-1 { padding-top: 4px; padding-bottom: 4px; }
          .py-3 { padding-top: 12px; padding-bottom: 12px; }

          .w-full { width: 100%; }
          .h-12 { height: 48px; }
          .h-14 { height: 56px; }
          .h-16 { height: 64px; }

          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .items-center { align-items: center; }
          .justify-center { justify-content: center; }
          .justify-between { justify-content: space-between; }

          .gap-2 { gap: 8px; }
          .gap-3 { gap: 12px; }
          .gap-4 { gap: 16px; }

          .space-y-2 > * + * { margin-top: 8px; }
          .space-y-3 > * + * { margin-top: 12px; }

          .bg-pixel-brown { background-color: var(--pixel-brown); }
          .bg-pixel-cream { background-color: var(--pixel-cream); }
          .bg-pixel-tan { background-color: var(--pixel-tan); }
          .text-pixel-cream { color: var(--pixel-cream); }
          .text-pixel-dark { color: var(--pixel-dark); }

          .text-xs { font-size: 8px; }
          .text-sm { font-size: 10px; }
          .text-lg { font-size: 12px; }
          .text-xl { font-size: 16px; }
          .text-2xl { font-size: 20px; }

          .relative { position: relative; }
          .absolute { position: absolute; }
          .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
          .left-0 { left: 0; }
          .top-0 { top: 0; }
          .overflow-hidden { overflow: hidden; }
          .transition-all { transition: all 0.3s ease; }
          .duration-1000 { transition-duration: 1000ms; }
          .inline-block { display: inline-block; }
          .block { display: block; }
          .min-w-16 { min-width: 64px; }
          .w-10 { width: 40px; }
          .h-10 { height: 40px; }
          .h-6 { height: 24px; }
          .flex-shrink-0 { flex-shrink: 0; }
        `}
      </style>
      
      <div className="app-container">
        {children}
      </div>
    </div>
  );
}
