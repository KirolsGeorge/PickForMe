import Header from '../Header';

type Props = {
  goBack: () => void;
};

export default function SpinnerPage({ goBack }: Props) {
  return (
    <>
      <Header type="spinner" backHandler={goBack} />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3 overflow-scroll">
        Wheel
      </main>
    </>
  );
}
