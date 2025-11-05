import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Dispatch Management System
          </h1>
          <p className="text-xl text-purple-200">
            Manage your dispatch entries efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/dispatch">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Dispatch Entry
              </h2>
              <p className="text-purple-200">
                Create new dispatch entries with auto-fill BC Code lookup
              </p>
            </div>
          </Link>

          <Link href="/admin">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 cursor-pointer">
              <div className="text-6xl mb-4">🔧</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Admin Upload
              </h2>
              <p className="text-purple-200">
                Upload Excel files to populate BC Master Database
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}