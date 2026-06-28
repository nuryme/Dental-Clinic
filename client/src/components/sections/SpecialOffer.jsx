import { WHATSAPP } from '../../clinic.js'

export default function SpecialOffer() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-brand to-ink py-16 text-white lg:py-20">
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/5"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Special Offer
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            10% Off Dental Implants
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            Book your implant consultation this month and save 10% on treatment.
            Limited slots — reserve yours over WhatsApp today.
          </p>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl lg:mt-0"
        >
          Claim the offer
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
