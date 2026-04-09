import { useState, useRef } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPos, setSliderPos] = useState({});
  const draggingId = useRef(null);

  const toggleDropdown = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
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

  const Slider = ({ before, after, id }) => {
    const pos = sliderPos[id] !== undefined ? sliderPos[id] : 50;
    const sliderRef = useRef(null);

    const updatePosition = (clientX) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      let x = (clientX - rect.left) / rect.width;
      x = Math.min(0.98, Math.max(0.02, x));
      setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
    };

    const handleStart = (e) => {
      e.preventDefault();
      draggingId.current = id;
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };

    const handleMove = (e) => {
      if (draggingId.current !== id) return;
      e.preventDefault();
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };

    const handleEnd = () => {
      if (draggingId.current === id) {
        draggingId.current = null;
      }
    };

    return (
      <div>
        {/* Slider Container */}
        <div 
          ref={sliderRef}
          style={{ 
            position: "relative", 
            width: "100%", 
            aspectRatio: "4/3", 
            background: "#1a1a1a", 
            borderRadius: "20px", 
            overflow: "hidden",
            cursor: "grab",
            touchAction: "none"
          }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          {/* AFTER Image */}
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
          
          {/* BEFORE Image - clipped */}
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
          
          {/* Slider Line */}
          <div style={{ 
            position: "absolute", 
            top: 0, 
            left: `${pos}%`, 
            width: "4px", 
            height: "100%", 
            background: "white",
            transform: "translateX(-50%)",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.5)",
            zIndex: 10
          }} />
          
          {/* Drag Handle - VISIBLE OVER THE PICTURE */}
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: `${pos}%`, 
            transform: "translate(-50%, -50%)",
            background: "white", 
            padding: "12px 20px", 
            borderRadius: "60px", 
            fontSize: "14px", 
            fontWeight: "bold", 
            color: "#1e293b",
            whiteSpace: "nowrap", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            zIndex: 20,
            letterSpacing: "1px"
          }}>
            ◀  DRAG  ▶
          </div>
          
          {/* Labels */}
          <div style={{ 
            position: "absolute", 
            bottom: "16px", 
            left: "16px", 
            background: "rgba(0,0,0,0.7)", 
            backdropFilter: "blur(8px)",
            color: "white", 
            padding: "6px 14px", 
            borderRadius: "30px", 
            fontSize: "12px", 
            fontWeight: "600",
            zIndex: 10
          }}>BEFORE</div>
          <div style={{ 
            position: "absolute", 
            bottom: "16px", 
            right: "16px", 
            background: "rgba(0,0,0,0.7)", 
            backdropFilter: "blur(8px)",
            color: "white", 
            padding: "6px 14px", 
            borderRadius: "30px", 
            fontSize: "12px", 
            fontWeight: "600",
            zIndex: 10
          }}>AFTER</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0f172a", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, background: "#0f172a", padding: "16px 20px", borderBottom: "1px solid #1e293b", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "45px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "11px", color: "#2E8B57", fontWeight: "600" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "14px", fontWeight: "500" }}>Home</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "14px", fontWeight: "500" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "7px 20px", borderRadius: "30px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>📘 Facebook</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "70px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "700", marginBottom: "15px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "18px", marginBottom: "25px", opacity: 0.95 }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "14px 36px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px", display: "inline-block" }}>Free Estimate →</a>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "60px 20px 25px" }}>
        <h2 style={{ fontSize: "34px", fontWeight: "700", color: "white", margin: 0 }}>Our Work</h2>
        <div style={{ width: "60px", height: "4px", background: "#2E8B57", margin: "18px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#94a3b8", marginTop: "18px", fontSize: "16px" }}>See the difference we make</p>
      </div>

      {/* PROJECTS - MASSIVE SPACING */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 16px 100px" }}>
        {projects.map(project => {
          const secondSliderId = `${project.id}_2`;
          
          return (
            <div key={project.id} style={{ marginBottom: "150px" }}>
              
              <div style={{ marginBottom: "25px", borderLeft: "5px solid #2E8B57", paddingLeft: "16px" }}>
                <h3 style={{ fontSize: "26px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "6px" }}>Before & After Transformations</p>
              </div>
              
              <Slider before={project.before} after={project.after} id={project.id} />
              
              {project.hasSecondSlider && (
                <div style={{ marginTop: "70px" }}>
                  <div style={{ marginBottom: "18px" }}>
                    <h4 style={{ fontSize: "20px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>Another Transformation</h4>
                    <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "5px" }}>Another project completed</p>
                  </div>
                  <Slider before={project.secondBefore} after={project.secondAfter} id={secondSliderId} />
                </div>
              )}
              
              {project.extras.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                  <button 
                    onClick={() => toggleDropdown(project.id)} 
                    style={{ 
                      width: "100%", 
                      padding: "15px", 
                      background: "#1e293b", 
                      border: "1px solid #334155", 
                      borderRadius: "14px", 
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
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px", marginTop: "20px" }}>
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
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ marginTop: "10px", fontSize: "12px" }}>Professional Landscaping Services</p>
      </div>
    </div>
  );
}
