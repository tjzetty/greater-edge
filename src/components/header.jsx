import { Match } from "preact-router/match";
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .header-main {
          position: sticky;
          top: 0;
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #eef2f6;
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        /* LEFT SECTION - BIG LOGO */
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .logo-link {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }
        
        .logo-img {
          height: 70px;
          width: auto;
          border-radius: 16px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        
        .logo-name {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .logo-name span {
          color: #2E8B57;
        }
        
        .logo-tagline {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-top: 4px;
        }
        
        /* CONTACT INFO */
        .contact-info {
          display: flex;
          gap: 16px;
          align-items: center;
          padding-left: 20px;
          border-left: 1px solid #e2e8f0;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          padding: 6px 10px;
          border-radius: 30px;
        }
        
        .contact-item:hover {
          color: #2E8B57;
          background: #f8fafc;
        }
        
        .contact-icon {
          font-size: 14px;
        }
        
        /* RIGHT SECTION - NAVIGATION */
        .header-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        
        .nav-link {
          text-decoration: none;
          color: #334155;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s;
          padding: 6px 0;
          position: relative;
        }
        
        .nav-link:hover {
          color: #2E8B57;
        }
        
        .nav-link.current {
          color: #2E8B57;
        }
        
        .nav-link.current::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #2E8B57;
          border-radius: 2px;
        }
        
        /* FACEBOOK BUTTON - PRIORITY */
        .fb-btn {
          background: #1877F2;
          color: white;
          padding: 8px 20px;
          border-radius: 40px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        
        .fb-btn:hover {
          background: #166fe5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24,119,242,0.25);
        }
        
        /* MOBILE BUTTON */
        .mobile-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        
        .hamburger {
          width: 24px;
          height: 2px;
          background: #334155;
          position: relative;
          transition: all 0.3s;
        }
        
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: #334155;
          transition: all 0.3s;
        }
        
        .hamburger::before { top: -8px; }
        .hamburger::after { bottom: -8px; }
        
        .hamburger.open {
          background: transparent;
        }
        
        .hamburger.open::before {
          transform: rotate(45deg);
          top: 0;
        }
        
        .hamburger.open::after {
          transform: rotate(-45deg);
          bottom: 0;
        }
        
        /* MOBILE PANEL */
        .mobile-panel {
          display: none;
          position: fixed;
          top: 110px;
          left: 0;
          right: 0;
          background: white;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border-top: 1px solid #eef2f6;
          z-index: 999;
        }
        
        .mobile-panel.open {
          display: block;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }
        
        .mobile-nav-link {
          text-decoration: none;
          color: #334155;
          font-size: 16px;
          font-weight: 600;
          padding: 12px;
          width: 100%;
          text-align: center;
        }
        
        .mobile-nav-link.current {
          color: #2E8B57;
          background: #f0fdf4;
          border-radius: 12px;
        }
        
        .mobile-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }
        
        .mobile-contact-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          color: #334155;
          font-size: 14px;
          font-weight: 500;
          padding: 10px;
        }
        
        .mobile-fb {
          background: #1877F2;
          color: white;
          padding: 14px 24px;
          border-radius: 40px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          margin-top: 16px;
        }
        
        /* RESPONSIVE */
        @media (max-width: 1000px) {
          .contact-info {
            display: none;
          }
        }
        
        @media (max-width: 800px) {
          .nav-links {
            display: none;
          }
          
          .mobile-btn {
            display: block;
          }
          
          .header-container {
            padding: 14px 20px;
          }
          
          .logo-img {
            height: 55px;
          }
          
          .logo-name {
            font-size: 18px;
          }
          
          .logo-tagline {
            font-size: 10px;
          }
        }
        
        @media (min-width: 801px) {
          .mobile-panel {
            display: none !important;
          }
        }
      `}</style>

      <div className="header-main">
        <div className="header-container">
          
          {/* LEFT - BIG LOGO */}
          <div className="header-left">
            <a href="/" className="logo-link">
              <img 
                src="/images/logo.jpg" 
                alt="Greater Edge Landscaping" 
                className="logo-img"
                onError={(e) => {
                  e.target.src = "https://placehold.co/200x200/2E8B57/white?text=GEL";
                }}
              />
              <div className="logo-text">
                <div className="logo-name">
                  Greater Edge <span>Landscaping</span>
                </div>
                <div className="logo-tagline">Family Owned & Operated</div>
              </div>
            </a>
            
            {/* CONTACT INFO */}
            <div className="contact-info">
              <a href="tel:+18102188272" className="contact-item">
                <span className="contact-icon">📞</span>
                <span>(810) 218-8272</span>
              </a>
              <a href="mailto:greateredgelandscapingllc@gmail.com" className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>Email Us</span>
              </a>
            </div>
          </div>
          
          {/* RIGHT - NAVIGATION + FACEBOOK */}
          <div className="header-right">
            <div className="nav-links">
              <Match path="/">
                {({ matches }) => (
                  <Link href="/" className={`nav-link ${matches ? 'current' : ''}`}>
                    Home
                  </Link>
                )}
              </Match>
              <Match path="/gallery">
                {({ matches }) => (
                  <Link href="/gallery" className={`nav-link ${matches ? 'current' : ''}`}>
                    Gallery
                  </Link>
                )}
              </Match>
              <Match path="/contact">
                {({ matches }) => (
                  <Link href="/contact" className={`nav-link ${matches ? 'current' : ''}`}>
                    Contact Us
                  </Link>
                )}
              </Match>
            </div>
            
            {/* FACEBOOK BUTTON - PROMINENT */}
            <a 
              href="https://www.facebook.com/profile.php?id=61574004541526" 
              target="_blank" 
              rel="noreferrer" 
              className="fb-btn"
            >
              <span>📘</span>
              Follow Us
            </a>
            
            {/* MOBILE MENU BUTTON */}
            <button 
              className="mobile-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {/* MOBILE MENU */}
        <div className={`mobile-panel ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav">
            <Match path="/">
              {({ matches }) => (
                <Link 
                  href="/" 
                  className={`mobile-nav-link ${matches ? 'current' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              )}
            </Match>
            <Match path="/gallery">
              {({ matches }) => (
                <Link 
                  href="/gallery" 
                  className={`mobile-nav-link ${matches ? 'current' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
              )}
            </Match>
            <Match path="/contact">
              {({ matches }) => (
                <Link 
                  href="/contact" 
                  className={`mobile-nav-link ${matches ? 'current' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              )}
            </Match>
            
            {/* MOBILE CONTACT */}
            <div className="mobile-contact">
              <a href="tel:+18102188272" className="mobile-contact-item">
                <span>📞</span>
                <span>(810) 218-8272</span>
              </a>
              <a href="mailto:greateredgelandscapingllc@gmail.com" className="mobile-contact-item">
                <span>✉️</span>
                <span>greateredgelandscapingllc@gmail.com</span>
              </a>
            </div>
            
            <a 
              href="https://www.facebook.com/profile.php?id=61574004541526" 
              target="_blank" 
              rel="noreferrer" 
              className="mobile-fb"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>📘</span>
              Follow Us on Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
