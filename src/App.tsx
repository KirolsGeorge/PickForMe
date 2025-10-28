// import { useState } from 'react'
import Header from './Componants/Header';
import AddButoon from './Componants/addButoon';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-linear-to-br from-blue-800 to-fuchsia-700 font-autour">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <AddButoon />
      </main>
    </div>
  );
}

export default App;

