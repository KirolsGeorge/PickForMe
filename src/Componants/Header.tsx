import BackButton from '../Componants/backButoon';
export default function Header() {
  return (
    <header className="w-full text-center flex relative items-center">
      <BackButton />
      <p className="text-3xl text-white flex-1">Players</p>
    </header>
  );
}
