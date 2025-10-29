import { useState } from 'react';
import Header from '../Header';
import Items from '../Items';
import LetsGo from '../LetsGo';

type Props = {
  goNext: () => void;
};

export default function HomePage({ goNext }: Props) {
  const [items, setItems] = useState<string[]>(['Primos Pizza', 'Prokar']);
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
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3 overflow-scroll">
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
