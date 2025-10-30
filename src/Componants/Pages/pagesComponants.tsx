export default function SpeedButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const style = `btn rounded-xl ${
    active ? 'bg-gradient-to-tr from-amber-700 to-orange-400' : 'bg-[#17161d]'
  }  text-white h-full p-[2px] flex items-center justify-center border-none flex-1`;
  return (
    <button className={style} onClick={onClick}>
      <span className="text-2xl bg-[#201e25] p-5 rounded-xl mt-0 mb-6 w-full">
        {children}
      </span>
    </button>
  );
}
