import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // YOUR EXACT FILE NAMES - CHANGE THESE TO MATCH WHAT YOU HAVE
  const categories = [
    {
      id: "pavers",
      title: "Brick Pavers & Patios",
      cover: "/images/Brick pavers1.jpg",
      extra: ["/images/Paver1.png", "/images/Paver2.png"]
    },
    {
      id: "lawns",
      title: "Lawn Transformations",
      cover: "/images/Lawn1.jpg",
      extra: ["/images/Lawn2.jpg", "/images/Lawn3.jpg"]
    },
    {
      id: "mulch",
      title: "Mulching & Bed Maintenance",
      cover: "/images/Mulching1.jpg",
      extra: ["/images/Mulch1.jpg", "/images/Mulch2.jpg"]
    },
    {
      id: "bed",
      title: "Bed Clean Up",
      cover: "/images/Bed cleanup1.jpg",
      extra: ["/images/Bed cleanup2.jpg", "/images/Bed cleanup3.jpg"]
    },
    {
      id: "trim",
      title: "Bush & Hedge Trimming",
      cover: "/images/Bush trimming1.jpg",
      extra: ["/images/Bushtrim1.jpg", "/images/Bushtrim2.jpg"]
    },
    {
      id: "power",
      title: "Power Washing",
      cover: "/images/Power washing1.jpg",
      extra: ["/images/Powerwashing1.jpg", "/images/Powerwashing2.jpg"]
    },
    {
      id: "fall",
      title: "Fall Clean Ups",
      cover: "/images/Fall cleanup1.jpg",
      extra: ["/images/Fall cleanup2.jpg", "/images/Fall cleanup3.jpg"]
    }
  ];

  return (
    <div>
      {/* NAVIGATION */}
      <div style={{ position: "sticky", top: 0, background: "white", padding: "15px 20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 1000 }}>
        <div style={{ maxWidth: "1200px", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/images/IMG_20250827_111608(1).png" alt="Logo" style={{ height: "50px" }} />
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              <span style={{ color: "#2E8B57" }}>The Greater</span>
              <span style={{ color: "#1a1a1a" }}> Edge</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#333" }}>Home</Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact</Link>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #0f2b1f, #2E8B57)", padding: "80px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "20px", marginBottom: "30px" }}>Professional landscaping that gives you <u>the edge on your neighbors</u></p>
        <Link to="/contact" style={{ background: "white", color: "#2E8B57", padding: "12px 30px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold" }}>Get a Quote</Link>
      </div>

      {/* OUR WORK - FRONT AND CENTER */}
      <div style={{ textAlign: "center", padding: "60px 20px 20px 20px" }}>
        <h2 style={{ fontSize: "36px" }}>Our Work</h2>
        <div style={{ width: "60px", height: "3px", background: "#2E8B57", margin: "10px auto" }}></div>
        <p style={{ color: "#666" }}>Real projects. Real results.</p>
      </div>

      {/* ALL CATEGORIES - EVERYTHING VISIBLE */}
      {categories.map(cat => {
        const showAll = expanded[cat.id];
        const allImages = [cat.cover, ...cat.extra];
        const visible = showAll ? allImages : [cat.cover];
        
        return (
          <div key={cat.id} style={{ padding: "40px 20px", borderBottom: "1px solid #eee" }}>
            <div style={{ maxWidth: "1200px", margin: "auto" }}>
              <h3 style={{ fontSize: "28px", marginBottom: "10px" }}>{cat.title}</h3>
              <div style={{ width: "50px", height: "3px", background: "#2E8B57", marginBottom: "20px" }}></div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {visible.map((img, i) => (
                  <div key={i} style={{ background: "#f5f5f5", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
                    <img src={img} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              
              {cat.extra.length > 0 && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button onClick={() => toggle(cat.id)} style={{ background: "none", border: "none", color: "#2E8B57", cursor: "pointer", fontSize: "16px" }}>
                    {showAll ? "▲ Show Less" : `▼ Show More (${cat.extra.length} more)`}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* ABOUT + CONTACT AT BOTTOM */}
      <div style={{ background: "#f8faf8", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <div style={{ width: "50px", height: "3px", background: "#2E8B57", margin: "0 auto 20px auto" }}></div>
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>About The Greater Edge</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#444", marginBottom: "30px" }}>
            We're a young company with a team that brings decades of landscaping experience to every project. 
            From custom paver patios to precision lawn care, we deliver results that make your property the best on the block.
          </p>
          <Link to="/contact" style={{ background: "#2E8B57", color: "white", padding: "14px 40px", borderRadius: "50px", textDecoration: "none", fontWeight: "bold", display: "inline-block" }}>
            Schedule a Free Estimate
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1a1a1a", color: "#888", padding: "40px 20px", textAlign: "center" }}>
        <p>© 2026 The Greater Edge. All rights reserved.</p>
        <p style={{ marginTop: "10px" }}>Get the edge on your neighbors.</p>
      </div>
    </div>
  );
}
