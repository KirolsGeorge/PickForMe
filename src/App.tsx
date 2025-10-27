import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-2xl p-6 text-center">
        <div className="mb-8 flex items-center justify-center gap-8">
          <a href="https://vite.dev" target="_blank" rel="noreferrer" className="inline-flex">
            <img src={viteLogo} className="h-16 w-16 drop-shadow transition-transform hover:scale-110" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer" className="inline-flex">
            <img src={reactLogo} className="h-16 w-16 drop-shadow transition-transform hover:scale-110 animate-spin" alt="React logo" />
          </a>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Vite + React</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Edit <code className="font-mono">src/App.tsx</code> and save to test HMR</p>

        <div className="mt-6">
          <button
            onClick={() => setCount((n) => n + 1)}
            className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
