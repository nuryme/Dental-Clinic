import clinicImg from '../../assets/hero.jpg'
import { WHATSAPP } from '../../clinic.js'

const points = [
  'Led by Dr. Md. Ismail Hossain — BDS (DU), 7+ years',
  'RVG digital X-ray & modern microscope-assisted care',
  '100% sterilized instruments, every single visit',
]

export default function Welcome() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative">
          <img
            src={clinicImg}
            alt="Dr. Md. Ismail Hossain treating a patient at Smile Dental"
            className="aspect-[5/4] w-full rounded-2xl object-cover shadow-2xl shadow-brand/15"
          />
          <div className="absolute -bottom-6 left-6 rounded-xl bg-brand px-6 py-4 text-white shadow-xl">
            <p className="font-display text-2xl font-extrabold leading-none">7+ yrs</p>
            <p className="mt-1 text-xs text-white/85">of trusted care</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            Welcome
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Welcome to Smile Dental
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Smile Dental — Aesthetic, Orthodontic &amp; Implant Centre brings
            modern technology and a genuinely gentle approach to every patient.
            From routine checkups to full smile makeovers, we focus on
            comfortable, lasting results you can be proud of.
          </p>

          <ul className="mt-7 space-y-3">
            {points.map((p) => (
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
            Book a consultation
          </a>
        </div>
      </div>
    </section>
  )
}
