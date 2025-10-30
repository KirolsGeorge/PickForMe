import { useEffect, useState } from 'react';
import { HomePage, SpinnerPage } from './Componants/Pages/pages';

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

  const [items, setItems] = useState<string[]>(['Primos Pizza', 'Prokar']);

  const [page, setPage] = useState<1 | 2>(1);

  const goNext = () => setPage(2);
  const goBack = () => setPage(1);

  return (
    <div className="relative h-[calc(var(--vh,1vh)*100)] sm:h-screen w-full max-w-4xl p-4 sm:px-6 lg:px-8 font-autour overscroll-none ">
      {/* PAGE 1 — stays mounted */}
      <section
        aria-hidden={page !== 1}
        className={`absolute inset-0 flex flex-col gap-4 p-4 sm:px-6 lg:px-8
                    ${
                      page === 1
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }
                    transition-opacity duration-300`}
      >
        {/* HomePage should internally render its header, main and a button that calls goNext */}
        <HomePage goNext={goNext} items={items} setItems={setItems} />
      </section>

      {/* PAGE 2 — stays mounted */}
      <section
        aria-hidden={page !== 2}
        className={`absolute inset-0 flex flex-col gap-4 p-4 sm:px-6 lg:px-8
                    ${
                      page === 2
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }
                    transition-opacity duration-300`}
      >
        {/* SpinnerPage should internally render its header, main and a Back button that calls goBack */}
        <SpinnerPage goBack={goBack} items={items} />
      </section>
    </div>
  );
}

export default App;

