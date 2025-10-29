import BackButton from '../Componants/backButoon';

type HeaderProps = {
  type: string;
  backHandler: () => void;
};

export default function Header({ type, backHandler }: HeaderProps) {
  return type === 'home' ? (
    <header className="w-full text-center flex relative items-center">
      <p className="text-3xl text-white flex-1">Items</p>
    </header>
  ) : (
    <header className="w-full text-center flex relative items-center">
      <BackButton onClick={backHandler} />
      <p className="text-3xl text-white flex-1">Spin the Wheel</p>
    </header>
  );
}
