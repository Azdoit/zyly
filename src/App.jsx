import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import miniProgramSource from '../中医小程序.txt?raw';
import pcSource from '../中医pc端.txt?raw';

const pages = [
  {
    path: '/mini-program',
    title: '中医小程序',
    label: '小程序端',
    description: '展示 `中医小程序.txt` 的完整原始内容。',
    content: miniProgramSource,
  },
  {
    path: '/pc',
    title: '中医 PC 端',
    label: 'PC 端',
    description: '展示 `中医pc端.txt` 的完整原始内容。',
    content: pcSource,
  },
];

function Layout({ page }) {
  const lines = page.content.split('\n');

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f7f1e5,transparent_45%),linear-gradient(180deg,#f8f5ef_0%,#efe7d7_100%)] text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[2rem] border border-stone-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-35px_rgba(120,53,15,0.35)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex rounded-full border border-amber-700/20 bg-amber-700/10 px-3 py-1 text-xs font-medium tracking-[0.24em] text-amber-900 uppercase">
                React + Vite + Tailwind
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
              <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">{page.description}</p>
            </div>
            <nav className="flex flex-wrap gap-3">
              {pages.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'rounded-full border px-4 py-2 text-sm transition',
                      isActive
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:text-stone-950',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <section className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-[#1c1917] shadow-[0_25px_80px_-40px_rgba(28,25,23,0.75)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-sm text-stone-300">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div>{lines.length} lines</div>
            </div>
            <div className="overflow-x-auto">
              <div className="grid min-w-full grid-cols-[auto_1fr] font-mono text-[13px] leading-6 text-stone-200 sm:text-sm">
                {lines.map((line, index) => (
                  <FragmentLine key={`${page.path}-${index}`} index={index} line={line} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function FragmentLine({ index, line }) {
  return (
    <>
      <div className="select-none border-r border-white/8 bg-white/4 px-4 text-right text-stone-500">
        {index + 1}
      </div>
      <pre className="overflow-visible px-4 whitespace-pre-wrap break-words">{line || ' '}</pre>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mini-program" replace />} />
      {pages.map((page) => (
        <Route key={page.path} path={page.path} element={<Layout page={page} />} />
      ))}
    </Routes>
  );
}
