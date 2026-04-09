import { useState } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [showMoreExtras, setShowMoreExtras] = useState({});

  const toggleDropdown = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExtras = (id) => {
    setShowMoreExtras(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Slider Component
  const Slider = ({ before, after, sliderId }) => {
    const [pos, setPos] = useState(50);
    
    return (
      <div 
        style={{ 
          position: "relative", 
          width: "100%", 
          aspectRatio: "4/3", 
          background: "#1a1a1a", 
          borderRadius: "16px", 
          overflow: "hidden"
        }}
      >
        <img src={after} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: `${pos}%`, height: "100%", overflow: "hidden" }}>
          <img src={before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            bottom: 0,
            left: `${pos}%`,
            width: "60px",
            transform: "translateX(-50%)",
            cursor: "ew-resize",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "none"
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            const sliderDiv = e.currentTarget.parentElement;
            const onMove = (moveEvent) => {
              const rect = sliderDiv.getBoundingClientRect();
              let clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
              let x = (clientX - rect.left) / rect.width;
              x = Math.min(0.98, Math.max(0.02, x));
              setPos(x * 100);
            };
            const onUp = () => {
              document.removeEventListener('mousemove', onMove);
              document.removeEventListener('mouseup', onUp);
              document.removeEventListener('touchmove', onMove);
              document.removeEventListener('touchend', onUp);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onUp);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            const sliderDiv = e.currentTarget.parentElement;
            const onMove = (moveEvent) => {
              const rect = sliderDiv.getBoundingClientRect();
              let clientX = moveEvent.touches[0].clientX;
              let x = (clientX - rect.left) / rect.width;
              x = Math.min(0.98, Math.max(0.02, x));
              setPos(x * 100);
            };
            const onUp = () => {
              document.removeEventListener('touchmove', onMove);
              document.removeEventListener('touchend', onUp);
            };
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onUp);
          }}
        >
          <div style={{ 
            background: "white", 
            padding: "10px 16px", 
            borderRadius: "40px", 
            fontSize: "13px", 
            fontWeight: "bold", 
            color: "#1e293b",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            pointerEvents: "none"
          }}>
            ◀ DRAG ▶
          </div>
        </div>
        
        <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500" }}>BEFORE</div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500" }}>AFTER</div>
      </div>
    );
  };

  // Small Before/After Pair for Dropdown
  const SmallPair = ({ before, after, index }) => {
    return (
      <div style={{ 
        background: "#1e293b", 
        borderRadius: "12px", 
        overflow: "hidden",
        transition: "transform 0.2s"
      }}>
        <div style={{ 
          padding: "8px", 
          background: "#0f172a",
          borderBottom: "1px solid #334155",
          textAlign: "center"
        }}>
          <p style={{ color: "#2E8B57", fontSize: "11px", fontWeight: "600", margin: 0 }}>
            Project {index}
          </p>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "12px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <img 
              src={before} 
              alt="Before" 
              style={{ 
                width: "100%", 
                aspectRatio: "4/3", 
                objectFit: "cover", 
                borderRadius: "8px" 
              }} 
            />
            <p style={{ color: "#94a3b8", fontSize: "10px", margin: "6px 0 0" }}>Before</p>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <img 
              src={after} 
              alt="After" 
              style={{ 
                width: "100%", 
                aspectRatio: "4/3", 
                objectFit: "cover", 
                borderRadius: "8px" 
              }} 
            />
            <p style={{ color: "#94a3b8", fontSize: "10px", margin: "6px 0 0" }}>After</p>
          </div>
        </div>
      </div>
    );
  };

  // All projects with extra before/after pairs for dropdowns
  const projects = [
    { 
      id: 1, 
      name: "Brick Pavers & Patios", 
      before: "images/paver1.jpg", 
      after: "images/paver2.jpg",
      hasSecondSlider: true,
      secondBefore: "images/paver3.jpg",
      secondAfter: "images/paver4.jpg",
      extraPairs: [
        { before: "images/paver5.jpg", after: "images/paver6.jpg" },
        { before: "images/paver7.jpg", after: "images/paver8.jpg" },
        { before: "images/paver9.jpg", after: "images/paver10.jpg" }
      ]
    },
    { 
      id: 2, 
      name: "Lawn Transformations", 
      isImage: true,
      image: "images/lawn2.jpg",
      extraPairs: [
        { before: "images/lawn3.jpg", after: "images/lawn4.jpg" },
        { before: "images/lawn5.jpg", after: "images/lawn6.jpg" },
        { before: "images/lawn7.jpg", after: "images/lawn8.jpg" }
      ]
    },
    { 
      id: 3, 
      name: "Bed Clean Up", 
      before: "images/bedcleanup1.jpg", 
      after: "images/bedcleanup2.jpg",
      hasSecondSlider: false,
      extraPairs: [
        { before: "images/bedcleanup3.jpg", after: "images/bedcleanup4.jpg" },
        { before: "images/bedcleanup5.jpg", after: "images/bedcleanup6.jpg" },
        { before: "images/bedcleanup7.jpg", after: "images/bedcleanup8.jpg" }
      ]
    },
    { 
      id: 4, 
      name: "Bush & Hedge Trimming", 
      before: "images/bushtrim1.jpg", 
      after: "images/bushtrim2.jpg",
      hasSecondSlider: false,
      extraPairs: [
        { before: "images/bushtrim3.jpg", after: "images/bushtrim4.jpg" },
        { before: "images/bushtrim5.jpg", after: "images/bushtrim6.jpg" },
        { before: "images/bushtrim7.jpg", after: "images/bushtrim8.jpg" }
      ]
    },
    { 
      id: 5, 
      name: "Fall Clean Ups", 
      before: "images/fallcleanup1.jpg", 
      after: "images/fallcleanup2.jpg",
      hasSecondSlider: false,
      extraPairs: [
        { before: "images/fallcleanup3.jpg", after: "images/fallcleanup4.jpg" },
        { before: "images/fallcleanup5.jpg", after: "images/fallcleanup6.jpg" },
        { before: "images/fallcleanup7.jpg", after: "images/fallcleanup8.jpg" }
      ]
    },
    { 
      id: 6, 
      name: "Mulching & Bed Maintenance", 
      before: "images/mulch1.jpg", 
      after: "images/mulch2.jpg",
      hasSecondSlider: false,
      extraPairs: [
        { before: "images/mulch3.jpg", after: "images/mulch4.jpg" },
        { before: "images/mulch5.jpg", after: "images/mulch6.jpg" },
        { before: "images/mulch7.jpg", after: "images/mulch8.jpg" }
      ]
    },
    { 
      id: 7, 
      name: "Power Washing", 
      before: "images/powerwashing1.jpg", 
      after: "images/powerwashing2.jpg",
      hasSecondSlider: false,
      extraPairs: [
        { before: "images/powerwashing3.jpg", after: "images/powerwashing4.jpg" },
        { before: "images/powerwashing5.jpg", after: "images/powerwashing6.jpg" },
        { before: "images/powerwashing7.jpg", after: "images/powerwashing8.jpg" }
      ]
    }
  ];

  const SingleImage = ({ image, title }) => {
    return (
      <div style={{ 
        background: "#1a1a1a", 
        borderRadius: "16px", 
        overflow: "hidden",
        aspectRatio: "4/3",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
      }}>
        <img 
          src={image} 
          alt={title} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#0f172a", minHeight: "100vh" }}>
      
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
            <a href="/gallery" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "14px", fontWeight: "500" }}>Gallery</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#cbd5e1", fontSize: "14px", fontWeight: "500" }}>Contact</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "7px 20px", borderRadius: "30px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>📘 Facebook</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)", padding: "80px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "700", marginBottom: "16px", letterSpacing: "-0.5px" }}>Transform Your Outdoors</h1>
        <p style={{ fontSize: "18px", marginBottom: "28px", opacity: 0.95 }}>Professional Landscaping Services</p>
        <a href="/contact" style={{ background: "white", color: "#2E8B57", padding: "14px 38px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px", display: "inline-block", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>Free Estimate →</a>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "70px 20px 30px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", color: "white", margin: 0 }}>Our Work</h2>
        <div style={{ width: "60px", height: "4px", background: "#2E8B57", margin: "20px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#94a3b8", marginTop: "20px", fontSize: "16px" }}>See the difference we make</p>
      </div>

      {/* PROJECTS */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 16px 100px" }}>
        {projects.map(project => {
          const secondSliderId = project.hasSecondSlider ? project.id + 10 : null;
          const hasExtraPairs = project.extraPairs && project.extraPairs.length > 0;
          
          return (
            <div key={project.id} style={{ marginBottom: "180px" }}>
              
              <div style={{ marginBottom: "30px", borderLeft: "5px solid #2E8B57", paddingLeft: "18px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "8px" }}>
                  {project.isImage ? "Featured Work" : "Before & After Transformations"}
                </p>
              </div>
              
              {/* Main Content */}
              {project.isImage ? (
                <SingleImage image={project.image} title={project.name} />
              ) : (
                <>
                  <Slider before={project.before} after={project.after} sliderId={project.id} />
                  
                  {project.hasSecondSlider && (
                    <div style={{ marginTop: "80px" }}>
                      <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ fontSize: "20px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>Another Transformation</h4>
                        <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "6px" }}>Another project completed</p>
                      </div>
                      <Slider before={project.secondBefore} after={project.secondAfter} sliderId={secondSliderId} />
                    </div>
                  )}
                </>
              )}
              
              {/* DROPDOWN for Extra Before/After Pairs */}
              {hasExtraPairs && (
                <div style={{ marginTop: "50px" }}>
                  <button 
                    onClick={() => toggleExtras(project.id)} 
                    style={{ 
                      width: "100%", 
                      padding: "16px 20px", 
                      background: "#1e293b", 
                      border: "1px solid #334155", 
                      borderRadius: "14px", 
                      fontSize: "15px", 
                      fontWeight: "600",
                      color: "#2E8B57",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    <span>📸 More Before & After Photos ({project.extraPairs.length})</span>
                    <span style={{ 
                      transform: showMoreExtras[project.id] ? "rotate(180deg)" : "rotate(0deg)", 
                      transition: "transform 0.3s",
                      fontSize: "18px"
                    }}>
                      ▼
                    </span>
                  </button>
                  
                  {showMoreExtras[project.id] && (
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                      gap: "20px", 
                      marginTop: "25px" 
                    }}>
                      {project.extraPairs.map((pair, idx) => (
                        <SmallPair 
                          key={idx}
                          before={pair.before}
                          after={pair.after}
                          index={idx + 1}
                        />
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
      <div style={{ background: "#020617", color: "#64748b", padding: "45px 20px", textAlign: "center", fontSize: "13px", borderTop: "1px solid #1e293b" }}>
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ marginTop: "12px", fontSize: "12px" }}>Professional Landscaping Services</p>
      </div>
    </div>
  );
}
