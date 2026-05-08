import { useEffect } from 'react'

export function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [selector])
}
