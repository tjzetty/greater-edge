import { useState, useEffect, useRef } from "preact/hooks";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [showExtraSingles, setShowExtraSingles] = useState({});
  const [showLawnGallery, setShowLawnGallery] = useState(false);
  const [showCustomGallery, setShowCustomGallery] = useState(false);
  const [showRoadGallery, setShowRoadGallery] = useState(false);
  const [showRockGallery, setShowRockGallery] = useState(false);
  const [showGradingGallery, setShowGradingGallery] = useState(false);
  const [showMaterialGallery, setShowMaterialGallery] = useState(false);
  const [showSeedingGallery, setShowSeedingGallery] = useState(false);
  const [showCobbleGallery, setShowCobbleGallery] = useState(false);
  const [showMulchGallery, setShowMulchGallery] = useState(false);
  const [showTreeGallery, setShowTreeGallery] = useState(false);
  const [showPlantingGallery, setShowPlantingGallery] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageTitle, setCurrentImageTitle] = useState("");
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [pillOpen, setPillOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const pillTimeoutRef = useRef(null);

  // Lightbox functions
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

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxOpen) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, currentIndex, currentGallery]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const sections = document.querySelectorAll("[id^='section-']");
      let current = "";
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = sections[i].getAttribute("id")?.replace("section-", "");
          break;
        }
      }
      setCurrentSection(current || "");
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setPillOpen(false);
      if (pillTimeoutRef.current) clearTimeout(pillTimeoutRef.current);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pill hover logic
  const handlePillMouseEnter = () => {
    if (pillTimeoutRef.current) clearTimeout(pillTimeoutRef.current);
    setPillOpen(true);
  };
  const handlePillMouseLeave = () => {
    pillTimeoutRef.current = setTimeout(() => {
      setPillOpen(false);
    }, 300);
  };
  const handleMenuMouseEnter = () => {
    if (pillTimeoutRef.current) clearTimeout(pillTimeoutRef.current);
    setPillOpen(true);
  };
  const handleMenuMouseLeave = () => {
    pillTimeoutRef.current = setTimeout(() => {
      setPillOpen(false);
    }, 300);
  };

  // ---------- Slider Components ----------
  const OriginalSlider = ({ before, after, sliderId }) => {
    const [pos, setPos] = useState(50);
    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#111827", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
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

  const BlurSlider = ({ before, after, sliderId }) => {
    const [pos, setPos] = useState(50);
    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#111827", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${after})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.05)",
          }}
        />
        <img
          src={after}
          alt="After"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            cursor: "pointer",
          }}
          onClick={() => openLightbox(after, "After", [], 0)}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${pos}%`,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${before})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(12px)",
              transform: "scale(1.05)",
            }}
          />
          <img
            src={before}
            alt="Before"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() => openLightbox(before, "Before", [], 0)}
          />
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
            touchAction: "none",
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
          <div
            style={{
              background: "white",
              padding: "10px 16px",
              borderRadius: "40px",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#1e293b",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              pointerEvents: "none",
            }}
          >
            ◀ DRAG ▶
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500" }}>BEFORE</div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "500" }}>AFTER</div>
      </div>
    );
  };

  const getSlider = (projectId, before, after, sliderId) => {
    if (projectId === 1 || projectId === 3 || projectId === 5) {
      return <OriginalSlider before={before} after={after} sliderId={sliderId} />;
    }
    return <BlurSlider before={before} after={after} sliderId={sliderId} />;
  };

  const SmallPair = ({ before, after, index, projectName }) => {
    const gallery = [
      { src: before, title: `${projectName} - Before ${index}` },
      { src: after, title: `${projectName} - After ${index}` }
    ];
    return (
      <div style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", border: "1px solid #334155", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ padding: "8px", background: "#0f172a", borderBottom: "1px solid #334155", textAlign: "center" }}>
          <p style={{ color: "#4ade80", fontSize: "11px", fontWeight: "600", margin: 0 }}>Project {index}</p>
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

  const ExtraSingleImage = ({ src, index, projectName, gallery }) => {
    return (
      <div style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", border: "1px solid #334155", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "transform 0.2s" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        onClick={() => openLightbox(src, `${projectName} - Extra Photo ${index}`, gallery, index - 1)}>
        <img src={src} alt={`${projectName} extra ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  };

  // ---------- PROJECTS ----------
  const projects = [
    { id: 1, name: "Brick Pavers & Patios", slug: "brick-pavers", pairs: [
      { before: "images/paver1.jpg", after: "images/paver2.jpg" },
      { before: "images/paver3.jpg", after: "images/paver4.jpg" },
      { before: "images/paver5.jpg", after: "images/paver6.jpg" },
      { before: "images/paver7.jpg", after: "images/paver8.jpg" }
    ], extraSingles: [
      "images/paver9.jpg", "images/paver10.jpg", "images/paver11.jpg", "images/paver12.jpg",
      "images/paver13.jpg", "images/paver14.jpg", "images/paver15.jpg", "images/paver16.jpg",
      "images/paver17.jpg", "images/paver18.jpg"
    ] },
    { id: 2, name: "Great Cuts", slug: "great-cuts", isLawn: true, mainImage: "images/lawn2.jpg", 
      extraImages: ["images/lawn3.jpg", "images/lawn4.jpg", "images/lawn5.jpg", "images/lawn6.jpg", "images/lawn7.jpg", "images/lawn8.jpg", "images/lawn9.jpg", "images/lawn10.jpg", "images/lawn11.jpg", "images/lawn12.jpg", "images/lawn13.jpg"] },
    { id: 9, name: "Custom Landscaping", slug: "custom-landscaping", isCustomGallery: true, mainImage: "images/custom1.jpg", 
      extraImages: ["images/custom2.jpg", "images/custom3.jpg"] },
    { id: 10, name: "Road & Turnaround", slug: "road-turnaround", isRoadGallery: true, mainImage: "images/road1.jpg", 
      extraImages: ["images/road2.jpg", "images/road3.jpg", "images/road4.jpg", "images/road5.jpg", "images/road6.jpg", "images/road7.jpg", "images/road8.jpg", "images/road9.jpg"] },
    { id: 15, name: "Rock Wall / Retaining Walls", slug: "rock-walls", isRockGallery: true, mainImage: "images/rockwall1.jpg", 
      extraImages: ["images/rockwall2.jpg", "images/rockwall3.jpg", "images/rockwall4.jpg", "images/rockwall5.jpg", "images/rockwall6.jpg"] },
    { id: 16, name: "Grading", slug: "grading", isGradingGallery: true, mainImage: "images/grading1.jpg", 
      extraImages: [
        "images/grading2.jpg", "images/grading3.jpg", "images/grading4.jpg", "images/grading5.jpg",
        "images/grading6.jpg", "images/grading7.jpg", "images/grading8.jpg", "images/grading9.jpg",
        "images/grading10.jpg", "images/grading11.jpg"
      ] },
    { id: 14, name: "Material Delivery & Spreading", slug: "material-delivery", isMaterialGallery: true, mainImage: "images/material1.jpg", 
      extraImages: ["images/material2.jpg", "images/material3.jpg"] },
    { id: 3, name: "Bed Clean Up", slug: "bed-clean-up", pairs: [
      { before: "images/bedcleanup1.jpg", after: "images/bedcleanup2.jpg" },
      { before: "images/bedcleanup3.jpg", after: "images/bedcleanup4.jpg" },
      { before: "images/bedcleanup5.jpg", after: "images/bedcleanup6.jpg" },
      { before: "images/bedcleanup7.jpg", after: "images/bedcleanup8.jpg" }
    ], extraSingles: ["images/bedcleanup9.jpg", "images/bedcleanup10.jpg", "images/bedcleanup11.jpg"] },
    { id: 12, name: "Cobble Stone Beds", slug: "cobble-stone-beds", isCobbleGallery: true, mainImage: "images/stonebed1.jpg", 
      extraImages: ["images/stonebed2.jpg", "images/stonebed3.jpg", "images/stonebed4.jpg", "images/stonebed5.jpg"] },
    { id: 4, name: "Bush & Hedge Trimming", slug: "bush-hedge-trimming", pairs: [
      { before: "images/bushtrim1.jpg", after: "images/bushtrim2.jpg" },
      { before: "images/bushtrim3.jpg", after: "images/bushtrim4.jpg" },
      { before: "images/bushtrim5.jpg", after: "images/bushtrim6.jpg" },
      { before: "images/bushtrim7.jpg", after: "images/bushtrim8.jpg" }
    ], extraSingles: ["images/bushtrim9.jpg", "images/bushtrim10.jpg", "images/bushtrim11.jpg"] },
    { id: 13, name: "Mulching", slug: "mulching", isMulchGallery: true, mainImage: "images/mulch1.jpg", 
      extraImages: ["images/mulch2.jpg", "images/mulch3.jpg", "images/mulch4.jpg", "images/mulch5.jpg"] },
    { id: 5, name: "Fall Clean Ups", slug: "fall-clean-ups", pairs: [
      { before: "images/fallcleanup1.jpg", after: "images/fallcleanup2.jpg" },
      { before: "images/fallcleanup3.jpg", after: "images/fallcleanup4.jpg" },
      { before: "images/fallcleanup5.jpg", after: "images/fallcleanup6.jpg" },
      { before: "images/fallcleanup7.jpg", after: "images/fallcleanup8.jpg" }
    ], extraSingles: [
      "images/fallcleanup9.jpg", "images/fallcleanup10.jpg", "images/fallcleanup11.jpg", "images/fallcleanup12.jpg",
      "images/fallcleanup13.jpg", "images/fallcleanup14.jpg", "images/fallcleanup15.jpg", "images/fallcleanup16.jpg",
      "images/fallcleanup17.jpg", "images/fallcleanup18.jpg", "images/fallcleanup19.jpg", "images/fallcleanup20.jpg"
    ] },
    { id: 6, name: "Tree Removal", slug: "tree-removal", isTreeGallery: true, mainImage: "images/treer1.jpg", 
      extraImages: ["images/treer2.jpg"] },
    { id: 7, name: "Tree Planting", slug: "tree-planting", isPlantingGallery: true, mainImage: "images/treep1.jpg", 
      extraImages: ["images/treep2.jpg", "images/treep3.jpg", "images/treep4.jpg", "images/treep5.jpg"] },
    { id: 8, name: "Power Washing", slug: "power-washing", pairs: [
      { before: "images/powerwashing1.jpg", after: "images/powerwashing2.jpg" },
      { before: "images/powerwashing3.jpg", after: "images/powerwashing4.jpg" },
      { before: "images/powerwashing5.jpg", after: "images/powerwashing6.jpg" },
      { before: "images/powerwashing7.jpg", after: "images/powerwashing8.jpg" }
    ], extraSingles: [] },
    { id: 11, name: "Seeding & Hydro-Seeding", slug: "seeding-hydro-seeding", isSeedingGallery: true, mainImage: "images/seeding1.jpg", 
      extraImages: ["images/seeding2.jpg", "images/seeding3.jpg", "images/seeding4.jpg", "images/seeding5.jpg", "images/seeding6.jpg", "images/seeding7.jpg", "images/seeding8.jpg", "images/seeding9.jpg"] }
  ];

  const navItems = projects.map(p => ({ name: p.name, slug: p.slug }));
  const getCurrentSectionName = () => {
    const item = navItems.find(i => i.slug === currentSection);
    return item ? item.name : "Menu";
  };

  // Helper to render any gallery section
  const renderGallery = (project, showState, setShowState) => {
    const allImages = [project.mainImage, ...project.extraImages];
    const galleryItems = allImages.map((img, idx) => ({ src: img, title: `${project.name} - Photo ${idx + 1}` }));
    return (
      <div key={project.id} id={`section-${project.slug}`} style={{ marginBottom: "50px", scrollMarginTop: "80px" }}>
        <div style={{ marginBottom: "20px", borderLeft: "5px solid #4ade80", paddingLeft: "18px" }}>
          <h3 style={{ fontSize: "26px", fontWeight: "600", color: "white", margin: 0, letterSpacing: "-0.3px" }}>{project.name}</h3>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "5px" }}>{project.subtitle || "Gallery"}</p>
        </div>
        <div style={{ background: "#111827", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", marginBottom: "20px", border: "1px solid #334155", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
          <img src={project.mainImage} alt="Main" style={{ width: "100%", height: "100%", objectFit: "cover" }} onClick={() => openLightbox(project.mainImage, `${project.name} - Featured`, galleryItems, 0)} />
        </div>
        <div>
          <button onClick={() => setShowState(!showState)} style={{ width: "100%", padding: "14px 20px", background: "#1e293b", border: "1px solid #334155", borderRadius: "14px", fontSize: "14px", fontWeight: "600", color: "#4ade80", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#4ade80"; }}>
            <span>📸 More Photos ({project.extraImages.length})</span>
            <span style={{ transform: showState ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: "16px" }}>▼</span>
          </button>
          {showState && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
                {project.extraImages.map((img, idx) => (
                  <div key={idx} style={{ background: "#1e293b", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer", border: "1px solid #334155", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <img src={img} alt={`Extra ${idx + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} onClick={() => openLightbox(img, `${project.name} - Photo ${idx + 2}`, galleryItems, idx + 1)} />
                  </div>
                ))}
              </div>
              <button onClick={() => setShowState(false)} style={{ marginTop: "20px", width: "100%", padding: "10px", background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", color: "#94a3b8", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}>
                ▲ Collapse
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0f1a", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={{ background: "linear-gradient(135deg, #0a0f1a 0%, #0f172a 100%)", padding: "100px 20px", textAlign: "center" }}>
        <img src="images/logo.jpg" alt="Greater Edge Landscaping" style={{ width: "100%", maxWidth: "500px", height: "auto", marginBottom: "30px", borderRadius: "24px", boxShadow: "0 30px 50px rgba(0,0,0,0.3)" }} />
        <h1 style={{ fontSize: "52px", fontWeight: "800", color: "white", marginBottom: "16px" }}>Greater Edge <span style={{ color: "#4ade80" }}>Landscaping</span></h1>
        <p style={{ fontSize: "22px", color: "#94a3b8", marginBottom: "32px" }}>Family Owned & Operated</p>
        <a href="/contact" style={{ background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)", color: "#0f172a", padding: "14px 42px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "18px", display: "inline-block", boxShadow: "0 4px 15px rgba(74,222,128,0.3)", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>Free Estimate →</a>
      </div>

      {/* Our Work Heading */}
      <div style={{ textAlign: "center", padding: "70px 20px 30px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", color: "white", margin: 0, letterSpacing: "-0.5px" }}>Our Work</h2>
        <div style={{ width: "60px", height: "4px", background: "#4ade80", margin: "20px auto 0", borderRadius: "2px" }}></div>
        <p style={{ color: "#94a3b8", marginTop: "20px", fontSize: "16px" }}>See the difference we make</p>
      </div>

      {/* Horizontal Navigation Bar */}
      <style>{`
        .nav-scrollbar {
          scrollbar-width: auto;
          scrollbar-color: #4ade80 #1e293b;
        }
        .nav-scrollbar::-webkit-scrollbar {
          height: 20px;
        }
        .nav-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .nav-scrollbar::-webkit-scrollbar-thumb {
          background: #4ade80;
          border-radius: 10px;
        }
        .nav-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #22c55e;
        }
        @media (max-width: 768px) {
          .nav-button {
            font-size: 16px !important;
            padding: 8px 16px !important;
          }
        }
      `}</style>
      <div className="nav-scrollbar" style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "0 16px 24px 16px",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}>
        <div style={{
          display: "inline-flex",
          gap: "16px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          padding: "16px 24px",
          borderRadius: "60px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          border: "1px solid #334155",
        }}>
          {navItems.map(item => (
            <button
              key={item.slug}
              onClick={() => scrollToSection(item.slug)}
              className="nav-button"
              style={{
                background: "transparent",
                border: "none",
                color: "#cbd5e1",
                fontSize: "18px",
                fontWeight: "600",
                padding: "8px 20px",
                borderRadius: "40px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#cbd5e1"; }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 16px 80px" }}>
        {projects.map(project => {
          // Gallery sections
          if (project.isLawn) return renderGallery({ ...project, subtitle: "Beautiful, healthy lawns" }, showLawnGallery, setShowLawnGallery);
          if (project.isCustomGallery) return renderGallery({ ...project, subtitle: "Creative landscaping designs" }, showCustomGallery, setShowCustomGallery);
          if (project.isRoadGallery) return renderGallery({ ...project, subtitle: "Driveways & road enhancements" }, showRoadGallery, setShowRoadGallery);
          if (project.isRockGallery) return renderGallery({ ...project, subtitle: "Durable rock & retaining walls" }, showRockGallery, setShowRockGallery);
          if (project.isGradingGallery) return renderGallery({ ...project, subtitle: "Professional grading services" }, showGradingGallery, setShowGradingGallery);
          if (project.isMaterialGallery) return renderGallery({ ...project, subtitle: "Reliable material delivery & spreading" }, showMaterialGallery, setShowMaterialGallery);
          if (project.isCobbleGallery) return renderGallery({ ...project, subtitle: "Elegant cobble stone beds" }, showCobbleGallery, setShowCobbleGallery);
          if (project.isMulchGallery) return renderGallery({ ...project, subtitle: "Quality mulching services" }, showMulchGallery, setShowMulchGallery);
          if (project.isTreeGallery) return renderGallery({ ...project, subtitle: "Professional tree removal" }, showTreeGallery, setShowTreeGallery);
          if (project.isPlantingGallery) return renderGallery({ ...project, subtitle: "Professional tree planting" }, showPlantingGallery, setShowPlantingGallery);
          if (project.isSeedingGallery) return renderGallery({ ...project, subtitle: "Professional seeding & hydro‑seeding" }, showSeedingGallery, setShowSeedingGallery);

          // Slider sections
          if (project.pairs) {
            const mainPair = project.pairs[0];
            const extraPairs = project.pairs.slice(1);
            const extraSingles = project.extraSingles || [];
            const singlesGallery = extraSingles.map((src, idx) => ({ src, title: `${project.name} - Extra Photo ${idx + 1}` }));
            return (
              <div key={project.id} id={`section-${project.slug}`} style={{ marginBottom: "50px", scrollMarginTop: "80px" }}>
                <div style={{ marginBottom: "20px", borderLeft: "5px solid #4ade80", paddingLeft: "18px" }}>
                  <h3 style={{ fontSize: "26px", fontWeight: "600", color: "white", margin: 0, letterSpacing: "-0.3px" }}>{project.name}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "5px" }}>Before & After Transformations</p>
                </div>
                {getSlider(project.id, mainPair.before, mainPair.after, `${project.id}_main`)}
                {extraPairs.length > 0 && (
                  <div style={{ marginTop: "40px" }}>
                    <button onClick={() => setShowMore(prev => ({ ...prev, [project.id]: !prev[project.id] }))} style={{ width: "100%", padding: "14px 20px", background: "#1e293b", border: "1px solid #334155", borderRadius: "14px", fontSize: "14px", fontWeight: "600", color: "#4ade80", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#4ade80"; }}>
                      <span>📸 More Before & After Photos ({extraPairs.length})</span>
                      <span style={{ transform: showMore[project.id] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: "16px" }}>▼</span>
                    </button>
                    {showMore[project.id] && (
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                          {extraPairs.map((pair, idx) => (
                            <SmallPair key={idx} before={pair.before} after={pair.after} index={idx + 2} projectName={project.name} />
                          ))}
                        </div>
                        <button onClick={() => setShowMore(prev => ({ ...prev, [project.id]: false }))} style={{ marginTop: "20px", width: "100%", padding: "10px", background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", color: "#94a3b8", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}>
                          ▲ Collapse
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div style={{ marginTop: extraPairs.length > 0 ? "40px" : "50px" }}>
                  <button onClick={() => setShowExtraSingles(prev => ({ ...prev, [project.id]: !prev[project.id] }))} style={{ width: "100%", padding: "14px 20px", background: "#1e293b", border: "1px solid #334155", borderRadius: "14px", fontSize: "14px", fontWeight: "600", color: "#4ade80", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#4ade80"; }}>
                    <span>🖼️ Additional Project Photos {extraSingles.length > 0 ? `(${extraSingles.length})` : "(coming soon)"}</span>
                    <span style={{ transform: showExtraSingles[project.id] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: "16px" }}>▼</span>
                  </button>
                  {showExtraSingles[project.id] && (
                    <div style={{ marginTop: "20px" }}>
                      {extraSingles.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
                          {extraSingles.map((src, idx) => (
                            <ExtraSingleImage key={idx} src={src} index={idx + 1} projectName={project.name} gallery={singlesGallery} />
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: "center", padding: "30px", background: "#1e293b", borderRadius: "12px", color: "#94a3b8" }}>
                          No extra photos yet. Check back soon!
                        </div>
                      )}
                      <button onClick={() => setShowExtraSingles(prev => ({ ...prev, [project.id]: false }))} style={{ marginTop: "20px", width: "100%", padding: "10px", background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", color: "#94a3b8", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}>
                        ▲ Collapse
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Footer */}
      <div style={{ background: "#020617", color: "#64748b", padding: "45px 20px", textAlign: "center", fontSize: "13px", borderTop: "1px solid #1e293b", position: "relative" }}>
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
        <p style={{ marginTop: "12px", fontSize: "12px" }}>Family Owned & Operated</p>
      </div>

      {/* Back to Top Button - responsive */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
            color: "#0f172a",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "32px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.2s",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          ↑
        </button>
      )}

      {/* Floating Navigation Pill */}
      <div style={{ position: "fixed", bottom: "30px", left: "30px", zIndex: 100 }}>
        <button
          onClick={() => setPillOpen(!pillOpen)}
          onMouseEnter={handlePillMouseEnter}
          onMouseLeave={handlePillMouseLeave}
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            border: "1px solid #334155",
            borderRadius: "40px",
            padding: "10px 20px",
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span>📍</span>
          <span>{getCurrentSectionName()}</span>
          <span style={{ transform: pillOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▼</span>
        </button>
        {pillOpen && (
          <div
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "0",
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: "1px solid #334155",
              borderRadius: "20px",
              padding: "10px 0",
              minWidth: "200px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              backdropFilter: "blur(8px)",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {navItems.map(item => (
              <button
                key={item.slug}
                onClick={() => scrollToSection(item.slug)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 20px",
                  background: "transparent",
                  border: "none",
                  color: currentSection === item.slug ? "#4ade80" : "#cbd5e1",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#4ade80"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = currentSection === item.slug ? "#4ade80" : "#cbd5e1"; }}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <style>{`
        @media (max-width: 768px) {
          .lightbox-close {
            width: 60px !important;
            height: 60px !important;
            font-size: 36px !important;
            top: 16px !important;
            right: 16px !important;
          }
          .lightbox-arrow {
            width: 60px !important;
            height: 60px !important;
            font-size: 48px !important;
          }
          .pill-button {
            padding: 8px 16px !important;
            font-size: 12px !important;
          }
          .back-to-top {
            width: 50px !important;
            height: 50px !important;
            font-size: 28px !important;
          }
        }
      `}</style>
      {lightboxOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.95)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <button onClick={closeLightbox} className="lightbox-close" style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "30px", width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 2001 }}>✕</button>
          {currentIndex > 0 && <button onClick={prevImage} className="lightbox-arrow" style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "40px", width: "60px", height: "60px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 2001 }}>◀</button>}
          {currentIndex < currentGallery.length - 1 && <button onClick={nextImage} className="lightbox-arrow" style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "40px", width: "60px", height: "60px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 2001 }}>▶</button>}
          <img src={currentImage} alt={currentImageTitle} style={{ maxWidth: "90%", maxHeight: "80%", objectFit: "contain", borderRadius: "8px" }} />
          <div style={{ position: "absolute", bottom: "30px", left: 0, right: 0, textAlign: "center", color: "white", fontSize: "16px", background: "rgba(0,0,0,0.5)", padding: "10px", margin: "0 auto", width: "fit-content", borderRadius: "30px" }}>{currentImageTitle} ({currentIndex + 1} / {currentGallery.length})</div>
        </div>
      )}
    </div>
  );
}
