import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPositions, setSliderPositions] = useState({});
  const [activeDrag, setActiveDrag] = useState(null);

  const toggleDropdown = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mobile + Desktop drag handling
  useEffect(() => {
    const handleMove = (e) => {
      if (activeDrag === null) return;
      
      let clientX;
      if (e.touches) {
        clientX = e.touches[0].clientX;
        e.preventDefault();
      } else {
        clientX = e.clientX;
      }
      
      const slider = document.getElementById(`slider-${activeDrag}`);
      if (slider) {
        const rect = slider.getBoundingClientRect();
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.min(100, Math.max(0, x));
        setSliderPositions(prev => ({ ...prev, [activeDrag]: x }));
      }
    };
    
    const handleEnd = () => setActiveDrag(null);
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [activeDrag]);

  const projects = [
    { id: 1, name: "Brick Pavers & Patios", before: "images/paver1.jpg", after: "images/paver2.jpg", extras: ["images/paver3.jpg"] },
    { id: 2, name: "Lawn Transformations", before: "images/lawn1.jpg", after: "images/lawn2.jpg", extras: [] },
    { id: 3, name: "Bed Clean Up", before: "images/bedcleanup1.jpg", after: "images/bedcleanup2.jpg", extras: [] },
    { id: 4, name: "Bush & Hedge Trimming", before: "images/bushtrim1.jpg", after: "images/bushtrim2.jpg", extras: [] },
    { id: 5, name: "Fall Clean Ups", before: "images/fallcleanup1.jpg", after: "images/fallcleanup2.jpg", extras: [] },
    { id: 6, name: "Mulching & Bed Maintenance", before: "images/mulch1.jpg", after: "images/mulch2.jpg", extras: [] },
    { id: 7, name: "Power Washing", before: "images/powerwashing1.jpg", after: "images/powerwashing2.jpg", extras: [] }
  ];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, background: "white", padding: "12px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "45px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "11px", fontWeight: "500", color: "#2E8B57" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#334155", fontSize: "14px", fontWeight: "500" }}>Home</Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "#334155", fontSize: "14px", fontWeight: "500" }}>Contact</Link>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "6px 16px", borderRadius: "30px", textDecoration: "none", fontSize: "12px", fontWeight: "600" }}>📘 FB</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "60px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "18px", marginBottom: "24px" }}>Professional Landscaping Services</p>
        <Link to="/contact" style={{ background: "white", color: "#2E8B57", padding: "12px 30px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", display: "inline-block" }}>Free Estimate →</Link>
      </section>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "50px 20px 20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>Our Work</h2>
        <div style={{ width: "60px", height: "3px", background: "#2E8B57", margin: "12px auto 0", borderRadius: "2px" }}></div>
      </div>

      {/* PROJECTS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 16px 50px" }}>
        {projects.map((project) => {
          const position = sliderPositions[project.id] !== undefined ? sliderPositions[project.id] : 50;
          const isOpen = showMore[project.id];
          const hasExtras = project.extras && project.extras.length > 0;

          return (
            <div key={project.id} style={{ marginBottom: "50px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>{project.name}</h3>
              
              {/* SLIDER - Mobile Friendly */}
              <div 
                id={`slider-${project.id}`}
                style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", backgroundColor: "#e2e8f0", touchAction: "none" }}
                onTouchStart={(e) => { setActiveDrag(project.id); e.preventDefault(); }}
                onMouseDown={() => setActiveDrag(project.id)}
              >
                <img src={project.after} alt="After" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: `${position}%`, height: "100%", overflow: "hidden" }}>
                  <img src={project.before} alt="Before" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                
                {/* DRAG HANDLE */}
                <div style={{ position: "absolute", top: 0, left: `${position}%`, width: "44px", height: "100%", transform: "translateX(-50%)", cursor: "ew-resize", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", touchAction: "none" }}>
                  <div style={{ background: "white", padding: "6px 12px", borderRadius: "30px", fontSize: "11px", fontWeight: "bold", color: "#1e293b", boxShadow: "0 2px 10px rgba(0,0,0,0.2)", whiteSpace: "nowrap", pointerEvents: "none" }}>◀ DRAG ▶</div>
                </div>
                
                {/* LABELS */}
                <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: "500" }}>BEFORE</div>
                <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: "500" }}>AFTER</div>
              </div>

              {/* DROPDOWN */}
              {hasExtras && (
                <div style={{ marginTop: "16px" }}>
                  <button onClick={() => toggleDropdown(project.id)} style={{ width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#2E8B57" }}>
                    <span>📸 Additional Photos ({project.extras.length})</span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                  </button>
                  {isOpen && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px", marginTop: "12px" }}>
                      {project.extras.map((img, idx) => (
                        <div key={idx} style={{ background: "#f1f5f9", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
                          <img src={img} alt={`${project.name} ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {!hasExtras && <div style={{ marginTop: "12px", textAlign: "center", fontSize: "12px", color: "#94a3b8" }}>More photos coming soon</div>}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "24px 20px", textAlign: "center", fontSize: "12px" }}>
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
