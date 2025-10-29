export default function Header() {
  return (
    <header className="w-full text-center py-2 flex relative items-center">
      <button className="btn size-8 absolute left-0 rounded-full text-white p-1 items-center justify-center bg-gray-800 border-none hidden">
        <i className="fa-solid fa-caret-left"></i>
      </button>
      <p className="text-3xl text-white flex-1">Players</p>
    </header>
  );
}
