import { useState } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPos, setSliderPos] = useState({});

  const toggleDropdown = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Simple slider handler
  const handleDrag = (id, e) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    let clientX;
    if (e.touches) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    let x = (clientX - rect.left) / rect.width;
    x = Math.min(1, Math.max(0, x));
    setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
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
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#ddd", borderRadius: "12px", overflow: "hidden", marginTop: "10px" }}>
        <img src={after} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: `${pos}%`, height: "100%", overflow: "hidden" }}>
          <img src={before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: `${pos}%`, 
            width: "40px", 
            height: "100%", 
            transform: "translateX(-50%)", 
            background: "white",
            borderRadius: "20px",
            cursor: "pointer",
            zIndex: 10
          }}
          onMouseDown={(e) => {
            const onMove = (moveEvent) => {
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              let clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
              let x = (clientX - rect.left) / rect.width;
              x = Math.min(1, Math.max(0, x));
              setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
            };
            const onUp = () => {
              document.removeEventListener('mousemove', onMove);
              document.removeEventListener('mouseup', onUp);
              document.removeEventListener('touchmove', onMove);
              document.removeEventListener('touchend', onUp);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onUp);
          }}
          onTouchStart={(e) => {
            const onMove = (moveEvent) => {
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              let clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
              let x = (clientX - rect.left) / rect.width;
              x = Math.min(1, Math.max(0, x));
              setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
            };
            const onUp = () => {
              document.removeEventListener('touchmove', onMove);
              document.removeEventListener('touchend', onUp);
            };
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onUp);
          }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "4px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "bold", whiteSpace: "nowrap" }}>◀ DRAG ▶</div>
        </div>
        <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "black", color: "white", padding: "2px 8px", borderRadius: "15px", fontSize: "10px", opacity: 0.7 }}>BEFORE</div>
        <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "black", color: "white", padding: "2px 8px", borderRadius: "15px", fontSize: "10px", opacity: 0.7 }}>AFTER</div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff" }}>
      
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, background: "white", padding: "12px 20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "45px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "11px", color: "#2E8B57", fontWeight: "500" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none", color: "#334155", fontSize: "15px", fontWeight: "500" }}>Home</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#334155", fontSize: "15px", fontWeight: "500" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "6px 18px", borderRadius: "25px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>📘 Facebook</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "70px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "700", marginBottom: "15px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "18px", marginBottom: "25px", opacity: 0.95 }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "12px 32px", borderRadius: "40px", textDecoration: "none", fontWeight: "bold", fontSize: "16px", display: "inline-block" }}>Free Estimate →</a>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "50px 20px 30px" }}>
        <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Our Work</h2>
        <div style={{ width: "60px", height: "4px", background: "#2E8B57", margin: "15px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#64748b", marginTop: "15px", fontSize: "16px" }}>See the difference we make</p>
      </div>

      {/* PROJECTS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 20px 70px" }}>
        {projects.map(project => {
          const secondSliderId = `${project.id}_2`;
          
          return (
            <div key={project.id} style={{ marginBottom: "70px" }}>
              
              {/* Section Title */}
              <div style={{ marginBottom: "20px", borderLeft: "4px solid #2E8B57", paddingLeft: "15px" }}>
                <h3 style={{ fontSize: "26px", fontWeight: "600", color: "#1e293b", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", marginTop: "5px" }}>Before & After Transformations</p>
              </div>
              
              {/* First Slider */}
              <Slider before={project.before} after={project.after} id={project.id} title={project.name} />
              
              {/* Second Slider for Brick Pavers */}
              {project.hasSecondSlider && (
                <div style={{ marginTop: "40px" }}>
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ fontSize: "18px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>Another Transformation</h4>
                    <p style={{ color: "#64748b", fontSize: "12px", marginTop: "3px" }}>Another project completed</p>
                  </div>
                  <Slider before={project.secondBefore} after={project.secondAfter} id={secondSliderId} title={`${project.name} 2`} />
                </div>
              )}
              
              {/* Dropdown for extras */}
              {project.extras.length > 0 && (
                <div style={{ marginTop: "25px" }}>
                  <button 
                    onClick={() => toggleDropdown(project.id)} 
                    style={{ 
                      width: "100%", 
                      padding: "12px", 
                      background: "#f8fafc", 
                      border: "1px solid #e2e8f0", 
                      borderRadius: "10px", 
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
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px", marginTop: "15px" }}>
                      {project.extras.map((img, i) => (
                        <div key={i} style={{ background: "#f1f5f9", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
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
      <div style={{ background: "#0f172a", color: "#94a3b8", padding: "35px 20px", textAlign: "center", fontSize: "13px" }}>
        <p style={{ margin: 0 }}>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ margin: "10px 0 0", fontSize: "11px", color: "#64748b" }}>Professional Landscaping Services</p>
      </div>
    </div>
  );
}
