import Header from '../Header';
import Items from '../Items';
import LetsGo from '../LetsGo';
import SpinnerWheel from '../spinnerWheel';
import { useState } from 'react';

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

export function SpinnerPage({ goBack, items }: PropsSpinnerPage) {
  const [spinningTime, setSpinningTime] = useState(0);

  return (
    <>
      <Header type="spinner" backHandler={goBack} />
      <main className="flex flex-col items-center justify-center flex-1 w-full overflow-scroll gap-10 scrollbar-hide">
        <div className="flex flex-col items-center justify-between w-full gap-2">
          <p className="text-white">Set The Time OR Just Hit Spin!</p>
          <input
            type="number"
            className="grow text-white placeholder:text-gray-500 focus-visible:outline-none bg-gray-800 p-4 rounded-xl border-none w-full"
            placeholder="Spinning Time (From 1 to 10)"
            min={1}
            max={10}
            onChange={(e) =>
              e.target.value &&
              Number(e.target.value) <= 10 &&
              Number(e.target.value) >= 1
                ? setSpinningTime(Number(e.target.value))
                : setSpinningTime(3)
            }
          />
        </div>
        <SpinnerWheel items={items} spinDuration={spinningTime || 3} />
      </main>
    </>
  );
}
