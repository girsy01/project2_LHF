const AboutPage = () => {
  return (
    <div id="about-page-container">
      <h1>About Exhibitly</h1>

      <section id="overview-section">
        <h2 className="title">What is Exhibitly?</h2>
        <div className="slogan">
          <em>"Share your cultural canvas"</em>
        </div>
        <p id="overview-text">Exhibitly is your personal digital gallery where you can collect and
           showcase your favorite movies, music, books, and events. 
           Think of it as a curated museum of your interests.</p>
      </section>


      <section id="features-section">
        <h2 className="title">Features!</h2>
        <ul id="features-list">
          <li className="features-list-item">Search across multiple media types</li>
          <li className="features-list-item">Create your personal collection</li>
          <li className="features-list-item">Edit your choices to add your own personal touch</li>
          <li className="features-list-item">Track likes and engage with other users' collections</li>
          <li className="features-list-item">Filter and organise your interests</li>
        </ul>
      </section>


      <section id="how-section">
        <h2 className="title">So... how does it work?</h2>
        <div id="steps">
          <div className="step">
            <h3>1. Search</h3>
            <p>Find exactly what you're looking for across multiple platforms:</p>
            <ul>
              <li>Movies through TMDB's database</li>
              <li>Music tracks and albums via Spotify</li>
              <li>Books from the Open Library API</li>
              <li>Events through Ticketmaster</li>
            </ul>
          </div>

          <div className="step">
            <h3>2. Save</h3>
            <p>Build your personal collection:</p>
            <ul>
              <li>Select items from search results</li>
              <li>Add to your personal dashboard</li>
              <li>Organise by media type</li>
              <li>Keep track of your favorites</li>
            </ul>
          </div>

          <div className="step">
            <h3>3. Share</h3>
            <p>Engage with the community:</p>
            <ul>
              <li>Like other users' selections</li>
              <li>Filter collections by media type</li>
              <li>Discover what others are interested in</li>
              <li>Build your entertainment network</li>
            </ul>
          </div>

          <div className="step">
            <h3>4. Explore</h3>
            <p>Keep discovering new interests:</p>
            <ul>
              <li>Get recommendations based on your collection</li>
              <li>Browse trending items</li>
              <li>Find similar content</li>
              <li>Expand your cultural horizons</li>
            </ul>
          </div>
        </div>
      </section>


      <section id="api-section">
        <h2 className="title">What APIs did we use?</h2>
        <ul id="api-list">
          <li className="api-list-item">TMDB (The Movie Database)</li>
          <li className="api-list-item">Spotify</li>
          <li className="api-list-item">Open Library Books</li>
          <li className="api-list-item">Ticketmaster</li>
        </ul>
      </section>


      <section id="contact-section">
        <h2 className="title">Contact us!</h2>
        <p>Have questions or suggestions? We'd love to hear from you!</p>
      </section>

    </div>
  );
};
export default AboutPage;
