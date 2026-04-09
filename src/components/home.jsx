import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPositions, setSliderPositions] = useState({});
  const [activeDrag, setActiveDrag] = useState(null);

  const toggleDropdown = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startDrag = (id) => {
    setActiveDrag(id);
  };

  const onDrag = (id, e) => {
    if (activeDrag !== id) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    x = Math.min(100, Math.max(0, x));
    setSliderPositions((prev) => ({ ...prev, [id]: x }));
  };

  const stopDrag = () => {
    setActiveDrag(null);
  };

  // Projects - Pavers and Lawn at the top
  const projects = [
    {
      id: 1,
      name: "Brick Pavers & Patios",
      before: "/images/paver1.jpg",
      after: "/images/paver2.jpg",
      extras: []
    },
    {
      id: 2,
      name: "Lawn Transformations",
      before: "/images/lawn1.jpg",
      after: "/images/lawn2.jpg",
      extras: []
    },
    {
      id: 3,
      name: "Bed Clean Up",
      before: "/images/bedcleanup1.jpg",
      after: "/images/bedcleanup2.jpg",
      extras: []
    },
    {
      id: 4,
      name: "Bush & Hedge Trimming",
      before: "/images/bushtrim1.jpg",
      after: "/images/bushtrim2.jpg",
      extras: []
    },
    {
      id: 5,
      name: "Fall Clean Ups",
      before: "/images/fallcleanup1.jpg",
      after: "/images/fallcleanup2.jpg",
      extras: []
    },
    {
      id: 6,
      name: "Mulching & Bed Maintenance",
      before: "/images/mulch1.jpg",
      after: "/images/mulch2.jpg",
      extras: []
    },
    {
      id: 7,
      name: "Power Washing",
      before: "/images/powerwashing1.jpg",
      after: "/images/powerwashing2.jpg",
      extras: []
    }
  ];

  // Before/After Slider Component
  const BeforeAfterSlider = ({ before, after, id, title }) => {
    const position = sliderPositions[id] !== undefined ? sliderPositions[id] : 50;
    
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          backgroundColor: "#e2e8f0",
          cursor: activeDrag === id ? "ew-resize" : "default"
        }}
        onMouseMove={(e) => onDrag(id, e)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {/* AFTER image (bottom) */}
        <img
          src={after}
          alt={`${title} - After`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />

        {/* BEFORE image wrapper (top, clipped) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${position}%`,
            height: "100%",
            overflow: "hidden"
          }}
        >
          <img
            src={before}
            alt={`${title} - Before`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>

        {/* SLIDER HANDLE */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${position}%`,
            width: "48px",
            height: "100%",
            transform: "translateX(-50%)",
            cursor: "ew-resize",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onMouseDown={() => startDrag(id)}
        >
          <div
            style={{
              background: "white",
              padding: "8px 16px",
              borderRadius: "40px",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#1e293b",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
              fontFamily: "sans-serif",
              letterSpacing: "1px",
              pointerEvents: "none"
            }}
          >
            ◀ DRAG ▶
          </div>
        </div>

        {/* BEFORE LABEL */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            fontFamily: "sans-serif",
            pointerEvents: "none",
            zIndex: 15
          }}
        >
          BEFORE
        </div>

        {/* AFTER LABEL */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            fontFamily: "sans-serif",
            pointerEvents: "none",
            zIndex: 15
          }}
        >
          AFTER
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* ========== HEADER ========== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          background: "white",
          padding: "16px 24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          zIndex: 100,
          borderBottom: "1px solid #eef2f6"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          {/* Logo + Company Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src="/images/logo.jpg"
              alt="Greater Edge Landscaping Logo"
              style={{ height: "52px", width: "auto", objectFit: "contain" }}
            />
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", lineHeight: 1.2 }}>
                Greater Edge Landscaping
              </div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#2E8B57", letterSpacing: "0.3px" }}>
                LLC
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#334155", fontWeight: "500", fontSize: "15px" }}>
              Home
            </Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "#334155", fontWeight: "500", fontSize: "15px" }}>
              Contact
            </Link>
            <a
              href="https://www.facebook.com/profile.php?id=61574004541526"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#1877F2",
                color: "white",
                padding: "8px 22px",
                borderRadius: "40px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#166fe5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#1877F2"}
            >
              <span>📘</span> Facebook
            </a>
          </div>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section
        style={{
          background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h1 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "16px", letterSpacing: "-0.5px" }}>
          Transform Your Outdoors
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "32px", opacity: 0.95 }}>
          Professional Landscaping Services
        </p>
        <Link
          to="/contact"
          style={{
            background: "white",
            color: "#2E8B57",
            padding: "14px 38px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "16px",
            display: "inline-block",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
          }}
        >
          Free Estimate →
        </Link>
      </section>

      {/* ========== OUR WORK SECTION ========== */}
      <div style={{ textAlign: "center", padding: "60px 20px 24px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#0f172a" }}>Our Work</h2>
        <div style={{ width: "70px", height: "4px", background: "#2E8B57", margin: "16px auto 0", borderRadius: "2px" }}></div>
      </div>

      {/* ========== PROJECTS GRID ========== */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px 60px" }}>
        {projects.map((project) => {
          const isOpen = showMore[project.id];
          const hasExtras = project.extras && project.extras.length > 0;

          return (
            <div key={project.id} style={{ marginBottom: "64px" }}>
              <h3 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", color: "#1e293b" }}>
                {project.name}
              </h3>

              {/* Before/After Slider */}
              <BeforeAfterSlider
                before={project.before}
                after={project.after}
                id={project.id}
                title={project.name}
              />

              {/* Dropdown for extra photos */}
              {hasExtras && (
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={() => toggleDropdown(project.id)}
                    style={{
                      width: "100%",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "12px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#2E8B57",
                      fontFamily: "inherit"
                    }}
                  >
                    <span>📸 Additional Photos ({project.extras.length})</span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "16px",
                        marginTop: "16px"
                      }}
                    >
                      {project.extras.map((img, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "#f1f5f9",
                            borderRadius: "14px",
                            overflow: "hidden",
                            aspectRatio: "4/3",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                          }}
                        >
                          <img
                            src={img}
                            alt={`${project.name} ${idx + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!hasExtras && (
                <div style={{ marginTop: "14px", textAlign: "center", fontSize: "13px", color: "#94a3b8" }}>
                  More photos coming soon
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========== FOOTER ========== */}
      <footer
        style={{
          background: "#0f172a",
          color: "#94a3b8",
          padding: "32px 20px",
          textAlign: "center",
          fontSize: "14px"
        }}
      >
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
