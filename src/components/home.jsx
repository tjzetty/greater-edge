import { useState, useRef, useEffect } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPos, setSliderPos] = useState({});
  const sliderRefs = useRef({});
  const isDragging = useRef(false);

  const toggleDropdown = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Setup sliders on mount
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging.current) return;
      
      const sliderId = isDragging.current;
      const sliderDiv = sliderRefs.current[sliderId];
      if (!sliderDiv) return;
      
      const rect = sliderDiv.getBoundingClientRect();
      let clientX;
      
      if (e.touches) {
        clientX = e.touches[0].clientX;
        e.preventDefault();
      } else {
        clientX = e.clientX;
      }
      
      let x = (clientX - rect.left) / rect.width;
      x = Math.min(0.98, Math.max(0.02, x));
      setSliderPos(prev => ({ ...prev, [sliderId]: x * 100 }));
    };
    
    const handleEnd = () => {
      isDragging.current = false;
    };
    
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
  }, []);

  const startDrag = (id, e) => {
    e.preventDefault();
    isDragging.current = id;
    
    // Immediately update position on click/tap
    const sliderDiv = sliderRefs.current[id];
    if (sliderDiv) {
      const rect = sliderDiv.getBoundingClientRect();
      let clientX;
      
      if (e.touches) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      
      let x = (clientX - rect.left) / rect.width;
      x = Math.min(0.98, Math.max(0.02, x));
      setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
    }
  };

  const projects = [
    { 
      id: 1, 
      name: "Brick Pavers & Patios", 
      before: "images/paver1.jpg", 
      after: "images/paver2.jpg",
      hasSecondSlider: true,
      secondBefore: "images/paver3.jpg",
      secondAfter: "images/paver4.jpg",
      extras: [] 
    },
    { id: 2, name: "Lawn Transformations", before: "images/lawn1.jpg", after: "images/lawn2.jpg", hasSecondSlider: false, extras: [] },
    { id: 3, name: "Bed Clean Up", before: "images/bedcleanup1.jpg", after: "images/bedcleanup2.jpg", hasSecondSlider: false, extras: [] },
    { id: 4, name: "Bush & Hedge Trimming", before: "images/bushtrim1.jpg", after: "images/bushtrim2.jpg", hasSecondSlider: false, extras: [] },
    { id: 5, name: "Fall Clean Ups", before: "images/fallcleanup1.jpg", after: "images/fallcleanup2.jpg", hasSecondSlider: false, extras: [] },
    { id: 6, name: "Mulching & Bed Maintenance", before: "images/mulch1.jpg", after: "images/mulch2.jpg", hasSecondSlider: false, extras: [] },
    { id: 7, name: "Power Washing", before: "images/powerwashing1.jpg", after: "images/powerwashing2.jpg", hasSecondSlider: false, extras: [] }
  ];

  // Slider component
  const Slider = ({ before, after, id, title }) => {
    const pos = sliderPos[id] !== undefined ? sliderPos[id] : 50;
    
    return (
      <div 
        ref={el => sliderRefs.current[id] = el}
        style={{ 
          position: "relative", 
          width: "100%", 
          aspectRatio: "4/3", 
          background: "#e2e8f0", 
          borderRadius: "16px", 
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          cursor: "ew-resize",
          touchAction: "none"
        }}
      >
        {/* AFTER image (bottom) */}
        <img 
          src={after} 
          alt="After" 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            display: "block"
          }} 
        />
        
        {/* BEFORE image wrapper (top, clipped) */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: `${pos}%`, 
            height: "100%", 
            overflow: "hidden"
          }}
        >
          <img 
            src={before} 
            alt="Before" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block"
            }} 
          />
        </div>
        
        {/* SLIDER LINE */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: `${pos}%`, 
            width: "3px", 
            height: "100%", 
            background: "white",
            transform: "translateX(-50%)",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.1), 0 0 0 4px rgba(255,255,255,0.3)",
            zIndex: 15,
            pointerEvents: "none"
          }} 
        />
        
        {/* DRAG HANDLE - LARGE for mobile */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: `${pos}%`, 
            width: "60px", 
            height: "100%", 
            transform: "translateX(-50%)", 
            cursor: "ew-resize",
            zIndex: 20,
            touchAction: "none"
          }}
          onMouseDown={(e) => startDrag(id, e)}
          onTouchStart={(e) => startDrag(id, e)}
        >
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            background: "white", 
            padding: "10px 16px", 
            borderRadius: "40px", 
            fontSize: "12px", 
            fontWeight: "bold", 
            color: "#1e293b",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            letterSpacing: "1px"
          }}>
            ◀  DRAG  ▶
          </div>
        </div>
        
        {/* LABELS */}
        <div style={{ 
          position: "absolute", 
          bottom: "16px", 
          left: "16px", 
          background: "rgba(0,0,0,0.65)", 
          backdropFilter: "blur(8px)",
          color: "white", 
          padding: "5px 14px", 
          borderRadius: "25px", 
          fontSize: "11px", 
          fontWeight: "600",
          letterSpacing: "0.5px",
          zIndex: 10,
          pointerEvents: "none"
        }}>
          BEFORE
        </div>
        <div style={{ 
          position: "absolute", 
          bottom: "16px", 
          right: "16px", 
          background: "rgba(0,0,0,0.65)", 
          backdropFilter: "blur(8px)",
          color: "white", 
          padding: "5px 14px", 
          borderRadius: "25px", 
          fontSize: "11px", 
          fontWeight: "600",
          letterSpacing: "0.5px",
          zIndex: 10,
          pointerEvents: "none"
        }}>
          AFTER
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#fff" }}>
      
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, background: "white", padding: "14px 24px", boxShadow: "0 2px 15px rgba(0,0,0,0.06)", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "48px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", letterSpacing: "-0.3px" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "12px", color: "#2E8B57", fontWeight: "600", letterSpacing: "0.3px" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none", color: "#334155", fontSize: "15px", fontWeight: "500" }}>Home</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#334155", fontSize: "15px", fontWeight: "500" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "8px 22px", borderRadius: "30px", textDecoration: "none", fontSize: "13px", fontWeight: "600", transition: "all 0.2s" }}>📘 Facebook</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "80px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "700", marginBottom: "16px", letterSpacing: "-0.5px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "20px", marginBottom: "28px", opacity: 0.95 }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "14px 38px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px", display: "inline-block", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>Free Estimate →</a>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "60px 20px 30px" }}>
        <h2 style={{ fontSize: "38px", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.3px" }}>Our Work</h2>
        <div style={{ width: "70px", height: "4px", background: "#2E8B57", margin: "18px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#64748b", marginTop: "18px", fontSize: "16px" }}>See the difference we make</p>
      </div>

      {/* PROJECTS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 24px 80px" }}>
        {projects.map(project => {
          const secondSliderId = `${project.id}_2`;
          
          return (
            <div key={project.id} style={{ marginBottom: "90px" }}>
              
              {/* Section Title */}
              <div style={{ marginBottom: "25px", borderLeft: "5px solid #2E8B57", paddingLeft: "18px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: "600", color: "#1e293b", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>Before & After Transformations</p>
              </div>
              
              {/* First Slider */}
              <Slider before={project.before} after={project.after} id={project.id} title={project.name} />
              
              {/* Second Slider for Brick Pavers */}
              {project.hasSecondSlider && (
                <div style={{ marginTop: "50px" }}>
                  <div style={{ marginBottom: "18px" }}>
                    <h4 style={{ fontSize: "20px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>Another Transformation</h4>
                    <p style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>Another project completed</p>
                  </div>
                  <Slider before={project.secondBefore} after={project.secondAfter} id={secondSliderId} title={`${project.name} 2`} />
                </div>
              )}
              
              {/* Dropdown for extras */}
              {project.extras.length > 0 && (
                <div style={{ marginTop: "28px" }}>
                  <button 
                    onClick={() => toggleDropdown(project.id)} 
                    style={{ 
                      width: "100%", 
                      padding: "14px", 
                      background: "#f8fafc", 
                      border: "1px solid #e2e8f0", 
                      borderRadius: "12px", 
                      fontSize: "14px", 
                      fontWeight: "500",
                      color: "#2E8B57",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.2s"
                    }}
                  >
                    {showMore[project.id] ? "▲ Hide Additional Photos" : `▼ Show Additional Photos (${project.extras.length})`}
                  </button>
                  {showMore[project.id] && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px", marginTop: "18px" }}>
                      {project.extras.map((img, i) => (
                        <div key={i} style={{ background: "#f1f5f9", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                          <img src={img} alt={`Extra ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0f172a", color: "#94a3b8", padding: "40px 20px", textAlign: "center", fontSize: "13px" }}>
        <p style={{ margin: 0 }}>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ margin: "12px 0 0", fontSize: "12px", color: "#64748b" }}>Professional Landscaping Services</p>
      </div>
    </div>
  );
}
