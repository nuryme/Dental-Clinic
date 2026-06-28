// Reference-style split: image on the left half, four icon + text parts on the right.
// ponytail: image defaults to the existing clinic photo — swap for a clean dental photo.
import sideImg from '../../assets/hero.jpg'

const parts = [
  {
    title: 'Anxiety-Free Visits',
    desc: 'A calm, gentle approach so even nervous patients feel at ease from the first hello.',
    icon: 'M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11Z M9 10c.5-1 2.5-1 3 0M9 13c1 1.2 3.5 1.2 4.5 0',
  },
  {
    title: 'Same-Day Pain Relief',
    desc: 'Single-sitting root canals and urgent care to get you out of pain fast.',
    icon: 'M13 3 4 14h7l-1 7 9-11h-7l1-7Z',
  },
  {
    title: 'Precise Digital Diagnosis',
    desc: 'RVG digital X-ray and microscope-assisted treatment for accurate, low-radiation care.',
    icon: 'M4 7V5a1 1 0 011-1h2M20 7V5a1 1 0 00-1-1h-2M4 17v2a1 1 0 001 1h2M20 17v2a1 1 0 01-1 1h-2M8 12h8',
  },
  {
    title: 'Sterilized & Safe',
    desc: '100% sterilized instruments and strict protocols you can trust, every single visit.',
    icon: 'M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6l7-3Z M9 12l2 2 4-4',
  },
]

export default function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        {/* image — left; absolute so the right-side text drives the height */}
        <div className="relative min-h-[280px] lg:min-h-0">
          <img
            src={sideImg}
            alt="Comfortable, modern treatment at Smile Dental"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* text container — right */}
        <div className="px-6 py-16 lg:px-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            Comfort First
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Care Built Around You
          </h2>

          {/* 2 rows × 2 columns */}
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {parts.map(({ title, desc, icon }) => (
              <li key={title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
