import { useLocation } from 'react-router-dom';
import { TCMPrototypePage } from '@/prototype/TCMPrototype';

function resolveDefaultView(pathname) {
  if (pathname.startsWith('/pc')) {
    return 'admin';
  }

  if (pathname.startsWith('/both')) {
    return 'both';
  }

  return 'mini';
}

export default function App() {
  const { pathname } = useLocation();
  const defaultView = resolveDefaultView(pathname);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f1e8_0%,#ede5d6_100%)] text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 py-5 sm:px-6 lg:px-8">
        <main className="flex-1">
          <TCMPrototypePage defaultView={defaultView} />
        </main>
      </div>
    </div>
  );
}
