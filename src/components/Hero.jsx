import './Hero.css';

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function Hero({ onBecomeBuyerClick }) {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              Buy agricultural & construction machinery online at dealer prices
            </h1>
            <p className="hero-subtext">
              Exclusive access to tractors, telehandlers and diggers at dealer-only prices
            </p>
            <button 
              className="hero-cta-button"
              onClick={onBecomeBuyerClick}
            >
              Become a buyer
              <ArrowRight />
            </button>
          </div>
          <div className="hero-image">
            <img 
              src="/header-image-1.svg" 
              alt="Agricultural and construction machinery illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

