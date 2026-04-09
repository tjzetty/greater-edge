import { useState, useRef, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPositions, setSliderPositions] = useState({});
  const slidersRef = useRef({});

  const toggleDropdown = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Initialize sliders on mount
  useEffect(() => {
    // Setup each slider
    Object.keys(slidersRef.current).forEach((id) => {
      const slider = slidersRef.current[id];
      if (!slider) return;

      const handleMove = (e) => {
        e.preventDefault();
        let clientX;
        if (e.touches) {
          clientX = e.touches[0].clientX;
        } else {
          clientX = e.clientX;
        }
        
        const rect = slider.getBoundingClientRect();
        let x = (clientX - rect.left) / rect.width;
        x = Math.min(1, Math.max(0, x));
        setSliderPositions(prev => ({ ...prev, [id]: x * 100 }));
      };

      const handleStart = (e) => {
        e.preventDefault();
        handleMove(e);
        
        const onMove = (moveEvent) => {
          moveEvent.preventDefault();
          let clientX;
          if (moveEvent.touches) {
            clientX = moveEvent.touches[0].clientX;
          } else {
            clientX = moveEvent.clientX;
          }
          const rect = slider.getBoundingClientRect();
          let x = (clientX - rect.left) / rect.width;
          x = Math.min(1, Math.max(0, x));
          setSliderPositions(prev => ({ ...prev, [id]: x * 100 }));
        };
        
        const onEnd = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onEnd);
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onEnd);
        };
        
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
      };
      
      slider.addEventListener('mousedown', handleStart);
      slider.addEventListener('touchstart', handleStart, { passive: false });
      
      return () => {
        slider.removeEventListener('mousedown', handleStart);
        slider.removeEventListener('touchstart', handleStart);
      };
    });
  }, []);

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
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, background: "white", padding: "12px 16px", boxShadow: "0 1px 5px rgba(0,0,0,0.05)", zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "40px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Greater Edge</div>
              <div style={{ fontSize: "10px", fontWeight: "500", color: "#2E8B57" }}>Landscaping LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#334155", fontSize: "14px", fontWeight: "500" }}>Home</Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "#334155", fontSize: "14px", fontWeight: "500" }}>Contact</Link>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "5px 14px", borderRadius: "25px", textDecoration: "none", fontSize: "12px", fontWeight: "600" }}>📘</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "50px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "10px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>Professional Landscaping Services</p>
        <Link to="/contact" style={{ background: "white", color: "#2E8B57", padding: "10px 28px", borderRadius: "40px", textDecoration: "none", fontWeight: "700", fontSize: "14px", display: "inline-block" }}>Free Estimate →</Link>
      </section>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "40px 20px 20px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a" }}>Our Work</h2>
        <div style={{ width: "50px", height: "3px", background: "#2E8B57", margin: "10px auto 0", borderRadius: "2px" }}></div>
      </div>

      {/* PROJECTS */}
      <div style={{ padding: "10px 16px 50px" }}>
        {projects.map((project) => {
          const position = sliderPositions[project.id] !== undefined ? sliderPositions[project.id] : 50;
          const isOpen = showMore[project.id];
          const hasExtras = project.extras && project.extras.length > 0;

          return (
            <div key={project.id} style={{ marginBottom: "45px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px", color: "#1e293b" }}>{project.name}</h3>
              
              {/* SLIDER - MOBILE FIRST */}
              <div 
                ref={el => slidersRef.current[project.id] = el}
                style={{ 
                  position: "relative", 
                  width: "100%", 
                  aspectRatio: "16/9", 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  backgroundColor: "#e2e8f0",
                  cursor: "ew-resize",
                  touchAction: "none"
                }}
              >
                {/* AFTER IMAGE (bottom) */}
                <img 
                  src={project.after} 
                  alt="After" 
                  style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    pointerEvents: "none"
                  }} 
                />
                
                {/* BEFORE IMAGE (top, clipped) */}
                <div 
                  style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: `${position}%`, 
                    height: "100%", 
                    overflow: "hidden",
                    pointerEvents: "none"
                  }}
                >
                  <img 
                    src={project.before} 
                    alt="Before" 
                    style={{ 
                      position: "absolute", 
                      top: 0, 
                      left: 0, 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      pointerEvents: "none"
                    }} 
                  />
                </div>
                
                {/* DRAG HANDLE */}
                <div 
                  style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: `${position}%`, 
                    width: "40px", 
                    height: "100%", 
                    transform: "translateX(-50%)", 
                    cursor: "ew-resize", 
                    zIndex: 20, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    touchAction: "none"
                  }}
                >
                  <div style={{ 
                    background: "white", 
                    padding: "5px 10px", 
                    borderRadius: "25px", 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    color: "#1e293b", 
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)", 
                    whiteSpace: "nowrap",
                    pointerEvents: "none"
                  }}>
                    ◀ DRAG ▶
                  </div>
                </div>
                
                {/* LABELS */}
                <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(0,0,0,0.6)", color: "white", padding: "3px 8px", borderRadius: "15px", fontSize: "9px", fontWeight: "500", pointerEvents: "none" }}>BEFORE</div>
                <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "white", padding: "3px 8px", borderRadius: "15px", fontSize: "9px", fontWeight: "500", pointerEvents: "none" }}>AFTER</div>
              </div>

              {/* DROPDOWN BUTTON - Make sure this is clickable */}
              {hasExtras && (
                <div style={{ marginTop: "15px" }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(project.id);
                    }} 
                    style={{ 
                      width: "100%", 
                      background: "#f8fafc", 
                      border: "1px solid #e2e8f0", 
                      borderRadius: "10px", 
                      padding: "10px 16px", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      cursor: "pointer", 
                      fontSize: "13px", 
                      fontWeight: "500", 
                      color: "#2E8B57",
                      fontFamily: "inherit"
                    }}
                  >
                    <span>📸 Additional Photos ({project.extras.length})</span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                  </button>
                  {isOpen && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px", marginTop: "12px" }}>
                      {project.extras.map((img, idx) => (
                        <div key={idx} style={{ background: "#f1f5f9", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
                          <img src={img} alt={`${project.name} ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {!hasExtras && <div style={{ marginTop: "10px", textAlign: "center", fontSize: "11px", color: "#94a3b8" }}>More photos coming soon</div>}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "24px 20px", textAlign: "center", fontSize: "11px" }}>
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
