import { useEffect } from 'react'
import Header from './Componants/Header';
import Items from './Componants/Items';
import LetsGo from './Componants/LetsGo';

function App() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH(); // set on load
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black font-autour gap-5 max-w-4xl p-4 sm:px-6 lg:px-8 overscroll-none">
      <Header />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3">
        <Items />
        <LetsGo />
      </main>
    </div>
  );
}

export default App;

