import { useEffect } from 'react';
import Header from './Componants/Header';
import Items from './Componants/Items';
import LetsGo from './Componants/LetsGo';

function App() {
    useEffect(() => {
      function setVH(): void {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
      }

      let lastHeight: number = window.innerHeight;
      let vhCheckTimer: number | null = null;

      function watchVHChanges(): void {
        if (vhCheckTimer !== null) {
          clearTimeout(vhCheckTimer);
        }
        vhCheckTimer = window.setTimeout(() => {
          if (window.innerHeight !== lastHeight) {
            lastHeight = window.innerHeight;
            setVH();
          }
        }, 150);
      }

      // Initialize and add listeners
      setVH();
      window.addEventListener('resize', watchVHChanges);
      window.addEventListener('orientationchange', watchVHChanges);

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', watchVHChanges);
        window.removeEventListener('orientationchange', watchVHChanges);
      };
    }, []);

  return (
    <div className="h-[calc(var(--vh,3vh)*110)] sm:h-screen flex flex-col items-center justify-between font-autour gap-4 w-full p-4 sm:px-6 lg:px-8 overscroll-none">
      <Header />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3 overflow-scroll">
        <Items />
      </main>
      <LetsGo />
    </div>
  );
}

export default App;






