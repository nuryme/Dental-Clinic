// Post-booking confirmation modal (React modal — never a native dialog).
export default function BookingConfirm({ appointment, onClose }) {
  if (!appointment) return null
  const { date, doctorName, service, workingHours, serial } = appointment

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">Appointment booked!</h3>
        <p className="mt-2 text-sm text-ink/65">We look forward to seeing you. Here are your details:</p>

        {serial != null && (
          <div className="mt-6 rounded-xl bg-brand p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Your serial number</p>
            <p className="mt-1 font-display text-4xl font-extrabold">#{serial}</p>
            <p className="mt-1 text-xs text-white/80">Your place in line with {doctorName} on {date}.</p>
          </div>
        )}

        <dl className="mt-4 space-y-3 rounded-xl bg-brand/5 p-5 text-left text-sm">
          <Row label="Doctor" value={doctorName} />
          <Row label="Service" value={service} />
          <Row label="Date" value={date} />
          <Row label="Doctor's hours" value={workingHours || 'Will be confirmed by the clinic'} />
        </dl>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          Done
        </button>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="font-semibold text-brand">{label}</dt>
      <dd className="text-right text-ink/80">{value}</dd>
    </div>
  )
}
