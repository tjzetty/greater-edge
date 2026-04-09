import { useState } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [showLawnGallery, setShowLawnGallery] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageTitle, setCurrentImageTitle] = useState("");
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, title, gallery, index) => {
    setCurrentImage(image);
    setCurrentImageTitle(title);
    setCurrentGallery(gallery);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < currentGallery.length) {
      setCurrentImage(currentGallery[nextIdx].src);
      setCurrentImageTitle(currentGallery[nextIdx].title);
      setCurrentIndex(nextIdx);
    }
  };

  const prevImage = () => {
    const prevIdx = currentIndex - 1;
    if (prevIdx >= 0) {
      setCurrentImage(currentGallery[prevIdx].src);
      setCurrentImageTitle(currentGallery[prevIdx].title);
      setCurrentIndex(prevIdx);
    }
  };

  if (typeof window !== "undefined") {
    window.onkeydown = (e) => {
      if (lightboxOpen) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeLightbox();
      }
    };
  }

  const Slider = ({ before, after, sliderId }) => {
    const [pos, setPos] = useState(50);
    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#1a1a1a", borderRadius: "16px", overflow: "hidden" }}>
        <img src={after} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          onClick={() => openLightbox(after, "After", [], 0)} />
        <div style={{ position: "absolute", top: 0, left: 0, width: `${pos}%`, height: "100%", overflow: "hidden" }}>
          <img src={before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
            onClick={() => openLightbox(before, "Before", [], 0)} />
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "60px", transform: "translateX(-50%)", cursor: "ew-resize", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", touchAction: "none" }}
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
          }}>
          <div style={{ background: "white", padding: "10px 16px", borderRadius: "40px", fontSize: "13px", fontWeight: "bold", color: "#1e293b", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", pointerEvents: "none" }}>◀ DRAG ▶</div>
        </div>
        <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500" }}>BEFORE</div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500" }}>AFTER</div>
      </div>
    );
  };

  const SmallPair = ({ before, after, index, projectName }) => {
    const gallery = [
      { src: before, title: `${projectName} - Before ${index}` },
      { src: after, title: `${projectName} - After ${index}` }
    ];
    return (
      <div style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "8px", background: "#0f172a", borderBottom: "1px solid #334155", textAlign: "center" }}>
          <p style={{ color: "#2E8B57", fontSize: "11px", fontWeight: "600", margin: 0 }}>Project {index}</p>
        </div>
        <div style={{ display: "flex", gap: "4px", padding: "12px" }}>
          <div style={{ flex: 1, textAlign: "center", cursor: "pointer" }}>
            <img src={before} alt="Before" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "8px" }} 
              onClick={() => openLightbox(before, `${projectName} - Before ${index}`, gallery, 0)} />
            <p style={{ color: "#94a3b8", fontSize: "10px", margin: "6px 0 0" }}>Before</p>
          </div>
          <div style={{ flex: 1, textAlign: "center", cursor: "pointer" }}>
            <img src={after} alt="After" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "8px" }} 
              onClick={() => openLightbox(after, `${projectName} - After ${index}`, gallery, 1)} />
            <p style={{ color: "#94a3b8", fontSize: "10px", margin: "6px 0 0" }}>After</p>
          </div>
        </div>
      </div>
    );
  };

  const projects = [
    { id: 1, name: "Brick Pavers & Patios", pairs: [
      { before: "images/paver1.jpg", after: "images/paver2.jpg" },
      { before: "images/paver3.jpg", after: "images/paver4.jpg" },
      { before: "images/paver5.jpg", after: "images/paver6.jpg" },
      { before: "images/paver7.jpg", after: "images/paver8.jpg" }
    ]},
    { 
      id: 2, 
      name: "Great Cuts", 
      isLawn: true,
      mainImage: "images/lawn1.jpg",
      extraImages: ["images/lawn2.jpg", "images/lawn3.jpg", "images/lawn4.jpg", "images/lawn5.jpg", "images/lawn6.jpg"]
    },
    { id: 3, name: "Bed Clean Up", pairs: [
      { before: "images/bedcleanup1.jpg", after: "images/bedcleanup2.jpg" },
      { before: "images/bedcleanup3.jpg", after: "images/bedcleanup4.jpg" },
      { before: "images/bedcleanup5.jpg", after: "images/bedcleanup6.jpg" },
      { before: "images/bedcleanup7.jpg", after: "images/bedcleanup8.jpg" }
    ]},
    { id: 4, name: "Bush & Hedge Trimming", pairs: [
      { before: "images/bushtrim1.jpg", after: "images/bushtrim2.jpg" },
      { before: "images/bushtrim3.jpg", after: "images/bushtrim4.jpg" },
      { before: "images/bushtrim5.jpg", after: "images/bushtrim6.jpg" },
      { before: "images/bushtrim7.jpg", after: "images/bushtrim8.jpg" }
    ]},
    { id: 5, name: "Fall Clean Ups", pairs: [
      { before: "images/fallcleanup1.jpg", after: "images/fallcleanup2.jpg" },
      { before: "images/fallcleanup3.jpg", after: "images/fallcleanup4.jpg" },
      { before: "images/fallcleanup5.jpg", after: "images/fallcleanup6.jpg" },
      { before: "images/fallcleanup7.jpg", after: "images/fallcleanup8.jpg" }
    ]},
    { id: 6, name: "Mulching & Bed Maintenance", pairs: [
      { before: "images/mulch1.jpg", after: "images/mulch2.jpg" },
      { before: "images/mulch3.jpg", after: "images/mulch4.jpg" },
      { before: "images/mulch5.jpg", after: "images/mulch6.jpg" },
      { before: "images/mulch7.jpg", after: "images/mulch8.jpg" }
    ]},
    { id: 7, name: "Power Washing", pairs: [
      { before: "images/powerwashing1.jpg", after: "images/powerwashing2.jpg" },
      { before: "images/powerwashing3.jpg", after: "images/powerwashing4.jpg" },
      { before: "images/powerwashing5.jpg", after: "images/powerwashing6.jpg" },
      { before: "images/powerwashing7.jpg", after: "images/powerwashing8.jpg" }
    ]}
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#0f172a", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, background: "#ffffff", padding: "16px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <img src="images/logo.jpg" alt="Greater Edge Landscaping" style={{ height: "60px", width: "auto", borderRadius: "12px" }} />
          <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="/" style={{ textDecoration: "none", color: "#1e293b", fontSize: "15px", fontWeight: "500", letterSpacing: "0.3px", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#2E8B57"} onMouseLeave={(e) => e.target.style.color = "#1e293b"}>Home</a>
            <a href="/gallery" style={{ textDecoration: "none", color: "#1e293b", fontSize: "15px", fontWeight: "500", letterSpacing: "0.3px", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#2E8B57"} onMouseLeave={(e) => e.target.style.color = "#1e293b"}>Gallery</a>
            <a href="/contact" style={{ textDecoration: "none", color: "#1e293b", fontSize: "15px", fontWeight: "500", letterSpacing: "0.3px", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#2E8B57"} onMouseLeave={(e) => e.target.style.color = "#1e293b"}>Contact Us</a>
            <a href="https://www.facebook.com/profile.php?id=61574004541526" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "white", padding: "8px 24px", borderRadius: "40px", textDecoration: "none", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.target.style.background = "#166fe5"; e.target.style.transform = "translateY(-1px)" }} onMouseLeave={(e) => { e.target.style.background = "#1877F2"; e.target.style.transform = "translateY(0)" }}>📘 Facebook</a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.95)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <button onClick={closeLightbox} style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "30px", width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 2001 }}>✕</button>
          {currentIndex > 0 && <button onClick={prevImage} style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "40px", width: "60px", height: "60px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 2001 }}>◀</button>}
          {currentIndex < currentGallery.length - 1 && <button onClick={nextImage} style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "40px", width: "60px", height: "60px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 2001 }}>▶</button>}
          <img src={currentImage} alt={currentImageTitle} style={{ maxWidth: "90%", maxHeight: "80%", objectFit: "contain", borderRadius: "8px" }} />
          <div style={{ position: "absolute", bottom: "30px", left: 0, right: 0, textAlign: "center", color: "white", fontSize: "16px", background: "rgba(0,0,0,0.5)", padding: "10px", margin: "0 auto", width: "fit-content", borderRadius: "30px" }}>{currentImageTitle} ({currentIndex + 1} / {currentGallery.length})</div>
        </div>
      )}

      {/* HERO SECTION */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "100px 20px", textAlign: "center" }}>
        <img src="images/logo.jpg" alt="Greater Edge Landscaping" style={{ width: "100%", maxWidth: "500px", height: "auto", marginBottom: "30px", borderRadius: "24px", boxShadow: "0 30px 50px rgba(0,0,0,0.3)" }} />
        <h1 style={{ fontSize: "52px", fontWeight: "800", color: "white", marginBottom: "16px" }}>Greater Edge <span style={{ color: "#2E8B57" }}>Landscaping</span></h1>
        <p style={{ fontSize: "22px", color: "#94a3b8", marginBottom: "32px" }}>Family Owned & Operated</p>
        <a href="/contact" style={{ background: "#2E8B57", color: "white", padding: "14px 42px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "18px", display: "inline-block", transition: "all 0.2s" }} onMouseEnter={(e) => e.target.style.background = "#236b45"} onMouseLeave={(e) => e.target.style.background = "#2E8B57"}>Free Estimate →</a>
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
          if (project.isLawn) {
            // Lawn section: main image + dropdown gallery (no before/after)
            const allLawnImages = [project.mainImage, ...project.extraImages];
            const galleryItems = allLawnImages.map((img, idx) => ({ src: img, title: `${project.name} - Photo ${idx + 1}` }));
            return (
              <div key={project.id} style={{ marginBottom: "180px" }}>
                <div style={{ marginBottom: "30px", borderLeft: "5px solid #2E8B57", paddingLeft: "18px" }}>
                  <h3 style={{ fontSize: "28px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "8px" }}>Beautiful, healthy lawns</p>
                </div>
                {/* Main large image */}
                <div style={{ background: "#1e293b", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", marginBottom: "30px" }}>
                  <img src={project.mainImage} alt="Main Lawn" style={{ width: "100%", height: "100%", objectFit: "cover" }} onClick={() => openLightbox(project.mainImage, `${project.name} - Featured`, galleryItems, 0)} />
                </div>
                {/* Dropdown for extra images */}
                {project.extraImages.length > 0 && (
                  <div>
                    <button onClick={() => setShowLawnGallery(!showLawnGallery)} style={{ width: "100%", padding: "16px 20px", background: "#1e293b", border: "1px solid #334155", borderRadius: "14px", fontSize: "15px", fontWeight: "600", color: "#2E8B57", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>📸 More Lawn Photos ({project.extraImages.length})</span>
                      <span style={{ transform: showLawnGallery ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: "18px" }}>▼</span>
                    </button>
                    {showLawnGallery && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginTop: "25px" }}>
                        {project.extraImages.map((img, idx) => (
                          <div key={idx} style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" }}>
                            <img src={img} alt={`Lawn ${idx + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} onClick={() => openLightbox(img, `${project.name} - Photo ${idx + 2}`, galleryItems, idx + 1)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          }
          
          // Regular sections with before/after sliders
          const mainPair = project.pairs[0];
          const extraPairs = project.pairs.slice(1);
          return (
            <div key={project.id} style={{ marginBottom: "180px" }}>
              <div style={{ marginBottom: "30px", borderLeft: "5px solid #2E8B57", paddingLeft: "18px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: "600", color: "white", margin: 0 }}>{project.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "8px" }}>Before & After Transformations</p>
              </div>
              <Slider before={mainPair.before} after={mainPair.after} sliderId={`${project.id}_main`} />
              {extraPairs.length > 0 && (
                <div style={{ marginTop: "50px" }}>
                  <button onClick={() => setShowMore(prev => ({ ...prev, [project.id]: !prev[project.id] }))} style={{ width: "100%", padding: "16px 20px", background: "#1e293b", border: "1px solid #334155", borderRadius: "14px", fontSize: "15px", fontWeight: "600", color: "#2E8B57", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>📸 More Before & After Photos ({extraPairs.length})</span>
                    <span style={{ transform: showMore[project.id] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: "18px" }}>▼</span>
                  </button>
                  {showMore[project.id] && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "25px" }}>
                      {extraPairs.map((pair, idx) => (
                        <SmallPair key={idx} before={pair.before} after={pair.after} index={idx + 2} projectName={project.name} />
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
        <p style={{ marginTop: "12px", fontSize: "12px" }}>Family Owned & Operated</p>
      </div>
    </div>
  );
}
