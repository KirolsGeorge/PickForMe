type BackButtonProps = {
  onClick: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      className="btn size-8 absolute left-0 rounded-full text-white p-1 flex items-center justify-center bg-gray-800 border-none"
      id="backButton"
      onClick={onClick}
    >
      <i className="fa-solid fa-caret-left"></i>
    </button>
  );
}
