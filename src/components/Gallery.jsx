const photos = [
  {
    src: '/Images/jt-tournament-bass.jpg',
    alt: 'JT Such with a large bass at a tournament weigh-in station',
    caption: 'Tournament weigh-in — fish care and competition experience',
    position: 'center 20%',
  },
  {
    src: '/Images/angln-img1.jpg',
    alt: 'JT Such kneeling on a boat deck at golden hour holding a large largemouth bass',
    caption: 'Golden-hour haul — early morning on the water',
    position: 'center top',
  },
  {
    src: '/Images/angln-img2.jpg',
    alt: 'JT Such holding two largemouth bass on a boat on the lake',
    caption: 'Two-fish limit — working Lake Greenwood',
    position: 'center 20%',
  },
  {
    src: '/Images/angln-img3.jpg',
    alt: 'JT Such at night on the dock holding a large largemouth bass',
    caption: 'Night bite at the dock — bass don\'t sleep',
    position: 'center 15%',
  },
]

export default function Gallery() {
  return (
    <section className="gallery section" id="gallery">
      <div className="container">

        <div className="gallery-header">
          <span className="section-label">On the Water</span>
          <h2 className="section-title">Life at Angln Academy</h2>
          <p className="section-subtitle">
            From the bank to the tournament stage — this is what we're building toward.
          </p>
        </div>

        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <div key={i} className="gallery-item">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                title={photo.caption}
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
