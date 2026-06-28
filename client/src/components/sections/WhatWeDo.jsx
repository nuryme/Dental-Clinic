// "What We Do" — big circular line-icon + text below each (no cards), like the reference.
const items = [
  {
    title: 'Missing Teeth',
    desc: 'Permanent dental implants that restore your bite and confidence for good.',
    icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 2.2.8 3.8 1.4 5.6.5 1.7.6 4 .9 5.9.2 1.5.5 2 1.2 2s.9-1.1 1.1-2.6c.2-1.5.3-2.9.9-2.9s.7 1.4.9 2.9c.2 1.5.4 2.6 1.1 2.6s1-.5 1.2-2c.3-1.9.4-4.2.9-5.9.6-1.8 1.4-3.4 1.4-5.6 0-3.6-2.2-6-5.4-6Z',
  },
  {
    title: 'Crooked Teeth',
    desc: 'Braces and clear aligners that gently straighten your smile at any age.',
    icon: 'M4 9h16M4 15h16M8 9v6M12 9v6M16 9v6',
  },
  {
    title: 'Tooth Pain',
    desc: 'Pain-free, single-sitting root canals under precise RVG digital X-ray.',
    icon: 'M12 3c-3.3 0-5.5 2.4-5.5 6 0 4.2 2.2 6.5 2.7 10 .3 2 .5 3 1.3 3s.9-1.6.9-3.5.2-3.5 1.1-3.5M12 3c3.2 0 5.4 2.4 5.4 6',
  },
  {
    title: 'Dull Smile',
    desc: 'Laser whitening and smile design for a noticeably brighter you.',
    icon: 'M3 12c2.5-3.6 15.5-3.6 18 0-2.5 3.6-15.5 3.6-18 0Z M9 12h.01M15 12h.01',
  },
]

export default function WhatWeDo() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            What We Do
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Solutions for Every Smile
          </h2>
        </div>

        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, desc, icon }) => (
            <li key={title} className="group text-center">
              <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-brand/20 text-brand transition duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-11 w-11" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink/65">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
