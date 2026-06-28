import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../api.js'
import PageHeader from '../../components/common/PageHeader.jsx'
import fallbackImg from '../../assets/smile_image.jpg'

// Detail page for one doctor. ponytail: reuses GET /doctors and finds by id —
// no dedicated /doctors/:id endpoint needed for the handful of fields we show.
export default function DoctorDetail() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    api('/doctors')
      .then((list) => {
        const d = list.find((x) => x._id === id)
        if (d) setDoctor(d)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [id])

  if (notFound) {
    return (
      <>
        <PageHeader eyebrow="Our Team" title="Doctor not found" />
        <section className="bg-brand/5 py-20 text-center">
          <Link to="/#team" className="font-semibold text-brand hover:underline">← Back to our team</Link>
        </section>
      </>
    )
  }

  if (!doctor) {
    return <section className="py-32 text-center text-ink/50">Loading…</section>
  }

  return (
    <>
      <PageHeader eyebrow="Our Team" title={doctor.name} subtitle={doctor.specialty || ''} />
      <section className="bg-brand/5 py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[280px_1fr] lg:px-10">
          <img
            src={doctor.photoURL || fallbackImg}
            alt={doctor.name}
            className="mx-auto h-64 w-64 rounded-2xl object-cover shadow-lg ring-4 ring-brand/10"
          />
          <div className="rounded-2xl bg-white p-8 shadow-lg shadow-brand/5">
            <h2 className="font-display text-2xl font-extrabold text-ink">{doctor.name}</h2>
            {doctor.specialty && <p className="mt-1 text-base font-semibold text-brand">{doctor.specialty}</p>}

            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="font-semibold uppercase tracking-wider text-ink/50">Working hours</dt>
                <dd className="mt-1 text-ink/80">{doctor.workingHours || 'By appointment — contact the clinic.'}</dd>
              </div>
              {doctor.education && (
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-ink/50">Education</dt>
                  <dd className="mt-2"><Lines text={doctor.education} /></dd>
                </div>
              )}
              {doctor.experience && (
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-ink/50">Experience</dt>
                  <dd className="mt-2"><Lines text={doctor.experience} /></dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                Book an appointment
              </Link>
              <Link to="/#team" className="rounded-full border border-sky-muted/60 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brand/5">
                ← Back to team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Renders newline-separated text as a bulleted list (blank lines ignored).
function Lines({ text }) {
  const items = text.split('\n').map((l) => l.trim()).filter(Boolean)
  return (
    <ul className="space-y-1.5 text-ink/80">
      {items.map((l, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{l}</span>
        </li>
      ))}
    </ul>
  )
}
