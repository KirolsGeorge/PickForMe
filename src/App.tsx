// import { useState } from 'react'
import Header from './Componants/Header';
import Items from './Componants/Items';
import LetsGo from './Componants/LetsGo';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black font-autour gap-5 max-w-4xl p-4 sm:px-6 lg:px-8 overscroll-none">
      <Header />
      <main className="flex flex-col items-center justify-between flex-1 w-full gap-3">
        <Items />
        <LetsGo />
      </main>
    </div>
  );
}

export default App;


