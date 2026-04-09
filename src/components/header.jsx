import { Match } from "preact-router/match";
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
        
        .header-single {
          position: sticky;
          top: 0;
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #eef2f6;
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        /* Left Section - Logo + Contact Info */
        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        
        /* Logo */
        .logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        
        .logo-img {
          height: 55px;
          width: auto;
          border-radius: 12px;
          object-fit: cover;
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        
        .logo-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.3px;
          line-height: 1.3;
        }
        
        .logo-name span {
          color: #2E8B57;
        }
        
        .logo-tagline {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }
        
        /* Contact Info - Next to Logo */
        .contact-info {
          display: flex;
          gap: 20px;
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
          transition: color 0.2s;
        }
        
        .contact-item:hover {
          color: #2E8B57;
        }
        
        .contact-icon {
          font-size: 16px;
        }
        
        /* Right Section - Navigation */
        .header-right {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        
        .nav-links {
          display: flex;
          gap: 28px;
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
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #2E8B57;
          border-radius: 2px;
        }
        
        /* Facebook Button */
        .fb-btn {
          background: #1877F2;
          color: white;
          padding: 8px 22px;
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
          transform: translateY(-1px);
        }
        
        /* Mobile Menu */
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
        
        /* Mobile Menu Panel */
        .mobile-panel {
          display: none;
          position: fixed;
          top: 88px;
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
          gap: 20px;
          align-items: center;
        }
        
        .mobile-nav-link {
          text-decoration: none;
          color: #334155;
          font-size: 16px;
          font-weight: 600;
          padding: 10px;
          width: 100%;
          text-align: center;
        }
        
        .mobile-nav-link.current {
          color: #2E8B57;
          background: #f0fdf4;
          border-radius: 10px;
        }
        
        .mobile-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #e2e8f0;
        }
        
        .mobile-contact-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          color: #334155;
          font-size: 14px;
          font-weight: 500;
          padding: 8px;
        }
        
        .mobile-fb {
          background: #1877F2;
          color: white;
          padding: 12px 24px;
          border-radius: 40px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 10px;
        }
        
        /* Responsive */
        @media (max-width: 900px) {
          .contact-info {
            display: none;
          }
          
          .nav-links {
            display: none;
          }
          
          .mobile-btn {
            display: block;
          }
          
          .header-container {
            padding: 12px 20px;
          }
          
          .logo-img {
            height: 45px;
          }
          
          .logo-name {
            font-size: 15px;
          }
          
          .logo-tagline {
            font-size: 9px;
          }
        }
        
        @media (min-width: 901px) {
          .mobile-panel {
            display: none !important;
          }
        }
      `}</style>

      <div className="header-single">
        <div className="header-container">
          
          {/* LEFT SIDE - Logo + Contact Info */}
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
            
            {/* Contact Info - Next to Logo */}
            <div className="contact-info">
              <a href="mailto:greateredgelandscapingllc@gmail.com" className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>greateredgelandscapingllc@gmail.com</span>
              </a>
              <a href="tel:+18102188272" className="contact-item">
                <span className="contact-icon">📞</span>
                <span>(810) 218-8272</span>
              </a>
            </div>
          </div>
          
          {/* RIGHT SIDE - Navigation */}
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
              <a 
                href="https://www.facebook.com/profile.php?id=61574004541526" 
                target="_blank" 
                rel="noreferrer" 
                className="fb-btn"
              >
                <span>📘</span>
                Facebook
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Panel */}
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
            
            {/* Mobile Contact Info */}
            <div className="mobile-contact">
              <a href="mailto:greateredgelandscapingllc@gmail.com" className="mobile-contact-item">
                <span>✉️</span>
                <span>greateredgelandscapingllc@gmail.com</span>
              </a>
              <a href="tel:+18102188272" className="mobile-contact-item">
                <span>📞</span>
                <span>(810) 218-8272</span>
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
              Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
