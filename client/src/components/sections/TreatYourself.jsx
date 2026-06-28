import { useState } from 'react'
import teethImg from '../../assets/teeth_image.jpg'
import smileImg from '../../assets/smile_image.jpg'
import { WHATSAPP } from '../../clinic.js'

// 6 cards, shown 3 per slide; the dots page through them.
const cards = [
  { title: 'Laser Whitening', desc: 'A brighter smile in a single in-clinic visit.', icon: 'M12 3v3M12 18v3M5 5l2 2M17 17l2 2M3 12h3M18 12h3M5 19l2-2M17 7l2-2M12 8a4 4 0 100 8 4 4 0 000-8Z', img: teethImg },
  { title: 'Smile Makeover', desc: 'Veneers and bonding tailored to your face.', icon: 'M3 12c2.5-3.6 15.5-3.6 18 0-2.5 3.6-15.5 3.6-18 0Z M9 12h.01M15 12h.01', img: smileImg },
  { title: 'Clear Aligners', desc: 'Straighten teeth discreetly at any age.', icon: 'M4 9h16M4 15h16M8 9v6M12 9v6M16 9v6', img: teethImg },
  { title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacement.', icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 4 2 6 2.7 10 .3 1.7.5 3 1.3 3s.9-1.3 1.1-2.8c.2-1.5.4-2.7 1.2-2.7s1 1.2 1.2 2.7c.2 1.5.4 2.8 1.1 2.8', img: smileImg },
  { title: 'Pain-Free Root Canal', desc: 'Single-sitting therapy under RVG X-ray.', icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 4.2 2.2 6.5 2.7 10 .3 2 .5 3 1.3 3s.9-1.6.9-3.5', img: teethImg },
  { title: 'Kids Dentistry', desc: 'Gentle, friendly care for little smiles.', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18Z M9 10h.01M15 10h.01M9 15c1 1.2 5 1.2 6 0', img: smileImg },
]

const PER_SLIDE = 3
const groups = []
for (let i = 0; i < cards.length; i += PER_SLIDE) groups.push(cards.slice(i, i + PER_SLIDE))

export default function TreatYourself() {
  const [page, setPage] = useState(0)

  return (
    <section className="bg-brand/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            Treat Yourself
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Cheer Yourself Up
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Looking after your smile should feel like a treat, not a chore. From a
            quick brightening session to a complete makeover, choose the care that
            lifts your confidence — gentle, modern, and tailored to you.
          </p>
        </div>

        {/* sliding track — each group of 3 is one full-width slide */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {groups.map((group, gi) => (
              <ul key={gi} className="grid w-full shrink-0 gap-6 px-1 md:grid-cols-3">
                {group.map(({ title, desc, icon, img }) => (
                  <li
                    key={title}
                    className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-brand/5 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={img} alt="" aria-hidden="true" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{desc}</p>
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:gap-2.5"
                      >
                        Book now
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* carousel dots — slide through the cards */}
        <div className="mt-12 flex justify-center gap-3">
          {groups.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-label={`Show cards ${n + 1}`}
              aria-current={n === page}
              className={`h-2.5 rounded-full transition-all ${
                n === page ? 'w-7 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
