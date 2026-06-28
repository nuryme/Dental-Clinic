import PageHeader from '../../components/common/PageHeader.jsx'
import Testimonial from '../../components/sections/Testimonial.jsx'
import Appointment from '../../components/sections/Appointment.jsx'
import Reveal from '../../components/common/Reveal.jsx'

const reviews = [
  { quote: 'Dr. Ismail made my implant completely painless. The clinic is spotless and the team explains every step.', name: 'Tahmina R.', detail: 'Dental implant patient' },
  { quote: 'Got my braces here and my smile is transformed. Honest advice, fair pricing, always on time.', name: 'Sabbir H.', detail: 'Orthodontic patient' },
  { quote: 'Took my daughter for her first checkup — so gentle and patient. She actually asks to go back now!', name: 'Nusrat J.', detail: 'Parent of patient' },
  { quote: 'Single-sitting root canal with zero pain. I genuinely could not believe how easy it was.', name: 'Rifat K.', detail: 'Root canal patient' },
  { quote: 'The laser whitening gave me a noticeably brighter smile in one visit. Highly recommend.', name: 'Mehzabin A.', detail: 'Whitening patient' },
  { quote: 'Modern equipment, clean rooms and a doctor who actually listens. Best dental experience in Dhaka.', name: 'Arif H.', detail: 'Cosmetic patient' },
]

const stats = [
  ['500+', 'Happy patients'],
  ['4.9★', 'Average rating'],
  ['7+ yrs', 'Of trusted care'],
  ['100%', 'Sterilized visits'],
]

export default function Reviews() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="What Our Patients Say"
        subtitle="Real words from real patients — the calm, pain-free care we're known for, in their own voice."
      />

      {/* stats */}
      <Reveal>
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 text-center lg:grid-cols-4 lg:px-10">
          {stats.map(([n, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-brand sm:text-4xl">{n}</p>
              <p className="mt-1 text-sm text-ink/65">{label}</p>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* review cards */}
      <Reveal>
      <section className="bg-brand/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map(({ quote, name, detail }) => (
              <li key={name} className="flex flex-col rounded-2xl bg-white p-7 shadow-lg shadow-brand/5">
                <div className="flex gap-1 text-brand-soft" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <svg key={n} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.8 5.9 19.4 7.4 13l-5-4.3 6.6-.6L12 2Z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">"{quote}"</blockquote>
                <div className="mt-5">
                  <p className="font-semibold text-ink">{name}</p>
                  <p className="text-xs text-ink/55">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      <Reveal><Testimonial /></Reveal>
      <Reveal><Appointment /></Reveal>
    </>
  )
}
