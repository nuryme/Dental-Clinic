import PageHeader from '../../components/common/PageHeader.jsx'
import Welcome from '../../components/sections/Welcome.jsx'
import WhyChoose from '../../components/sections/WhyChoose.jsx'
import Team from '../../components/sections/Team.jsx'
import SpecialOffer from '../../components/sections/SpecialOffer.jsx'
import Reveal from '../../components/common/Reveal.jsx'

const features = [
  'Aesthetic & cosmetic dentistry',
  'Orthodontics & clear aligners',
  'Implant & maxillofacial surgery',
  'Advanced, single-sitting root canal',
  'RVG digital X-ray diagnosis',
  'Zirconium crowns & bridges',
  '100% sterilized instruments',
  'Pain-free, anxiety-aware care',
  'Friendly kids dentistry',
]

const awards = [
  'BDS — Dhaka University',
  'PGT — Oral & Maxillofacial Surgery',
  'BMDC Registered',
  '7+ Years of Practice',
  '500+ Happy Patients',
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Creating Beautiful Smiles"
        subtitle="Smile Dental — Aesthetic, Orthodontic & Implant Centre brings modern technology and a genuinely gentle approach to dentistry in Vatara, Dhaka."
      />

      <Reveal><Welcome /></Reveal>

      {/* what we offer — checklist */}
      <Reveal>
      <section className="bg-brand/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
              Why Patients Choose Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Complete Care Under One Roof
            </h2>
          </div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-ink/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      <Reveal><WhyChoose /></Reveal>

      {/* mission quote band */}
      <Reveal>
      <section className="bg-gradient-to-r from-brand to-ink py-20 text-center text-white lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <svg viewBox="0 0 24 24" fill="currentColor" className="mx-auto h-10 w-10 text-white/40" aria-hidden="true">
            <path d="M7 7h4v6c0 2.2-1.8 4-4 4v-2c1.1 0 2-.9 2-2H7V7Zm8 0h4v6c0 2.2-1.8 4-4 4v-2c1.1 0 2-.9 2-2h-2V7Z" />
          </svg>
          <p className="mt-6 font-display text-2xl font-medium leading-relaxed sm:text-3xl">
            Our mission is simple — to make world-class dental care feel calm,
            honest and genuinely pain-free for every single patient.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
            Dr. Md. Ismail Hossain — Chief Dental Surgeon
          </p>
        </div>
      </section>
      </Reveal>

      <Reveal><Team /></Reveal>

      {/* awards & associations */}
      <Reveal>
      <section className="bg-brand/5 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
              Credentials
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Awards & Associations
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {awards.map((a) => (
              <li key={a} className="flex flex-col items-center text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand/20 text-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 21.5 7.1 18.2l.9-5.5-4-3.9L9.5 8 12 3Z" />
                  </svg>
                </span>
                <p className="mt-3 text-xs font-medium leading-snug text-ink/70">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      <Reveal><SpecialOffer /></Reveal>
    </>
  )
}
