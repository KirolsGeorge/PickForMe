import Header from '../Header';
import Items from '../Items';
import LetsGo from '../LetsGo';
import SpeedButton from './pagesComponants';
import { useState } from 'react';
// import SpinnerWheel from '../spinnerWheel';

type PropsHomePage = {
  goNext: () => void;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
};

type PropsSpinnerPage = {
  goBack: () => void;
  items: string[];
};

export function HomePage({ goNext, items, setItems }: PropsHomePage) {
  const hasEmptyRow = items.some((v) => v.trim() === '');
  const errorMsg =
    items.length < 2
      ? 'Please add at least 2 items'
      : 'Please Fill all the items';
  const safeGo =
    items.length > 1 && items.length < 9 && !hasEmptyRow ? goNext : undefined;
  return (
    <>
      <Header type="home" backHandler={() => {}} />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3 overflow-scroll scrollbar-hide">
        <Items items={items} setItems={setItems} />
      </main>
      {hasEmptyRow || items.length < 2 ? (
        <div
          className="flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-3 py-2"
          role="alert"
        >
          <p className="text-sm">{errorMsg}</p>
        </div>
      ) : (
        <LetsGo onClick={safeGo} />
      )}
    </>
  );
}

export function SpinnerPage({ goBack }: PropsSpinnerPage) {
  // const [spinningTime, setSpinningTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const speeds = ['1x', '2x', '3x'];

  return (
    <>
      <Header type="spinner" backHandler={goBack} />
      <main className="flex flex-col items-center flex-1 w-full overflow-scroll gap-10 scrollbar-hide">
        <div className="flex items-center justify-between w-full gap-5 mt-10">
         {speeds.map((speed, index) => (
            <SpeedButton
              key={speed}
              active={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              {speed}
            </SpeedButton>
          ))}
        </div>
        {/* <SpinnerWheel items={items} /> */}
      </main>
    </>
  );
}
