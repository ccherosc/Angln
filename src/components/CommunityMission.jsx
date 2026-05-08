const areas = ['Greenwood, SC', 'Greenville, SC', 'Lake Greenwood', 'Ninety Six, SC', 'Upstate South Carolina']

export default function CommunityMission() {
  return (
    <section className="community section" id="community">
      <div className="container">
        <div className="community-inner">

          <div className="community-content">
            <span className="section-label">Community Mission</span>
            <h2 className="section-title">
              We're Starting Local<br />
              Because This Is Home.
            </h2>

            <p className="community-mission-text">
              "Our goal isn't to build the biggest fishing academy in the country.
              Our goal is to build the best youth fishing community in Upstate South Carolina —
              and let that grow from here."
            </p>

            <p className="section-subtitle" style={{ maxWidth: 'none', marginBottom: '1.75rem' }}>
              Angln Academy was founded in this community, for this community. We're not a
              franchise or a corporation. We're neighbors who believe that outdoor education,
              mentorship, and family time on the water can make a real difference in the lives
              of young people in this region.
            </p>

            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              We believe in the power of Lake Greenwood, the Saluda River watershed, and the
              lakes and ponds of Upstate South Carolina to build character in the next
              generation. The water has always been here. Now we're building the community
              around it.
            </p>

            <div className="community-areas">
              {areas.map(area => (
                <span key={area} className="area-tag">{area}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#signup" className="btn btn-navy">Join the Community</a>
              <a href="#events" className="btn btn-outline-navy">See Upcoming Trainings</a>
            </div>
          </div>

          <div className="community-visual reveal">
            <div className="community-image-main">
              <img
                src="/Images/team-catch.jpg"
                alt="JT Such and fishing partner displaying eight largemouth bass on a Ranger boat under a blue sky"
                loading="lazy"
              />
              <div className="community-tagline">
                <p className="community-tagline-text">
                  "The water has always been the teacher. We're just here to make
                  sure young anglers get introduced properly."
                </p>
                <span className="community-tagline-source">— JT Such, Angln Academy</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
