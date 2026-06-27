import { Link } from 'react-router-dom';
import { publicUrl } from '../utils/publicUrl';

/** All transformation images for Wall of Fame */
const ALL_TRANSFORMATIONS = [
  { id: 1, image: publicUrl('/images/1.png'), label: 'Client Transformation' },
  { id: 2, image: publicUrl('/images/2.png'), label: 'Client Transformation' },
  { id: 3, image: publicUrl('/images/9.png'), label: 'Elite Transformation' },
  { id: 4, image: publicUrl('/images/4.png'), label: 'Client Transformation' },
  { id: 5, image: publicUrl('/images/5.PNG'), label: 'Elite Transformation' },
  { id: 6, image: publicUrl('/images/6.JPEG'), label: 'Client Transformation' },
  { id: 7, image: publicUrl('/images/7.PNG'), label: 'Elite Transformation' },
  { id: 8, image: publicUrl('/images/8.png'), label: 'Client Transformation' },
  { id: 9, image: publicUrl('/images/9.png'), label: 'Elite Transformation' }
] as const;

export default function Transformations() {
  return (
    <div className="min-h-screen bg-surface-container-lowest text-white font-body">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black mb-4 tracking-tighter uppercase">
            All <span className="text-yellow-400">Transformations</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto font-body text-sm">
            Real results from the Flex Protocol. These transformations are the direct outcome of discipline, pure aesthetics, and the 69-day protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_TRANSFORMATIONS.map((transformation) => (
            <div
              key={transformation.id}
              className="relative group rounded-2xl overflow-hidden bg-surface-container border border-white/10"
            >
              <img
                src={transformation.image}
                alt={transformation.label}
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-headline font-bold text-sm">
                  {transformation.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block font-headline font-bold uppercase text-[10px] tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors border-b border-cyan-600 hover:border-cyan-400 pb-1"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
