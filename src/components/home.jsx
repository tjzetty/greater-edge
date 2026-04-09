import { useState } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPos, setSliderPos] = useState({});

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
    
    return (
      <div 
        style={{ 
          position: "relative", 
          width: "100%", 
          aspectRatio: "4/3", 
          background: "#1a1a1a", 
          borderRadius: "16px", 
          overflow: "hidden",
          touchAction: "none"
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          const rect = e.currentTarget.getBoundingClientRect();
          let x = (touch.clientX - rect.left) / rect.width;
          x = Math.min(0.98, Math.max(0.02, x));
          setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
          
          const onTouchMove = (moveEvent) => {
            moveEvent.preventDefault();
            const moveTouch = moveEvent.touches[0];
            let moveX = (moveTouch.clientX - rect.left) / rect.width;
            moveX = Math.min(0.98, Math.max(0.02, moveX));
            setSliderPos(prev => ({ ...prev, [id]: moveX * 100 }));
          };
          
          const onTouchEnd = () => {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
          };
          
          document.addEventListener('touchmove', onTouchMove, { passive: false });
          document.addEventListener('touchend', onTouchEnd);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          let x = (e.clientX - rect.left) / rect.width;
          x = Math.min(0.98, Math.max(0.02, x));
          setSliderPos(prev => ({ ...prev, [id]: x * 100 }));
          
          const onMouseMove = (moveEvent) => {
            let moveX = (moveEvent.clientX - rect.left) / rect.width;
            moveX = Math.min(0.98, Math.max(0.02, moveX));
            setSliderPos(prev => ({ ...prev, [id]: moveX * 100 }));
          };
          
          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
          
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }}
      >
        <img src={after} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: `${pos}%`, height: "100%", overflow: "hidden", pointerEvents: "none" }}>
          <img src={before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
        </div>
        <div style={{ 
          position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)",
          background: "white", padding: "10px 16px", borderRadius: "40px", 
          fontSize: "13px", fontWeight: "bold", color: "#1e293b",
          whiteSpace: "nowrap", boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          zIndex: 20, pointerEvents: "none"
        }}>
          ◀ DRAG ▶
        </div>
        <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500", zIndex: 10, pointerEvents: "none" }}>BEFORE</div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500", zIndex: 10, pointerEvents: "none" }}>AFTER</div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0f172a", minHeight: "100vh" }}>
      
      <div style={{ position: "sticky", top: 0, background: "#0f172a", padding: "14px 20px", borderBottom: "1px solid #1e293b", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "42px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "11px", color: "#2E8B57", fontWeight: "600" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "14px", fontWeight: "500" }}>Home</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "14px", fontWeight: "500" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "6px 18px", borderRadius: "30px", textDecoration: "none", fontSize: "12px", fontWeight: "600" }}>📘</a>
          </div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "60px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "18px", marginBottom: "24px", opacity: 0.95 }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "12px 32px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "15px", display: "inline-block" }}>Free Estimate →</a>
      </div>

      <div style={{ textAlign: "center", padding: "50px 20px 20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "white", margin: 0 }}>Our Work</h2>
        <div style={{ width: "60px", height: "4px", background: "#2E8B57", margin: "15px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#94a3b8", marginTop: "15px", fontSize: "15px" }}>See the difference we make</p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 16px 80px" }}>
        {projects.map(project => {
          const secondSliderId = `${project.id}_2`;
          
          return (
            <div key={project.id} style={{ marginBottom: "100px" }}>
              <div style={{ marginBottom: "20px", borderLeft: "4px solid #2E8B57", paddingLeft: "14px" }}>
                <h3 style={{ fontSize: "24px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "5px" }}>Before & After Transformations</p>
              </div>
              
              <Slider before={project.before} after={project.after} id={project.id} />
              
              {project.hasSecondSlider && (
                <div style={{ marginTop: "50px" }}>
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ fontSize: "18px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>Another Transformation</h4>
                    <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "4px" }}>Another project completed</p>
                  </div>
                  <Slider before={project.secondBefore} after={project.secondAfter} id={secondSliderId} />
                </div>
              )}
              
              {project.extras.length > 0 && (
                <div style={{ marginTop: "30px" }}>
                  <button 
                    onClick={() => toggleDropdown(project.id)} 
                    style={{ 
                      width: "100%", 
                      padding: "12px", 
                      background: "#1e293b", 
                      border: "1px solid #334155", 
                      borderRadius: "12px", 
                      fontSize: "13px", 
                      fontWeight: "500",
                      color: "#2E8B57",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }}
                  >
                    {showMore[project.id] ? "▲ Hide Additional Photos" : `▼ Show Additional Photos (${project.extras.length})`}
                  </button>
                  {showMore[project.id] && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginTop: "15px" }}>
                      {project.extras.map((img, i) => (
                        <div key={i} style={{ background: "#1e293b", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
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

      <div style={{ background: "#020617", color: "#64748b", padding: "30px 20px", textAlign: "center", fontSize: "12px", borderTop: "1px solid #1e293b" }}>
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
      </div>
    </div>
  );
}
