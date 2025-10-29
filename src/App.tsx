import { useEffect } from 'react';
import Header from './Componants/Header';
import Items from './Componants/Items';
import LetsGo from './Componants/LetsGo';

function App() {
  useAppHeight();

  return (
    <div className="min-h-[calc(var(--app-height))] flex flex-col items-center justify-between bg-black font-autour gap-5 max-w-4xl p-4 sm:px-6 lg:px-8 overscroll-none">
      <Header />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3">
        <Items />
        <LetsGo />
      </main>
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


