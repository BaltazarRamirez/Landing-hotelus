import Header from './components/Header'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Features from './components/Features'
import Preview from './components/Preview'
import Benefits from './components/Benefits'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Preview />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
