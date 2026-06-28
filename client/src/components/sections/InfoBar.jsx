const items = [
  {
    icon: PinIcon,
    title: 'Jamuna Future Park Pocket Gate',
    sub: 'Joynab Ali Rd, Vatara, Dhaka 1212',
  },
  {
    icon: PhoneIcon,
    title: '+880 1733-536000',
    sub: 'Call us today!',
  },
  {
    icon: ClockIcon,
    title: 'Opening Hours',
    sub: 'Sat–Thu: 11 AM – 11 PM · Fri Closed',
  },
  {
    icon: MailIcon,
    title: 'ismailhossain1589@gmail.com',
    sub: 'Email us anytime',
  },
]

export default function InfoBar() {
  return (
    <div className="border-b border-sky-muted/40 bg-brand/5">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3 px-6 py-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{title}</p>
              <p className="truncate text-xs text-ink/60">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5C3 4.7 3.7 4 4.5 4h2.6c.7 0 1.3.5 1.4 1.2l.6 2.9c.1.5-.1 1-.5 1.3l-1.4 1.1a12 12 0 0 0 5.3 5.3l1.1-1.4c.3-.4.8-.6 1.3-.5l2.9.6c.7.1 1.2.7 1.2 1.4v2.6c0 .8-.7 1.5-1.5 1.5C9.6 21 3 14.4 3 5.5Z" />
    </svg>
  )
}

function ClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 2" />
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  )
}
