import './Benefits.css';

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="4" rx="1"></rect>
    <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"></path>
    <path d="M9 14l2 2 4-4"></path>
  </svg>
);

const HeadsetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="benefits-wrapper">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2 className="benefits-main-title">Why trade on Spectinga?</h2>
            <p className="benefits-main-description">
              We partner with hundreds of trusted sellers to bring you top-quality agricultural machinery, straight from verified sources.
            </p>
            <p className="benefits-main-description">
              Once your offer is accepted, we conduct a thorough inspection so you can buy with confidence. When you're ready, we take care of all the logistics and paperwork to deliver the machine to your chosen location.
            </p>
          </div>
          <div className="benefits-cards">
            <div className="benefit-card">
              <h3 className="benefit-card-title">Exclusive access to stock</h3>
              <p className="benefit-card-description">
                We only allow traders & dealers to buy on our platform. Every application is vetted.
              </p>
              <div className="benefit-card-icon benefit-card-icon--purple">
                <ClipboardIcon />
              </div>
            </div>
            <div className="benefit-card">
              <h3 className="benefit-card-title">Exceptional support</h3>
              <p className="benefit-card-description">
                A dedicated account manager will answer your questions and assist with order-related needs.
              </p>
              <div className="benefit-card-icon benefit-card-icon--green">
                <HeadsetIcon />
              </div>
            </div>
            <div className="benefit-card">
              <h3 className="benefit-card-title">Hassle-free logistics</h3>
              <p className="benefit-card-description">
                We organize end-to-end transport, cleaning, and customs. Get in touch to learn more.
              </p>
              <div className="benefit-card-icon benefit-card-icon--orange">
                <TruckIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

