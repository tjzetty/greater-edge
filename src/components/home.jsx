import { Match } from "preact-router/match";
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .header-new {
          position: sticky;
          top: 0;
          width: 100%;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }
        
        /* Logo Section - BIGGER */
        .logo-area {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }
        
        .logo-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .company-text {
          display: flex;
          flex-direction: column;
        }
        
        .company-main {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .company-main span {
          color: #2E8B57;
        }
        
        .company-sub {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 0.3px;
          margin-top: 4px;
        }
        
        /* Desktop Navigation - CLEAN LINKS */
        .nav-links {
          display: flex;
          gap: 48px;
          align-items: center;
        }
        
        .nav-item {
          text-decoration: none;
          color: #1e293b;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.2s ease;
          padding: 8px 0;
          position: relative;
        }
        
        .nav-item:hover {
          color: #2E8B57;
        }
        
        .nav-item.current {
          color: #2E8B57;
        }
        
        .nav-item.current::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #2E8B57;
          border-radius: 3px;
        }
        
        /* Facebook Button - BOLD */
        .fb-btn {
          background: #1877F2;
          color: white;
          padding: 10px 28px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(24, 119, 242, 0.2);
        }
        
        .fb-btn:hover {
          background: #166fe5;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(24, 119, 242, 0.3);
        }
        
        .fb-icon {
          font-size: 18px;
        }
        
        /* Mobile Menu Button */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px;
          z-index: 1001;
        }
        
        .hamburger {
          width: 28px;
          height: 3px;
          background: #1e293b;
          position: relative;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 3px;
          background: #1e293b;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        .hamburger::before {
          top: -9px;
        }
        
        .hamburger::after {
          bottom: -9px;
        }
        
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
        
        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 100px;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 32px 24px;
          box-shadow: 0 20px 35px rgba(0,0,0,0.1);
          border-top: 1px solid #eef2f6;
          z-index: 999;
        }
        
        .mobile-menu.open {
          display: block;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: center;
        }
        
        .mobile-nav-item {
          text-decoration: none;
          color: #1e293b;
          font-size: 20px;
          font-weight: 600;
          padding: 12px;
          width: 100%;
          text-align: center;
        }
        
        .mobile-nav-item.current {
          color: #2E8B57;
          background: #f0fdf4;
          border-radius: 16px;
        }
        
        .mobile-fb {
          background: #1877F2;
          color: white;
          padding: 14px 28px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          margin-top: 16px;
        }
        
        /* Responsive */
        @media (max-width: 900px) {
          .header-container {
            padding: 16px 24px;
          }
          
          .company-main {
            font-size: 22px;
          }
          
          .logo-img {
            width: 50px;
            height: 50px;
          }
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .mobile-toggle {
            display: block;
          }
          
          .header-container {
            padding: 14px 20px;
          }
          
          .company-main {
            font-size: 18px;
          }
          
          .company-sub {
            font-size: 10px;
          }
          
          .logo-img {
            width: 44px;
            height: 44px;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <div className="header-new">
        <div className="header-container">
          
          {/* LOGO - BIGGER COMPANY NAME */}
          <a href="/" className="logo-area">
            <img 
              src="/images/logo.jpg" 
              alt="Logo" 
              className="logo-img"
              onError={(e) => {
                e.target.src = "https://placehold.co/200x200/2E8B57/white?text=GEL";
              }}
            />
            <div className="company-text">
              <div className="company-main">
                Greater Edge <span>Landscaping</span>
              </div>
              <div className="company-sub">PROFESSIONAL LANDSCAPING SERVICES</div>
            </div>
          </a>

          {/* DESKTOP NAVIGATION - CLEAR LINKS */}
          <div className="nav-links">
            <Match path="/">
              {({ matches }) => (
                <Link href="/" className={`nav-item ${matches ? 'current' : ''}`}>
                  Home
                </Link>
              )}
            </Match>
            <Match path="/gallery">
              {({ matches }) => (
                <Link href="/gallery" className={`nav-item ${matches ? 'current' : ''}`}>
                  Gallery
                </Link>
              )}
            </Match>
            <Match path="/contact">
              {({ matches }) => (
                <Link href="/contact" className={`nav-item ${matches ? 'current' : ''}`}>
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
              <span className="fb-icon">📘</span>
              Facebook
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav">
            <Match path="/">
              {({ matches }) => (
                <Link 
                  href="/" 
                  className={`mobile-nav-item ${matches ? 'current' : ''}`}
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
                  className={`mobile-nav-item ${matches ? 'current' : ''}`}
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
                  className={`mobile-nav-item ${matches ? 'current' : ''}`}
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
