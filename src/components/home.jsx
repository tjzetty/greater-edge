import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [showMore, setShowMore] = useState({});

  const toggle = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // YOUR EXACT FILE NAMES - COPIED FROM YOUR MESSAGE
  const projects = [
    {
      id: 1,
      name: "Brick Pavers & Patios",
      main: "/images/Brick pavers1.jpg",
      rest: ["/images/Paver1.png", "/images/Paver2.png"]
    },
    {
      id: 2,
      name: "Lawn Transformations",
      main: "/images/Lawn1.jpg",
      rest: ["/images/Lawn2.jpg", "/images/Lawn3.jpg"]
    },
    {
      id: 3,
      name: "Mulching & Bed Maintenance",
      main: "/images/Mulching1.jpg",
      rest: ["/images/Mulch1.jpg", "/images/Mulch2.jpg"]
    },
    {
      id: 4,
      name: "Bed Clean Up",
      main: "/images/Bed cleanup1.jpg",
      rest: ["/images/Bed cleanup2.jpg", "/images/Bed cleanup3.jpg"]
    },
    {
      id: 5,
      name: "Bush & Hedge Trimming",
      main: "/images/Bush trimming1.jpg",
      rest: ["/images/Bushtrim1.jpg", "/images/Bushtrim2.jpg"]
    },
    {
      id: 6,
      name: "Power Washing",
      main: "/images/Power washing1.jpg",
      rest: ["/images/Powerwashing1.jpg", "/images/Powerwashing2.jpg"]
    },
    {
      id: 7,
      name: "Fall Clean Ups",
      main: "/images/Fall cleanup1.jpg",
      rest: ["/images/Fall cleanup2.jpg", "/images/Fall cleanup3.jpg"]
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, background: "white", padding: "15px 20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/images/IMG_20250827_111608(1).png" alt="Logo" style={{ height: "50px" }} onError={(e) => e.target.style.display = "none"} />
            <span style={{ fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>
              <span style={{ color: "#2E8B57" }}>The Greater</span> Edge
            </span>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#333" }}>Home</Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact</Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "#2E8B57", padding: "80px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "20px", marginBottom: "30px" }}>Get the edge on your neighbors</p>
        <Link to="/contact" style={{ background: "white", color: "#2E8B57", padding: "12px 30px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold" }}>Free Estimate</Link>
      </div>

      {/* Our Work Section */}
      <div style={{ textAlign: "center", padding: "60px 20px 20px" }}>
        <h2 style={{ fontSize: "36px" }}>Our Work</h2>
        <div style={{ width: "60px", height: "3px", background: "#2E8B57", margin: "10px auto" }}></div>
      </div>

      {/* Projects */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        {projects.map(project => {
          const expanded = showMore[project.id];
          const images = expanded ? [project.main, ...project.rest] : [project.main];
          
          return (
            <div key={project.id} style={{ marginBottom: "60px" }}>
              <h3 style={{ fontSize: "28px", marginBottom: "20px", color: "#1a1a1a" }}>{project.name}</h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                gap: "20px",
                marginBottom: "15px"
              }}>
                {images.map((img, idx) => (
                  <div key={idx} style={{ 
                    background: "#f0f0f0", 
                    borderRadius: "10px", 
                    overflow: "hidden", 
                    aspectRatio: "4/3" 
                  }}>
                    <img 
                      src={img} 
                      alt={project.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
              
              {project.rest.length > 0 && (
                <div style={{ textAlign: "center" }}>
                  <button 
                    onClick={() => toggle(project.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#2E8B57",
                      fontSize: "16px",
                      cursor: "pointer",
                      fontWeight: "500",
                      padding: "8px 16px"
                    }}
                  >
                    {expanded ? "▲ Show Less" : `▼ Show More (${project.rest.length})`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Section at Bottom */}
      <div style={{ background: "#f5f5f5", padding: "60px 20px", textAlign: "center", marginTop: "40px" }}>
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Ready to Transform Your Yard?</h2>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>Get a free estimate from our team today.</p>
          <Link 
            to="/contact" 
            style={{
              background: "#2E8B57",
              color: "white",
              padding: "14px 40px",
              borderRadius: "40px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            Schedule a Quote
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#1a1a1a", color: "#888", padding: "30px 20px", textAlign: "center" }}>
        <p>© 2026 The Greater Edge. All rights reserved.</p>
      </div>
    </div>
  );
}
