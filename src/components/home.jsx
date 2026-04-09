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
    { id: 1, name: "Brick Pavers & Patios", before: "images/paver1.jpg", after: "images/paver2.jpg", extras: ["images/paver3.jpg"] },
    { id: 2, name: "Lawn Transformations", before: "images/lawn1.jpg", after: "images/lawn2.jpg", extras: [] },
    { id: 3, name: "Bed Clean Up", before: "images/bedcleanup1.jpg", after: "images/bedcleanup2.jpg", extras: [] },
    { id: 4, name: "Bush & Hedge Trimming", before: "images/bushtrim1.jpg", after: "images/bushtrim2.jpg", extras: [] },
    { id: 5, name: "Fall Clean Ups", before: "images/fallcleanup1.jpg", after: "images/fallcleanup2.jpg", extras: [] },
    { id: 6, name: "Mulching & Bed Maintenance", before: "images/mulch1.jpg", after: "images/mulch2.jpg", extras: [] },
    { id: 7, name: "Power Washing", before: "images/powerwashing1.jpg", after: "images/powerwashing2.jpg", extras: [] }
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, background: "white", padding: "10px 15px", boxShadow: "0 1px 5px rgba(0,0,0,0.1)", zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="images/logo.jpg" alt="Logo" style={{ height: "40px" }} />
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>Greater Edge Landscaping</div>
              <div style={{ fontSize: "10px", color: "#2E8B57" }}>LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <a href="/" style={{ textDecoration: "none", color: "#333" }}>Home</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" style={{ background: "#1877F2", color: "white", padding: "5px 12px", borderRadius: "20px", textDecoration: "none", fontSize: "12px" }}>FB</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "#2E8B57", padding: "50px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "32px", margin: 0 }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "16px", margin: "10px 0 20px" }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "10px 25px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", display: "inline-block" }}>Free Estimate →</a>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "40px 20px 20px" }}>
        <h2 style={{ fontSize: "28px" }}>Our Work</h2>
        <div style={{ width: "50px", height: "3px", background: "#2E8B57", margin: "10px auto" }}></div>
      </div>

      {/* PROJECTS */}
      <div style={{ padding: "0 15px 50px" }}>
        {projects.map(project => {
          const pos = sliderPos[project.id] !== undefined ? sliderPos[project.id] : 50;
          
          return (
            <div key={project.id} style={{ marginBottom: "50px" }}>
              <h3 style={{ fontSize: "22px", marginBottom: "15px" }}>{project.name}</h3>
              
              {/* SLIDER - This works on mobile */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#ddd", borderRadius: "10px", overflow: "hidden" }}>
                <img src={project.after} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: `${pos}%`, height: "100%", overflow: "hidden" }}>
                  <img src={project.before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                      setSliderPos(prev => ({ ...prev, [project.id]: x * 100 }));
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
                      setSliderPos(prev => ({ ...prev, [project.id]: x * 100 }));
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

              {/* DROPDOWN */}
              {project.extras.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <button 
                    onClick={() => toggleDropdown(project.id)} 
                    style={{ width: "100%", padding: "10px", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}
                  >
                    {showMore[project.id] ? "▲ Hide Extra Photos" : `▼ Show Extra Photos (${project.extras.length})`}
                  </button>
                  {showMore[project.id] && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                      {project.extras.map((img, i) => (
                        <img key={i} src={img} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "8px" }} />
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
      <div style={{ background: "#111", color: "#888", padding: "20px", textAlign: "center", fontSize: "12px" }}>
        © 2026 Greater Edge Landscaping LLC
      </div>
    </div>
  );
}
