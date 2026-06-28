import { useState } from 'react'
import sideImg from '../../assets/teeth_image.jpg'

// ponytail: `avatar` reuses the side photo — swap for real patient photos when available.
const reviews = [
  {
    quote:
      'I was terrified of dental work, but Dr. Ismail made my implant completely painless. The clinic is spotless and the team explains every step.',
    name: 'Tahmina R.',
    detail: 'Dental implant patient',
    avatar: sideImg,
  },
  {
    quote:
      'Got my braces here and my smile is transformed. Honest advice, fair pricing, and always on time with appointments.',
    name: 'Sabbir H.',
    detail: 'Orthodontic patient',
    avatar: sideImg,
  },
  {
    quote:
      'Took my daughter for her first checkup — so gentle and patient with her. She actually asks to go back now!',
    name: 'Nusrat J.',
    detail: 'Parent of patient',
    avatar: sideImg,
  },
]

export default function Testimonial() {
  const [i, setI] = useState(0)
  const r = reviews[i]

  return (
    <section id="reviews" className="bg-brand/5">
      <div className="grid lg:grid-cols-2">
        {/* review — left, centered. Fixed min-height so it doesn't jump between slides */}
        <div className="order-2 flex flex-col items-center justify-center px-6 py-16 text-center lg:order-1 lg:min-h-[520px] lg:px-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            Testimonials
          </p>

          <img
            src={r.avatar}
            alt={r.name}
            className="mt-6 h-20 w-20 rounded-full object-cover shadow-lg ring-4 ring-white"
          />

          <div className="mt-5 flex gap-1 text-brand-soft" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, n) => (
              <svg key={n} viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.8 5.9 19.4 7.4 13l-5-4.3 6.6-.6L12 2Z" />
              </svg>
            ))}
          </div>

          <blockquote className="mt-5 max-w-md font-display text-base font-medium leading-relaxed text-ink sm:text-lg">
            "{r.quote}"
          </blockquote>
          <p className="mt-6 font-semibold text-ink">{r.name}</p>
          <p className="text-sm text-ink/60">{r.detail}</p>

          <div className="mt-8 flex gap-3">
            {reviews.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show review ${n + 1}`}
                aria-current={n === i}
                className={`h-2.5 rounded-full transition-all ${
                  n === i ? 'w-7 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* image — right, full height & half width */}
        <div className="order-1 min-h-[280px] lg:order-2 lg:min-h-0">
          <img
            src={sideImg}
            alt="Happy patient at Smile Dental"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
