import { Match } from "preact-router/match";
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .custom-header {
          position: sticky;
          top: 0;
          width: 100%;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(4px);
          border-bottom: 1px solid #e2e8f0;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-img {
          height: 52px;
          width: auto;
          border-radius: 12px;
        }
        .logo-text { line-height: 1.3; }
        .logo-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }
        .logo-name span { color: #2E8B57; }
        .logo-tagline {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }
        .contact-row {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .contact-link:hover { color: #2E8B57; }
        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .nav-link {
          text-decoration: none;
          color: #1e293b;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s;
        }
        .nav-link:hover, .nav-link.current { color: #2E8B57; }
        .fb-btn {
          background: #1877F2;
          color: white;
          padding: 6px 18px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .fb-btn:hover {
          background: #166fe5;
          transform: translateY(-1px);
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        .hamburger {
          width: 24px;
          height: 2px;
          background: #1e293b;
          position: relative;
        }
        .hamburger::before, .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: #1e293b;
          transition: 0.3s;
        }
        .hamburger::before { top: -8px; }
        .hamburger::after { bottom: -8px; }
        .hamburger.open { background: transparent; }
        .hamburger.open::before { transform: rotate(45deg); top: 0; }
        .hamburger.open::after { transform: rotate(-45deg); bottom: 0; }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 76px;
          left: 0;
          right: 0;
          background: white;
          padding: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border-top: 1px solid #e2e8f0;
          z-index: 999;
        }
        .mobile-menu.open { display: block; }
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }
        .mobile-nav a {
          text-decoration: none;
          color: #1e293b;
          font-weight: 600;
          padding: 8px;
          width: 100%;
          text-align: center;
        }
        .mobile-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 800px) {
          .contact-row, .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .header-inner { padding: 10px 16px; }
          .logo-img { height: 44px; }
        }
      `}</style>

      <div className="custom-header">
        <div className="header-inner">
          <div className="logo-area">
            <img src="/images/logo.jpg" alt="Logo" className="logo-img" />
            <div className="logo-text">
              <div className="logo-name">Greater Edge <span>Landscaping</span></div>
              <div className="logo-tagline">Family Owned & Operated</div>
            </div>
          </div>

          <div className="contact-row">
            <a href="tel:+18102188272" className="contact-link">📞 (810) 218-8272</a>
            <a href="mailto:greateredgelandscapingllc@gmail.com" className="contact-link">✉️ Email Us</a>
          </div>

          <div className="nav-links">
            <Match path="/">{({ matches }) => (<Link href="/" className={`nav-link ${matches ? 'current' : ''}`}>Home</Link>)}</Match>
            <Match path="/gallery">{({ matches }) => (<Link href="/gallery" className={`nav-link ${matches ? 'current' : ''}`}>Gallery</Link>)}</Match>
            <Match path="/contact">{({ matches }) => (<Link href="/contact" className={`nav-link ${matches ? 'current' : ''}`}>Contact Us</Link>)}</Match>
            <a href="https://www.facebook.com/profile.php?id=61560416566294" target="_blank" rel="noreferrer" className="fb-btn">📘 Facebook</a>
          </div>

          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></div>
          </button>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            <div className="mobile-contact">
              <a href="tel:+18102188272">📞 (810) 218-8272</a>
              <a href="mailto:greateredgelandscapingllc@gmail.com">✉️ Email Us</a>
              <a href="https://www.facebook.com/profile.php?id=61560416566294" target="_blank" rel="noreferrer">📘 Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
