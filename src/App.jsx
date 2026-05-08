import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustSection from './components/TrustSection'
import ProgramCards from './components/ProgramCards'
import EventsSection from './components/EventsSection'
import MeetJT from './components/MeetJT'
import CredoSection from './components/CredoSection'
import WhyAngln from './components/WhyAngln'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import CommunityMission from './components/CommunityMission'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import MobileStickyCTA from './components/MobileStickyCTA'

const isAdmin = window.location.hash === '#admin' || new URLSearchParams(window.location.search).has('admin')

export default function App() {
  useScrollReveal()

  if (isAdmin) return <AdminPanel />

  return (
    <div className="site-wrapper">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ProgramCards />
        <EventsSection />
        <MeetJT />
        <CredoSection />
        <WhyAngln />
        <Gallery />
        <Pricing />
        <CommunityMission />
        <LeadForm />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
