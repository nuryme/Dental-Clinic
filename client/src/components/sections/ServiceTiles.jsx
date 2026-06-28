// 4-part section. Each tile shows a background image; on hover the image
// zooms and the body text + button fade in.
import teethImg from '../../assets/teeth_image.jpg'
import smileImg from '../../assets/smile_image.jpg'

const tiles = [
  {
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding and full smile makeovers designed around your face.',
    tint: 'from-brand/40 to-ink/70',
    img: teethImg,
  },
  {
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking replacements with precise digital planning.',
    tint: 'from-ink/60 to-brand/70',
    img: smileImg,
  },
  {
    title: 'Orthodontics',
    desc: 'Braces and clear aligners that straighten teeth and correct your bite.',
    tint: 'from-brand-soft/40 to-brand/80',
    img: teethImg,
  },
  {
    title: 'Laser Whitening',
    desc: 'Safe, in-clinic whitening for a brighter smile in a single visit.',
    tint: 'from-brand/50 to-ink/75',
    img: smileImg,
  },
]

export default function ServiceTiles() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map(({ title, desc, tint, img }) => (
        <a
          key={title}
          href="#appointment"
          className="group relative isolate flex h-72 items-end overflow-hidden lg:h-80"
        >
          {/* zooming background image */}
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 -z-10 bg-gradient-to-t ${tint} transition-opacity duration-300 group-hover:opacity-90`}
          />

          <div className="w-full p-7 text-white">
            <h3 className="font-display text-xl font-bold drop-shadow">{title}</h3>
            {/* revealed on hover */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100">
              <div className="overflow-hidden">
                <p className="pt-3 text-sm leading-relaxed text-white/90">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-brand">
                  Book now
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </section>
  )
}
