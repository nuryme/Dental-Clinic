import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import { WHATSAPP, PHONE, EMAIL } from '../../clinic.js'

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]
const services = [
  'Dental Implants',
  'Orthodontics & Braces',
  'Advanced Root Canal',
  'Cosmetic & Smile Design',
  'Laser Whitening',
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      {/* columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <img src={logo} alt="Smile Dental" className="h-14 w-auto rounded-lg bg-white p-1.5" />
          <p className="mt-4 text-sm leading-relaxed">
            Aesthetic, Orthodontic &amp; Implant Centre led by Dr. Md. Ismail
            Hossain — modern, pain-free dental care in Vatara, Dhaka.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-soft"
          >
            Book on WhatsApp
          </a>
        </div>

        <FooterCol title="Explore">
          {nav.map(({ label, to }) => (
            <li key={label}>
              <Link to={to} className="transition hover:text-white">{label}</Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {services.map((s) => (
            <li key={s}>
              <Link to="/services" className="transition hover:text-white">{s}</Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Working Hours">
          <li className="flex justify-between"><span>Saturday – Thursday</span><span className="text-white">11 AM – 11 PM</span></li>
          <li className="flex justify-between"><span>Friday</span><span className="text-brand-soft">Closed</span></li>
          <li className="pt-2"><a href={`tel:+8801733536000`} className="text-white transition hover:text-brand-soft">{PHONE}</a></li>
          <li><a href={`mailto:${EMAIL}`} className="transition hover:text-white">{EMAIL}</a></li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Smile Dental — Aesthetic, Orthodontic &amp; Implant Centre. All rights reserved.
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}
