import { useState } from 'react';

export default function Items() {
  const [items, setItems] = useState<string[]>(['Primos Pizza', 'Prokar']);

  const addHandler = () => {
    setItems([...items, '']);
  };

  const removeHandler = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-800 w-full p-4 rounded-xl gap-2"
        >
          <input
            type="text"
            className="grow bg-transparent text-white focus-visible:outline-none"
            value={item}
            placeholder="Type Here"
            onChange={(e) => {
              const newItems = [...items];
              newItems[index] = e.target.value;
              setItems(newItems);
            }}
          />
          <button
            className="rounded-full size-8 border-none flex items-center justify-center bg-linear-to-tr from-fuchsia-500 to-purple-800 text-white"
            onClick={() => removeHandler(index)}
          >
            <i className="fa-solid fa-x fa-sm"></i>
          </button>
        </div>
      ))}

      <button
        className="border-none flex items-center justify-center bg-gray-800 w-full h-14 p-4 rounded-xl text-gray-400 hover:text-white transition"
        onClick={addHandler}
      >
        + Add Item
      </button>
    </div>
  );
}
