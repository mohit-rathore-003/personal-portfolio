import { useCallback, useState } from 'react'
import Preloader from './components/Preloader'
import Cursor from './components/ui/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const [started, setStarted] = useState(false)
  const onLoaderDone = useCallback(() => setStarted(true), [])

  useSmoothScroll(started)

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to the work
      </a>

      <Preloader onDone={onLoaderDone} />
      <Cursor />
      <Nav />

      <main id="main">
        <Hero started={started} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Capabilities />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
