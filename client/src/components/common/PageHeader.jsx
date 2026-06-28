import secondaryBg from '../../assets/secondary_bg.jpeg'

// Sub-page banner — gradient over the secondary image, matching the reference headers.
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand py-20 lg:py-28">
      <img
        src={secondaryBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/90 via-brand/75 to-ink/80"
      />
      <div className="mx-auto max-w-3xl px-6 text-center text-white lg:px-10">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 text-base leading-relaxed text-white/85">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
