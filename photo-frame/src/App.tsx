import { PhotoEditor } from './components/PhotoEditor';
import { Terminal } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center w-full">
      {/* Header */}
      <header className="w-full p-6 flex flex-col items-center gap-4 mt-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-stone-200">
            <Terminal size={28} className="text-campfire-orange" />
          </div>
          <h1 className="dream-font text-3xl md:text-5xl text-white font-normal uppercase tracking-wide drop-shadow-md text-center">
            Campfire Frame
          </h1>
        </div>
        <p className="text-white/80 text-center max-w-md font-medium text-lg">
          Show the world that you're joining Campfire! <br />

        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl px-4 pb-12">
        <PhotoEditor />
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-white/60 text-sm">
        <p className="flex items-center justify-center gap-2">
          Made with ❤️ By <a href='https://rohanghalib.com'>Rohan Ghalib</a> for Hack Club
        </p>
      </footer>
    </div>
  );
}

export default App;
