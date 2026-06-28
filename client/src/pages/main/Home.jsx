import InfoBar from '../../components/sections/InfoBar.jsx'
import Hero from '../../components/sections/Hero.jsx'
import WhatWeDo from '../../components/sections/WhatWeDo.jsx'
import Appointment from '../../components/sections/Appointment.jsx'
import Welcome from '../../components/sections/Welcome.jsx'
import ServiceTiles from '../../components/sections/ServiceTiles.jsx'
import TreatYourself from '../../components/sections/TreatYourself.jsx'
import WhyChoose from '../../components/sections/WhyChoose.jsx'
import Team from '../../components/sections/Team.jsx'
import Testimonial from '../../components/sections/Testimonial.jsx'
import ContactUs from '../../components/sections/ContactUs.jsx'
import SpecialOffer from '../../components/sections/SpecialOffer.jsx'
import Reveal from '../../components/common/Reveal.jsx'

export default function Home() {
  return (
    <>
      {/* nav (~100px) + this block = one viewport, so the hero stays in view */}
      <div id="home" className="flex flex-col lg:h-[calc(100vh-100px)]">
        <InfoBar />
        <Hero />
      </div>
      <Reveal><WhatWeDo /></Reveal>
      <Reveal><Appointment /></Reveal>
      <Reveal><Welcome /></Reveal>
      <Reveal><ServiceTiles /></Reveal>
      <Reveal><TreatYourself /></Reveal>
      <Reveal><WhyChoose /></Reveal>
      <Reveal><Team /></Reveal>
      <Reveal><Testimonial /></Reveal>
      <Reveal><ContactUs /></Reveal>
      <Reveal><SpecialOffer /></Reveal>
    </>
  )
}
