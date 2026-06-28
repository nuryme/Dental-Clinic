import { PHONE, PHONE_ALT, EMAIL, ADDRESS } from '../../clinic.js'

const rows = [
  { label: 'Visit Us', value: ADDRESS, icon: 'M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11Z M12 10a2 2 0 100-.01' },
  { label: 'Call Us', value: `${PHONE} · ${PHONE_ALT}`, icon: 'M3 5.5C3 4.7 3.7 4 4.5 4h2.6c.7 0 1.3.5 1.4 1.2l.6 2.9c.1.5-.1 1-.5 1.3L7.2 10.5a12 12 0 0 0 5.3 5.3l1.1-1.4c.3-.4.8-.6 1.3-.5l2.9.6c.7.1 1.2.7 1.2 1.4v2.6c0 .8-.7 1.5-1.5 1.5C9.6 21 3 14.4 3 5.5Z' },
  { label: 'Email Us', value: EMAIL, icon: 'M3 5h18v14H3z M4 7l8 6 8-6' },
  { label: 'Opening Hours', value: 'Sat–Thu: 11 AM – 11 PM · Friday closed', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18Z M12 7v5l3.5 2' },
]

// Native Google Maps embed — no API key, no dependency.
const MAP =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Jamuna Future Park, Vatara, Dhaka 1212') +
  '&output=embed'

export default function ContactUs() {
  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            Get in Touch
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Contact Us
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ul className="space-y-7">
            {rows.map(({ label, value, icon }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <iframe
            title="Smile Dental location map"
            src={MAP}
            loading="lazy"
            className="h-72 w-full rounded-2xl border border-sky-muted/40 shadow-lg lg:h-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
