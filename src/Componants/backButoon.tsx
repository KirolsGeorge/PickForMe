export default function BackButton(backHandler: any) {
  return (
    <button
      className="btn size-8 absolute left-0 rounded-full text-white p-1 flex items-center justify-center bg-gray-800 border-none hidden"
      id="backButton"
      onClick={() => backHandler()}
    >
      <i className="fa-solid fa-caret-left"></i>
    </button>
  );
}
