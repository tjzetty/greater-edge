import { useState, useRef, useEffect } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPos, setSliderPos] = useState({});
  const sliderRefs = useRef({});
  const draggingId = useRef(null);
  const startX = useRef(0);
  const startPos = useRef(0);

  const toggleDropdown = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle drag start
  const handleDragStart = (id, e) => {
    e.preventDefault();
    draggingId.current = id;
    
    let clientX;
    if (e.touches) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const currentPos = sliderPos[id] !== undefined ? sliderPos[id] : 50;
    startX.current = clientX;
    startPos.current = currentPos;
  };

  // Handle drag move
  useEffect(() => {
    const handleDragMove = (e) => {
      if (draggingId.current === null) return;
      
      let clientX;
      if (e.touches) {
        clientX = e.touches[0].clientX;
        e.preventDefault();
      } else {
        clientX = e.clientX;
      }
      
      const deltaX = clientX - startX.current;
      const deltaPercent = (deltaX / window.innerWidth) * 100;
      let newPos = startPos.current + deltaPercent;
      newPos = Math.min(98, Math.max(2, newPos));
      
      setSliderPos(prev => ({ ...prev, [draggingId.current]: newPos }));
    };
    
    const handleDragEnd = () => {
      draggingId.current = null;
    };
    
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, []);

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

  // SLIDER COMPONENT
  const Slider = ({ before, after, id }) => {
    const pos = sliderPos[id] !== undefined ? sliderPos[id] : 50;
    
    return (
      <div 
        ref={el => sliderRefs.current[id] = el}
        style={{ 
          position: "relative", 
          width: "100%", 
          aspectRatio: "4/3", 
          background: "#1a1a1a", 
          borderRadius: "16px", 
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          touchAction: "none",
          userSelect: "none"
        }}
      >
        {/* AFTER IMAGE */}
        <img 
          src={after} 
          alt="After" 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            pointerEvents: "none"
          }} 
        />
        
        {/* BEFORE IMAGE (clipped) */}
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
              pointerEvents: "none"
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
            boxShadow: "0 0 0 2px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.5)",
            zIndex: 15,
            pointerEvents: "none"
          }} 
        />
        
        {/* DRAG HANDLE */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: `${pos}%`, 
            width: "70px", 
            height: "100%", 
            transform: "translateX(-50%)", 
            cursor: "grab",
            zIndex: 20,
            touchAction: "none"
          }}
          onMouseDown={(e) => handleDragStart(id, e)}
          onTouchStart={(e) => handleDragStart(id, e)}
        >
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            background: "white", 
            padding: "10px 18px", 
            borderRadius: "50px", 
            fontSize: "13px", 
            fontWeight: "bold", 
            color: "#1e293b",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
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
          background: "rgba(0,0,0,0.7)", 
          backdropFilter: "blur(10px)",
          color: "white", 
          padding: "5px 14px", 
          borderRadius: "30px", 
          fontSize: "11px", 
          fontWeight: "600",
          zIndex: 10,
          pointerEvents: "none"
        }}>
          BEFORE
        </div>
        <div style={{ 
          position: "absolute", 
          bottom: "16px", 
          right: "16px", 
          background: "rgba(0,0,0,0.7)", 
          backdropFilter: "blur(10px)",
          color: "white", 
          padding: "5px 14px", 
          borderRadius: "30px", 
          fontSize: "11px", 
          fontWeight: "600",
          zIndex: 10,
          pointerEvents: "none"
        }}>
          AFTER
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
      background: "#0f172a",
      minHeight: "100vh"
    }}>
      
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, background: "#0f172a", padding: "14px 24px", borderBottom: "1px solid #1e293b", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "48px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "white", letterSpacing: "-0.3px" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "12px", color: "#2E8B57", fontWeight: "600" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "15px", fontWeight: "500" }}>Home</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "15px", fontWeight: "500" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "8px 22px", borderRadius: "30px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>📘 Facebook</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "80px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "700", marginBottom: "16px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "20px", marginBottom: "28px", opacity: 0.95 }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "14px 38px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px", display: "inline-block" }}>Free Estimate →</a>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "60px 20px 30px" }}>
        <h2 style={{ fontSize: "38px", fontWeight: "700", color: "white", margin: 0 }}>Our Work</h2>
        <div style={{ width: "70px", height: "4px", background: "#2E8B57", margin: "18px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#94a3b8", marginTop: "18px", fontSize: "16px" }}>See the difference we make</p>
      </div>

      {/* PROJECTS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 24px 80px" }}>
        {projects.map(project => {
          const secondSliderId = `${project.id}_2`;
          
          return (
            <div key={project.id} style={{ marginBottom: "90px" }}>
              
              {/* Section Title */}
              <div style={{ marginBottom: "25px", borderLeft: "5px solid #2E8B57", paddingLeft: "18px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "6px" }}>Before & After Transformations</p>
              </div>
              
              {/* First Slider */}
              <Slider before={project.before} after={project.after} id={project.id} />
              
              {/* Second Slider for Brick Pavers */}
              {project.hasSecondSlider && (
                <div style={{ marginTop: "50px" }}>
                  <div style={{ marginBottom: "18px" }}>
                    <h4 style={{ fontSize: "20px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>Another Transformation</h4>
                    <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "4px" }}>Another project completed</p>
                  </div>
                  <Slider before={project.secondBefore} after={project.secondAfter} id={secondSliderId} />
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
                      background: "#1e293b", 
                      border: "1px solid #334155", 
                      borderRadius: "12px", 
                      fontSize: "14px", 
                      fontWeight: "500",
                      color: "#2E8B57",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }}
                  >
                    {showMore[project.id] ? "▲ Hide Additional Photos" : `▼ Show Additional Photos (${project.extras.length})`}
                  </button>
                  {showMore[project.id] && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px", marginTop: "18px" }}>
                      {project.extras.map((img, i) => (
                        <div key={i} style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
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
      <div style={{ background: "#020617", color: "#64748b", padding: "40px 20px", textAlign: "center", fontSize: "13px", borderTop: "1px solid #1e293b" }}>
        <p style={{ margin: 0 }}>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ margin: "12px 0 0", fontSize: "12px" }}>Professional Landscaping Services</p>
      </div>
    </div>
  );
}
