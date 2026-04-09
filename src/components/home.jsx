import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [showMore, setShowMore] = useState({});
  const [sliderPositions, setSliderPositions] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const toggle = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSliderMove = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setSliderPositions((prev) => ({ ...prev, [id]: x }));
  };

  const handleImageError = (projectId, imageType) => {
    setImageErrors((prev) => ({ 
      ...prev, 
      [`${projectId}-${imageType}`]: true 
    }));
    console.error(`Failed to load ${imageType} image for project ${projectId}`);
  };

  // Reordered projects - Pavers and Lawn at the top
  const projects = [
    {
      id: 2,
      name: "Brick Pavers & Patios",
      main: "/images/paver1.jpg",
      after: "/images/paver2.jpg",
      rest: []
    },
    {
      id: 5,
      name: "Lawn Transformations",
      main: "/images/lawn1.jpg",
      after: "/images/lawn2.jpg",
      rest: []
    },
    {
      id: 1,
      name: "Bed Clean Up",
      main: "/images/bedcleanup1.jpg",
      after: "/images/bedcleanup2.jpg",
      rest: []
    },
    {
      id: 3,
      name: "Bush & Hedge Trimming",
      main: "/images/bushtrim1.jpg",
      after: "/images/bushtrim2.jpg",
      rest: []
    },
    {
      id: 4,
      name: "Fall Clean Ups",
      main: "/images/fallcleanup1.jpg",
      after: "/images/fallcleanup2.jpg",
      rest: []
    },
    {
      id: 6,
      name: "Mulching & Bed Maintenance",
      main: "/images/mulch1.jpg",
      after: "/images/mulch2.jpg",
      rest: []
    },
    {
      id: 7,
      name: "Power Washing",
      main: "/images/powerwashing1.jpg",
      after: "/images/powerwashing2.jpg",
      rest: []
    }
  ];

  // Before/After Slider with error handling
  const BeforeAfterSlider = ({ beforeImg, afterImg, id, projectName }) => {
    const sliderPos = sliderPositions[id] !== undefined ? sliderPositions[id] : 50;
    const beforeError = imageErrors[`${id}-before`];
    const afterError = imageErrors[`${id}-after`];

    if (beforeError || afterError) {
      return (
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            borderRadius: "12px",
            backgroundColor: "#f8f9fa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            border: "2px dashed #dee2e6"
          }}
        >
          <span style={{ fontSize: "48px" }}>⚠️</span>
          <p style={{ color: "#dc2626", textAlign: "center", padding: "0 20px" }}>
            <strong>Image not found</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>
              {beforeError ? `Missing: ${beforeImg}` : afterError ? `Missing: ${afterImg}` : ""}
            </span>
          </p>
          <p style={{ fontSize: "12px", color: "#6c757d", textAlign: "center" }}>
            Please check that both before and after images exist in your /images/ folder
          </p>
        </div>
      );
    }

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "ew-resize",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          backgroundColor: "#f0f0f0"
        }}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleSliderMove(id, e);
        }}
        onMouseDown={(e) => handleSliderMove(id, e)}
      >
        {/* After image (bottom layer) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}
        >
          <img
            src={afterImg}
            alt={`${projectName} - After`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center"
            }}
            onError={() => handleImageError(id, "after")}
          />
        </div>

        {/* Before image (top layer with clip) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${sliderPos}%`,
            height: "100%",
            overflow: "hidden"
          }}
        >
          <img
            src={beforeImg}
            alt={`${projectName} - Before`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center"
            }}
            onError={() => handleImageError(id, "before")}
          />
        </div>

        {/* Slider handle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${sliderPos}%`,
            width: "4px",
            height: "100%",
            background: "white",
            transform: "translateX(-50%)",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.5), 0 0 0 6px rgba(0,0,0,0.2)",
            cursor: "ew-resize",
            zIndex: 10
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "8px 12px",
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#1a1a1a",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              fontFamily: "sans-serif",
              pointerEvents: "none"
            }}
          >
            ◀ BEFORE ▶
          </div>
        </div>

        {/* Labels */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            zIndex: 10,
            fontFamily: "sans-serif",
            pointerEvents: "none"
          }}
        >
          BEFORE
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            zIndex: 10,
            fontFamily: "sans-serif",
            pointerEvents: "none"
          }}
        >
          AFTER
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* HEADER - Professional with original logo */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "white",
          padding: "15px 20px",
          boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
          zIndex: 100,
          borderBottom: "1px solid #e8edf2"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px"
          }}
        >
          {/* Logo and Company Name - Professional layout */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* Original logo - no filters */}
            <img
              src="/images/logo.jpg"
              alt="Greater Edge Landscaping Logo"
              style={{ 
                height: "55px", 
                width: "auto", 
                objectFit: "contain"
              }}
              onError={(e) => {
                console.error("Logo not found at /images/logo.jpg");
                e.target.style.display = "none";
              }}
            />
            
            {/* Company Name - Professional black font */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              lineHeight: 1.2
            }}>
              <span style={{ 
                fontSize: "22px", 
                fontWeight: "700",
                color: "#1a1a1a",
                letterSpacing: "-0.2px"
              }}>
                Greater Edge Landscaping
              </span>
              <span style={{ 
                fontSize: "14px", 
                fontWeight: "500",
                color: "#2E8B57",
                letterSpacing: "0.3px"
              }}>
                LLC
              </span>
            </div>
          </div>

          {/* Navigation and Facebook Button */}
          <div style={{ display: "flex", gap: "25px", alignItems: "center", flexWrap: "wrap" }}>
            <Link 
              to="/" 
              style={{ 
                textDecoration: "none", 
                color: "#334155", 
                fontWeight: "500",
                fontSize: "16px",
                transition: "color 0.2s",
                padding: "8px 4px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#2E8B57"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
            >
              Home
            </Link>
            <Link
              to="/contact"
              style={{ 
                textDecoration: "none", 
                color: "#334155", 
                fontWeight: "500",
                fontSize: "16px",
                transition: "color 0.2s",
                padding: "8px 4px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#2E8B57"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
            >
              Contact
            </Link>

            {/* Professional Facebook Button */}
            <a
              href="https://facebook.com/yourfacebookpage"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#1877F2",
                color: "white",
                padding: "10px 24px",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 5px rgba(24, 119, 242, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#166fe5";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(24, 119, 242, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1877F2";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(24, 119, 242, 0.2)";
              }}
            >
              <span style={{ fontSize: "16px" }}>📘</span>
              Follow Us
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #2E8B57 0%, #1e6b43 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Transform Your Outdoors
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "30px" }}>
          Professional Landscaping Services
        </p>
        <Link
          to="/contact"
          style={{
            background: "white",
            color: "#2E8B57",
            padding: "14px 35px",
            borderRadius: "40px",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-block",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
          }}
        >
          Free Estimate
        </Link>
      </div>

      {/* OUR WORK */}
      <div style={{ textAlign: "center", padding: "60px 20px 20px" }}>
        <h2 style={{ fontSize: "36px" }}>Our Work</h2>
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#2E8B57",
            margin: "10px auto"
          }}
        ></div>
      </div>

      {/* PROJECTS */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        {projects.map((project) => {
          const expanded = showMore[project.id];
          const hasRest = project.rest && project.rest.length > 0;
          const hasAfter = project.after;

          return (
            <div key={project.id} style={{ marginBottom: "60px" }}>
              <h3 style={{ fontSize: "28px", marginBottom: "20px", color: "#1e293b" }}>
                {project.name}
              </h3>

              {/* Before/After Slider */}
              {hasAfter ? (
                <div style={{ marginBottom: "20px" }}>
                  <BeforeAfterSlider
                    beforeImg={project.main}
                    afterImg={project.after}
                    id={project.id}
                    projectName={project.name}
                  />
                </div>
              ) : (
                <div
                  style={{
                    background: "#f0f0f0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    marginBottom: "20px"
                  }}
                >
                  <img
                    src={project.main}
                    alt={project.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      console.error(`Failed to load main image: ${project.main}`);
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif'%3EImage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}

              {/* Dropdown Arrow Section */}
              {hasRest && (
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={() => toggle(project.id)}
                    style={{
                      background: "#f8f9fa",
                      border: "1px solid #e2e8f0",
                      padding: "12px 20px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#2E8B57",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    <span>
                      📸 Additional Photos ({project.rest.length})
                    </span>
                    <span style={{
                      fontSize: "20px",
                      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s"
                    }}>
                      ▼
                    </span>
                  </button>

                  {expanded && (
                    <div
                      style={{
                        marginTop: "16px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "16px",
                        padding: "8px 0"
                      }}
                    >
                      {project.rest.map((img, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "#f0f0f0",
                            borderRadius: "10px",
                            overflow: "hidden",
                            aspectRatio: "4/3",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                          }}
                        >
                          <img
                            src={img}
                            alt={`${project.name} additional ${idx + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                            onError={(e) => {
                              console.error(`Failed to load additional image: ${img}`);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!hasRest && (
                <div
                  style={{
                    marginTop: "12px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#94a3b8",
                    fontStyle: "italic"
                  }}
                >
                  More photos coming soon
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div
        style={{
          background: "#1a1a1a",
          color: "#888",
          padding: "30px 20px",
          textAlign: "center"
        }}
      >
        <p>© 2026 Greater Edge Landscaping LLC. All rights reserved.</p>
      </div>
    </div>
  );
}
