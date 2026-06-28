import { useRef } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero.jpg'
import secondaryBg from '../../assets/secondary_bg.jpeg'

const WHATSAPP = 'https://wa.me/8801301513311'

export default function Hero() {
  const bgRef = useRef(null)
  const sheenRef = useRef(null)

  // ponytail: cheap "water" drift — parallax the bg + a sheen that follows the
  // cursor. The CSS transition smooths the translate so it reads as liquid, no
  // fluid sim needed. Mutate refs directly to skip re-renders on every move.
  function handleMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5 // -0.5..0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    if (bgRef.current)
      bgRef.current.style.transform = `scale(1.1) translate(${x * -22}px, ${y * -22}px)`
    if (sheenRef.current)
      sheenRef.current.style.background = `radial-gradient(38rem 38rem at ${
        (x + 0.5) * 100
      }% ${(y + 0.5) * 100}%, rgba(130,180,237,0.4), transparent 60%)`
  }

  function handleLeave() {
    if (bgRef.current) bgRef.current.style.transform = 'scale(1.1)'
  }

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative isolate flex min-h-[70vh] flex-1 items-center overflow-hidden bg-brand lg:min-h-0"
    >
      {/* secondary background image — drifts with the cursor (water-like) */}
      <img
        ref={bgRef}
        src={secondaryBg}
        alt=""
        aria-hidden="true"
        style={{ transform: 'scale(1.1)' }}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[400ms] ease-out"
      />
      {/* brand overlay over the bg image — strong on the left for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/95 via-brand/70 to-brand/30"
      />
      {/* soft sheen that tracks the cursor — the "ripple" highlight */}
      <div
        ref={sheenRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300 ease-out"
      />

      {/* doctor + patient photo, right side, left edge faded into the blue */}
      <img
        src={heroImg}
        alt="Dr. Md. Ismail Hossain with a patient at Smile Dental clinic"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-full object-cover object-[center_72%] opacity-25 md:w-[58%] md:opacity-100"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 38%, #000 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 38%, #000 100%)',
        }}
      />

      {/* content — vertically centered (global rule) */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-12 lg:px-10">
        <div className="max-w-xl text-center md:text-left">
          <ul className="flex flex-wrap justify-center gap-2.5 md:justify-start">
            {[
              '500+ Happy Patients',
              '7+ Years Experience',
              'Advanced Implant & Orthodontic Care',
            ].map((stat) => (
              <li
                key={stat}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
              >
                <CheckIcon className="h-3.5 w-3.5 shrink-0" />
                {stat}
              </li>
            ))}
          </ul>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl">
            Confident Smiles,
            <br />
            Crafted with Care
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg md:mx-0 mx-auto">
            Advanced, pain-free dental treatment by Dr. Md. Ismail Hossain —
            7+ years of expertise in implants, orthodontics, and cosmetic
            dentistry, with 100% sterilized care.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book via WhatsApp
            </a>
            <Link
              to="/services"
              className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.23 8.23 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}
