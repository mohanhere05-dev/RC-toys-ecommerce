import React from 'react'
import Navbar from '../../components/Navbar'
import AboutHero from '../../components/About/AboutHero'
import Footer from '../../components/Footer'
import StatsSection from '../../components/About/StatsSection'
import StorySection from '../../components/About/StorySection'
import MissionVision from '../../components/About/MissionVision'
import TeamSection from '../../components/About/TeamSection'
import CTASection from '../../components/About/CTASection'

const About = () => {
  return (
    <>
      <Navbar />
      <AboutHero />
      <StatsSection />
      <StorySection />
      <MissionVision />
      <TeamSection />
      <CTASection />
      <Footer />
    </>
  )
}

export default About
