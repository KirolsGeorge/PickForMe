import { useRef } from 'react';

type Props = {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Items({ items, setItems }: Props) {
  // constants
  const MIN = 2;
  const MAX = 8;

  // derived flags
  const overLimit = items.length > MAX;
  const underLimit = items.length < MIN;
  const atMax = items.length >= MAX;
  const hasEmptyRow = items.some((v) => v.trim() === '');

  // refs
  const lastEmptyRef = useRef<HTMLInputElement | null>(null);
  const listIdRef = useRef<string>(
    `items-${Math.random().toString(36).slice(2)}`
  );

  // handlers
  const addHandler = () => {
    if (atMax) return;

    // focus the first empty row instead of stacking multiple empties
    if (hasEmptyRow) {
      lastEmptyRef.current?.focus();
      return;
    }

    setItems((prev) => [...prev, '']);
    // focusing will happen via the input ref callback for the last (empty) item
  };

  const removeHandler = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateValue = (index: number, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const errorMsg = overLimit
    ? `Too many items. Keep up to ${MAX}.`
    : underLimit
    ? `Add at least ${MIN} items.`
    : null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header + counter */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400 text-right w-full">
          {Math.min(items.length, MAX)}/{MAX}
        </span>
      </div>

      {/* Items list */}
      <div
        id={listIdRef.current}
        className="flex flex-col gap-2"
        aria-describedby={errorMsg ? `${listIdRef.current}-error` : undefined}
      >
        {items.map((value, index) => (
          <div
            // index key as requested (no id logic)
            key={index}
            className="flex items-center justify-between bg-gray-800 w-full p-4 rounded-xl gap-2"
          >
            <input
              ref={(el) => {
                // remember the MOST RECENT empty input to focus when needed
                if (value.trim() === '') {
                  lastEmptyRef.current = el;
                }
              }}
              type="text"
              className="grow bg-transparent text-white placeholder:text-gray-500 focus-visible:outline-none"
              value={value}
              placeholder="Type here"
              onChange={(e) => updateValue(index, e.target.value)}
            />

            <button
              type="button"
              className="rounded-full size-8 flex items-center justify-center bg-linear-to-tr from-fuchsia-500 to-purple-800 text-white hover:opacity-90 active:opacity-80"
              onClick={() => removeHandler(index)}
              aria-label={`Remove item ${index + 1}`}
              title="Remove"
            >
              <i className="fa-solid fa-x fa-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* Add button */}
      <button
        type="button"
        className={`border-none flex items-center justify-center bg-gray-800 w-full h-14 p-4 rounded-xl text-gray-300 hover:text-white transition ${
          atMax ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={addHandler}
        disabled={atMax}
        title={atMax ? 'Maximum items reached' : 'Add a new item'}
      >
        + Add Item
      </button>
    </div>
  );
}
