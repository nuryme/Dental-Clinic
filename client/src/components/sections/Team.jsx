import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api.js'
import fallbackImg from '../../assets/smile_image.jpg'

// "Our Dentists" — 3 per slide, dots page through. Sourced live from the DB
// (GET /doctors); new doctors a super-admin promotes appear here automatically.
const PER_SLIDE = 3

export default function Team() {
  const [doctors, setDoctors] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    api('/doctors')
      .then(setDoctors)
      .catch(() => setDoctors([]))
  }, [])

  const groups = []
  for (let i = 0; i < doctors.length; i += PER_SLIDE) groups.push(doctors.slice(i, i + PER_SLIDE))

  return (
    <section id="team" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Our Dentists</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Award-Winning Dental Care
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            A friendly, experienced team focused on gentle, precise, pain-free care for every patient.
          </p>
        </div>

        {doctors.length === 0 ? (
          <p className="text-center text-sm text-ink/50">Our dental team will be listed here soon.</p>
        ) : (
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {groups.map((group, gi) => (
                  <ul key={gi} className="grid w-full shrink-0 gap-12 px-1 md:grid-cols-3">
                    {group.map((d) => (
                      <li key={d._id} className="text-center">
                        <Link to={`/doctors/${d._id}`} className="group block">
                          <img
                            src={d.photoURL || fallbackImg}
                            alt={d.name}
                            className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg ring-4 ring-brand/10 grayscale transition duration-500 group-hover:grayscale-0"
                          />
                          <h3 className="mt-6 font-display text-lg font-bold text-ink group-hover:text-brand">{d.name}</h3>
                          {d.specialty && <p className="mt-1 text-sm font-semibold text-brand">{d.specialty}</p>}
                          
                          <div>
                            <dd className="mt-1 text-ink/80">{d.workingHours || 'By appointment — contact the clinic.'}</dd>
                          </div>

                          
                          <p className="mt-3 text-sm font-semibold text-brand opacity-0 transition group-hover:opacity-100">View profile →</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {groups.length > 1 && (
              <div className="mt-12 flex justify-center gap-3">
                {groups.map((_, n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-label={`Show dentists ${n + 1}`}
                    aria-current={n === page}
                    className={`h-2.5 rounded-full transition-all ${
                      n === page ? 'w-7 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
