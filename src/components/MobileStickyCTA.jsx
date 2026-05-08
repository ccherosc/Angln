import { useState, useEffect } from 'react'

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight
      const winH = window.innerHeight
      // Show after 500px, hide when within 400px of bottom (form/footer)
      setVisible(scrollY > 500)
      setHidden(scrollY + winH > docH - 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (hidden) return null

  return (
    <div className={`mobile-sticky-cta ${visible ? 'visible' : ''}`} aria-hidden={!visible}>
      <a href="#events" className="btn btn-primary btn-sm mobile-sticky-btn">
        View Trainings
      </a>
      <a href="#signup" className="btn btn-outline-light btn-sm mobile-sticky-btn">
        Sign Up Free
      </a>
    </div>
  )
}
