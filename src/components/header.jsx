import { Match } from "preact-router/match";
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
        
        .header-professional {
          position: sticky;
          top: 0;
          width: 100%;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.03);
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        
        /* Logo Section */
        .logo-section {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }
        
        .logo-circle {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .logo-circle:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(46, 139, 86, 0.15);
        }
        
        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        
        .company-name {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          color: #0f172a;
          letter-spacing: -0.3px;
          line-height: 1.3;
        }
        
        .company-name span {
          color: #2E8B57;
        }
        
        .company-tagline {
          font-size: 12px;
          margin: 2px 0 0;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 0.2px;
        }
        
        /* Desktop Navigation */
        .nav-desktop {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        
        .nav-link {
          text-decoration: none;
          color: #334155;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 8px 4px;
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
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #2E8B57;
          border-radius: 2px;
        }
        
        /* Facebook Button */
        .facebook-btn {
          background: #1877F2;
          color: white;
          padding: 8px 22px;
          border-radius: 40px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .facebook-btn:hover {
          background: #166fe5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 119, 242, 0.25);
        }
        
        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1001;
        }
        
        .mobile-menu-icon {
          width: 24px;
          height: 2px;
          background: #334155;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-icon::before,
        .mobile-menu-icon::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: #334155;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-icon::before {
          top: -8px;
        }
        
        .mobile-menu-icon::after {
          bottom: -8px;
        }
        
        .mobile-menu-icon.open {
          background: transparent;
        }
        
        .mobile-menu-icon.open::before {
          transform: rotate(45deg);
          top: 0;
        }
        
        .mobile-menu-icon.open::after {
          transform: rotate(-45deg);
          bottom: 0;
        }
        
        /* Mobile Navigation */
        .nav-mobile {
          display: none;
          position: fixed;
          top: 84px;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border-top: 1px solid #eef2f6;
          z-index: 999;
        }
        
        .nav-mobile.open {
          display: block;
        }
        
        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        
        .nav-mobile-link {
          text-decoration: none;
          color: #334155;
          font-size: 16px;
          font-weight: 500;
          padding: 10px;
          width: 100%;
          text-align: center;
        }
        
        .nav-mobile-link.current {
          color: #2E8B57;
          background: #f0fdf4;
          border-radius: 10px;
        }
        
        .mobile-facebook-btn {
          background: #1877F2;
          color: white;
          padding: 12px 24px;
          border-radius: 40px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 10px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .header-container {
            padding: 12px 20px;
          }
          
          .company-name {
            font-size: 16px;
          }
          
          .company-tagline {
            font-size: 10px;
          }
          
          .logo-circle {
            width: 44px;
            height: 44px;
          }
        }
        
        @media (min-width: 769px) {
          .nav-mobile {
            display: none !important;
          }
        }
      `}</style>

      <div className="header-professional">
        <div className="header-container">
          {/* Logo Section */}
          <a href="/" className="logo-section">
            <div className="logo-circle">
              <img 
                src="/images/logo.jpg" 
                alt="Greater Edge Landscaping" 
                className="logo-image"
                onError={(e) => {
                  e.target.src = "https://placehold.co/200x200/2E8B57/white?text=GEL";
                }}
              />
            </div>
            <div className="logo-text">
              <h1 className="company-name">
                Greater Edge <span>Landscaping</span>
              </h1>
              <p className="company-tagline">Professional Landscaping Services</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
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
              className="facebook-btn"
            >
              <span>📘</span>
              Follow Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className={`mobile-menu-icon ${mobileMenuOpen ? 'open' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-mobile-links">
            <Match path="/">
              {({ matches }) => (
                <Link 
                  href="/" 
                  className={`nav-mobile-link ${matches ? 'current' : ''}`}
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
                  className={`nav-mobile-link ${matches ? 'current' : ''}`}
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
                  className={`nav-mobile-link ${matches ? 'current' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              )}
            </Match>
            <a 
              href="https://www.facebook.com/profile.php?id=61574004541526" 
              target="_blank" 
              rel="noreferrer" 
              className="mobile-facebook-btn"
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
