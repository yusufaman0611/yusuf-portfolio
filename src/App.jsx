import GrainOverlay from './components/Common/GrainOverlay'
import CursorGlow from './components/Common/CursorGlow'
import ProgressBar from './components/Common/ProgressBar'
import BackToTop from './components/Common/BackToTop'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useAOSInit } from './hooks/useAOSInit'
import { useMagneticAndTilt } from './hooks/useMagneticAndTilt'

function App() {
  useSmoothScroll()
  useAOSInit()
  useMagneticAndTilt()

  return (
    <>
      <GrainOverlay />
      <CursorGlow />
      <ProgressBar />

      <Navbar />

      <main id="hero">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}

export default App
