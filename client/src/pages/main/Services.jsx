import PageHeader from '../../components/common/PageHeader.jsx'
import ServiceTiles from '../../components/sections/ServiceTiles.jsx'
import Appointment from '../../components/sections/Appointment.jsx'
import Reveal from '../../components/common/Reveal.jsx'
import { WHATSAPP, PHONE } from '../../clinic.js'
import teethImg from '../../assets/teeth_image.jpg'

// All clinic services (CLAUDE.md), each with a reused line icon.
const services = [
  { title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacement with precise digital planning.', icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 4 2 6 2.7 10 .3 1.7.5 3 1.3 3s.9-1.3 1.1-2.8c.2-1.5.4-2.7 1.2-2.7s1 1.2 1.2 2.7c.2 1.5.4 2.8 1.1 2.8' },
  { title: 'Orthodontics & Braces', desc: 'Braces and clear aligners that straighten teeth and correct your bite.', icon: 'M4 9h16M4 15h16M8 9v6M12 9v6M16 9v6' },
  { title: 'Advanced Root Canal', desc: 'Single-sitting, pain-free therapy under precise RVG digital X-ray.', icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 4.2 2.2 6.5 2.7 10 .3 2 .5 3 1.3 3s.9-1.6.9-3.5' },
  { title: 'Cosmetic & Smile Design', desc: 'Veneers, bonding and full makeovers designed around your face.', icon: 'M3 12c2.5-3.6 15.5-3.6 18 0-2.5 3.6-15.5 3.6-18 0Z M9 12h.01M15 12h.01' },
  { title: 'Crowns & Bridges', desc: 'Durable Zirconium crowns and bridges that look and feel natural.', icon: 'M5 9l2-4h10l2 4M5 9h14l-1.5 10h-11L5 9Z' },
  { title: 'Laser Whitening', desc: 'Safe, in-clinic whitening for a brighter smile in a single visit.', icon: 'M12 3v3M12 18v3M5 5l2 2M17 17l2 2M3 12h3M18 12h3M5 19l2-2M17 7l2-2M12 8a4 4 0 100 8 4 4 0 000-8Z' },
  { title: 'Kids Dentistry', desc: 'Gentle, friendly dental care for little smiles of every age.', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18Z M9 10h.01M15 10h.01M9 15c1 1.2 5 1.2 6 0' },
  { title: 'Fillings', desc: 'Tooth-coloured fillings that restore decayed teeth discreetly.', icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 4 2 6 2.7 10 .3 1.7.5 3 1.3 3s.9-1.3 1.1-2.8' },
  { title: 'Scaling & Polishing', desc: 'Professional cleaning to keep gums healthy and breath fresh.', icon: 'M4 7V5a1 1 0 011-1h2M20 7V5a1 1 0 00-1-1h-2M4 17v2a1 1 0 001 1h2M20 17v2a1 1 0 01-1 1h-2M8 12h8' },
]

const promises = [
  'Same-day appointments & urgent pain relief',
  'RVG digital X-ray for low-radiation diagnosis',
  '100% sterilized instruments, every visit',
  'A calm, genuinely pain-free approach',
]

// ponytail: indicative "starting from" prices — confirm real figures with the clinic.
const pricing = [
  ['Consultation & Checkup', '৳500'],
  ['Scaling & Polishing', '৳1,500'],
  ['Tooth-Coloured Filling', '৳1,000'],
  ['Root Canal Therapy', '৳5,000'],
  ['Laser Whitening', '৳8,000'],
  ['Zirconium Crown', '৳12,000'],
  ['Braces (full treatment)', '৳40,000'],
  ['Dental Implant', '৳40,000'],
]

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Comprehensive Dental Services"
        subtitle="From routine checkups to full smile makeovers — modern technology and a gentle, pain-free approach for every member of your family."
      />

      {/* services grid */}
      <Reveal>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, desc, icon }) => (
              <li key={title} className="group text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand/20 text-brand transition duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-9 w-9" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink/65">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      {/* 4-part overlay section — same as the home page */}
      <Reveal><ServiceTiles /></Reveal>

      {/* call & see a dentist */}
      <Reveal>
      <section className="bg-brand/5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
              Call & See a Dentist
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Book Your Visit Today
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              Not sure which treatment you need? Talk to our team — we'll assess
              your smile and recommend the right, honest plan for you.
            </p>
            <ul className="mt-7 space-y-3">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Call {PHONE}
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src={teethImg}
              alt="Patient with a healthy, bright smile"
              className="h-72 w-72 rounded-full object-cover shadow-2xl ring-8 ring-white lg:h-80 lg:w-80"
            />
          </div>
        </div>
      </section>
      </Reveal>

      {/* pricing */}
      <Reveal>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
              Transparent Pricing
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Fair, Upfront Treatment Costs
            </h2>
            <ul className="mt-8 divide-y divide-sky-muted/40">
              {pricing.map(([name, price]) => (
                <li key={name} className="flex items-center justify-between py-3.5 text-sm">
                  <span className="text-ink/80">{name}</span>
                  <span className="font-semibold text-brand">{price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand/5 p-8 lg:p-10">
            <h3 className="font-display text-xl font-bold text-ink">No surprises, ever</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Prices above are indicative starting points. Your final treatment
              plan and cost are confirmed only after a proper examination — so you
              always know exactly what to expect before we begin.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              We accept flexible payment for larger treatments like implants and
              orthodontics. Ask us about instalment options during your consultation.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get a personalised quote
            </a>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal><Appointment /></Reveal>
    </>
  )
}
