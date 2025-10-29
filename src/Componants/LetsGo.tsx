type LetsGoProps = {
  onClick?: () => void;
};
export default function LetsGo({ onClick }: LetsGoProps) {
  return (
    <button
      className="btn w-full rounded-xl text-white h-13 p-4 flex items-center justify-center bg-linear-to-tr from-fuchsia-500 to-purple-800 border-none"
      onClick={onClick}
    >
      Let's Go
    </button>
  );
}
