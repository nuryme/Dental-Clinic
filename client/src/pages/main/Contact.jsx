import PageHeader from '../../components/common/PageHeader.jsx'
import ContactUs from '../../components/sections/ContactUs.jsx'
import Appointment from '../../components/sections/Appointment.jsx'
import Reveal from '../../components/common/Reveal.jsx'

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Visit us at Jamuna Future Park, call, or book over WhatsApp — we'll confirm your slot within clinic hours."
      />
      <Reveal><ContactUs /></Reveal>
      <Reveal><Appointment /></Reveal>
    </>
  )
}
