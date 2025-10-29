import { useEffect } from 'react';
import Header from './Componants/Header';
import Items from './Componants/Items';
import LetsGo from './Componants/LetsGo';

function App() {
  useAppHeight();

  return (
    <div className="min-h-[--app-height] flex-1 flex flex-col items-center justify-between font-autour gap-4 w-full p-4 sm:px-6 lg:px-8">
      <Header />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3 overflow-scroll">
        <Items />
      </main>
      <LetsGo />
    </div>
  );
}

export default App;

export function useAppHeight() {
  useEffect(() => {
    const setAppHeight = () => {
      const appHeight = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty(
        '--app-height',
        `${appHeight}px`
      );
    };

    setAppHeight();

    window.visualViewport?.addEventListener('resize', setAppHeight);
    window.visualViewport?.addEventListener('scroll', setAppHeight);
    window.addEventListener('orientationchange', setAppHeight);

    return () => {
      window.visualViewport?.removeEventListener('resize', setAppHeight);
      window.visualViewport?.removeEventListener('scroll', setAppHeight);
      window.removeEventListener('orientationchange', setAppHeight);
    };
  }, []);
}

