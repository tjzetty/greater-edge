import { useState } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});

  const toggleDropdown = (id) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Define all your images for each category
  // Just add image names here and they'll auto-pair
  const projects = [
    { 
      id: 1, 
      name: "Brick Pavers & Patios",
      images: [
        "paver1.jpg", "paver2.jpg",  // Pair 1
        "paver3.jpg", "paver4.jpg",  // Pair 2
        "paver5.jpg", "paver6.jpg"   // Pair 3 (add more if you have)
      ]
    },
    { 
      id: 2, 
      name: "Lawn Transformations",
      isSingle: true,  // Single image mode
      image: "lawn2.jpg"
    },
    { 
      id: 3, 
      name: "Bed Clean Up",
      images: [
        "bedcleanup1.jpg", "bedcleanup2.jpg",
        "bedcleanup3.jpg", "bedcleanup4.jpg"
      ]
    },
    { 
      id: 4, 
      name: "Bush & Hedge Trimming",
      images: [
        "bushtrim1.jpg", "bushtrim2.jpg",
        "bushtrim3.jpg", "bushtrim4.jpg"
      ]
    },
    { 
      id: 5, 
      name: "Fall Clean Ups",
      images: [
        "fallcleanup1.jpg", "fallcleanup2.jpg",
        "fallcleanup3.jpg", "fallcleanup4.jpg"
      ]
    },
    { 
      id: 6, 
      name: "Mulching & Bed Maintenance",
      images: [
        "mulch1.jpg", "mulch2.jpg",
        "mulch3.jpg", "mulch4.jpg"
      ]
    },
    { 
      id: 7, 
      name: "Power Washing",
      images: [
        "powerwashing1.jpg", "powerwashing2.jpg",
        "powerwashing3.jpg", "powerwashing4.jpg"
      ]
    }
  ];

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
        <img src={`images/${after}`} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: `${pos}%`, height: "100%", overflow: "hidden" }}>
          <img src={`images/${before}`} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

  // Single Image Component
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
          src={`images/${image}`} 
          alt={title} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#0f172a", minHeight: "100vh" }}>
      
      {/* HEADER - From your Header component */}
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
          // Auto-pair images: 1&2, 3&4, 5&6
          const pairs = [];
          if (project.images) {
            for (let i = 0; i < project.images.length; i += 2) {
              if (project.images[i + 1]) {
                pairs.push({
                  before: project.images[i],
                  after: project.images[i + 1]
                });
              }
            }
          }
          
          // First 3 pairs are visible as sliders
          const visiblePairs = pairs.slice(0, 3);
          // Remaining pairs go to dropdown
          const extraPairs = pairs.slice(3);
          
          return (
            <div key={project.id} style={{ marginBottom: "180px" }}>
              
              <div style={{ marginBottom: "30px", borderLeft: "5px solid #2E8B57", paddingLeft: "18px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "8px" }}>
                  {project.isSingle ? "Featured Work" : "Before & After Transformations"}
                </p>
              </div>
              
              {/* Single Image Mode */}
              {project.isSingle && (
                <SingleImage image={project.image} title={project.name} />
              )}
              
              {/* Slider Mode - Show first 3 pairs */}
              {!project.isSingle && (
                <>
                  {visiblePairs.map((pair, idx) => (
                    <div key={idx} style={{ marginBottom: idx < visiblePairs.length - 1 ? "60px" : "0" }}>
                      {idx > 0 && (
                        <div style={{ marginBottom: "20px" }}>
                          <h4 style={{ fontSize: "18px", fontWeight: "500", color: "#2E8B57", margin: 0 }}>
                            Another Transformation
                          </h4>
                          <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "4px" }}>
                            Project {idx + 1}
                          </p>
                        </div>
                      )}
                      <Slider 
                        before={pair.before} 
                        after={pair.after} 
                        sliderId={`${project.id}_${idx}`} 
                      />
                    </div>
                  ))}
                </>
              )}
              
              {/* Dropdown for extra photos (pairs beyond first 3) */}
              {(extraPairs.length > 0 || (project.extras && project.extras.length > 0)) && (
                <div style={{ marginTop: "45px" }}>
                  <button 
                    onClick={() => toggleDropdown(project.id)} 
                    style={{ 
                      width: "100%", 
                      padding: "16px", 
                      background: "#1e293b", 
                      border: "1px solid #334155", 
                      borderRadius: "14px", 
                      fontSize: "15px", 
                      fontWeight: "500",
                      color: "#2E8B57",
                      cursor: "pointer",
                      fontFamily: "inherit"
                    }}
                  >
                    {showMore[project.id] ? "▲ Hide Additional Photos" : `▼ Show Additional Photos (${extraPairs.length + (project.extras?.length || 0)})`}
                  </button>
                  {showMore[project.id] && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", marginTop: "20px" }}>
                      {/* Show extra pairs as both before and after images */}
                      {extraPairs.map((pair, idx) => (
                        <div key={`extra_${idx}`} style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden" }}>
                          <div style={{ padding: "8px", borderBottom: "1px solid #334155" }}>
                            <p style={{ color: "#94a3b8", fontSize: "10px", margin: 0, textAlign: "center" }}>Project {visiblePairs.length + idx + 1}</p>
                          </div>
                          <div style={{ display: "flex", gap: "4px", padding: "8px" }}>
                            <div style={{ flex: 1 }}>
                              <img src={`images/${pair.before}`} alt="Before" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: "8px" }} />
                              <p style={{ color: "#64748b", fontSize: "9px", margin: "4px 0 0", textAlign: "center" }}>Before</p>
                            </div>
                            <div style={{ flex: 1 }}>
                              <img src={`images/${pair.after}`} alt="After" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: "8px" }} />
                              <p style={{ color: "#64748b", fontSize: "9px", margin: "4px 0 0", textAlign: "center" }}>After</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Show any legacy extras */}
                      {project.extras && project.extras.map((img, i) => (
                        <div key={`legacy_${i}`} style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
                          <img src={`images/${img}`} alt={`Extra ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
      <div style={{ background: "#020617", color: "#64748b", padding: "45px 20px", textAlign: "center", fontSize: "13px", borderTop: "1px solid #1e293b" }}>
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ marginTop: "12px", fontSize: "12px" }}>Professional Landscaping Services</p>
      </div>
    </div>
  );
}
