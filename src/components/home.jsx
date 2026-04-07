import { useRef, useState } from "preact/hooks";
import { Link } from "preact-router/match";

// Import your images
import paver1Img from "/src/images/pavers/paver-1.jpg";
import paver2Img from "/src/images/pavers/paver-2.jpg";
import paver3Img from "/src/images/pavers/paver-3.jpg";

// Lawn images
import lawn1Img from "/src/images/lawns/lawn-before1.jpg";
import lawn2Img from "/src/images/lawns/lawn-after1.jpg";
import lawn3Img from "/src/images/lawns/lawn-2.jpg";

// Fall cleanups
import fall1Img from "/src/images/fall-cleanups/fall-1.jpg";
import fall2Img from "/src/images/fall-cleanups/fall-2.jpg";

// Power washing
import wash1Img from "/src/images/power-washing/wash-1.jpg";
import wash2Img from "/src/images/power-washing/wash-2.jpg";

// Bed cleanup
import bed1Img from "/src/images/bed-cleanup/bed-1.jpg";
import bed2Img from "/src/images/bed-cleanup/bed-2.jpg";

// Bush trimming
import bush1Img from "/src/images/bush-trimming/bush-1.jpg";
import bush2Img from "/src/images/bush-trimming/bush-2.jpg";

// Logo
import logoImg from "/src/images/logo.png";

export default function Home() {
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    pavers: false,
    lawns: false,
    fallCleanups: false,
    powerWashing: false,
    bedCleanup: false,
    bushTrimming: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Category data
  const categories = {
    pavers: {
      title: "Brick Pavers & Hardscaping",
      description: "Custom patios, walkways, and driveways built to last",
      images: [paver1Img, paver2Img, paver3Img],
      previewCount: 3,
    },
    lawns: {
      title: "Lawn Care & Transformation",
      description: "Before & after results that turn heads",
      images: [lawn1Img, lawn2Img, lawn3Img],
      previewCount: 3,
    },
    fallCleanups: {
      title: "Fall Clean Ups",
      description: "Leaf removal, gutter cleaning, and winter prep",
      images: [fall1Img, fall2Img],
      previewCount: 2,
    },
    powerWashing: {
      title: "Power Washing",
      description: "Restore your home's curb appeal",
      images: [wash1Img, wash2Img],
      previewCount: 2,
    },
    bedCleanup: {
      title: "Bed Clean Up & Mulching",
      description: "Fresh mulch, weed removal, and soil amendment",
      images: [bed1Img, bed2Img],
      previewCount: 2,
    },
    bushTrimming: {
      title: "Bush & Hedge Trimming",
      description: "Precision shaping for a polished look",
      images: [bush1Img, bush2Img],
      previewCount: 2,
    },
  };

  const CategorySection = ({ id, category }) => {
    const data = categories[category];
    const isExpanded = expandedSections[id];
    const visibleImages = isExpanded ? data.images : data.images.slice(0, data.previewCount);
    const hasMore = data.images.length > data.previewCount;

    return (
      <div
        id={`${id}-section`}
        style={{
          padding: "60px 0",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2.2em", fontWeight: "bold", color: "#2E8B57", marginBottom: "10px" }}>
              {data.title}
            </h2>
            <p style={{ fontSize: "1.1em", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              {data.description}
            </p>
          </div>

          {/* Image Grid */}
          <div
            className="row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
              marginBottom: "30px",
            }}
          >
            {visibleImages.map((img, idx) => (
              <div key={idx} className="col">
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                  }}
                >
                  <img
                    src={img}
                    alt={`${data.title} ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => toggleSection(id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#2E8B57",
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {isExpanded ? (
                  <>
                    <span>▲ Show Less</span>
                  </>
                ) : (
                  <>
                    <span>▼ Show More</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Logo Bar */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "15px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <img
            src={logoImg}
            alt="The Greater Edge Logo"
            style={{
              maxHeight: "80px",
              width: "auto",
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div
        id="banner-wrapper"
        style={{
          position: "relative",
          height: "500px",
          background: "linear-gradient(135deg, #1a472a 0%, #2E8B57 100%)",
        }}
      >
        <div
          id="banner"
          className="box container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <h1 style={{ fontSize: "3.5em", fontWeight: "bold", marginBottom: "20px" }}>
            Transform Your Outdoors
          </h1>
          <p style={{ fontSize: "1.3em", marginBottom: "30px" }}>
            Professional landscaping that gives you the edge on your neighbors
          </p>
          <div>
            <Link
              href="/contact"
              className="button large icon solid fa-arrow-circle-right"
              style={{
                marginRight: "10px",
                backgroundColor: "#ffffff",
                color: "#2E8B57",
                padding: "12px 30px",
                borderRadius: "30px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Get a Free Quote
            </Link>
            <button
              onClick={executeScroll}
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
                padding: "12px 30px",
                borderRadius: "30px",
                fontWeight: "bold",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div ref={myRef}>
        <CategorySection id="pavers" category="pavers" />
        <CategorySection id="lawns" category="lawns" />
        <CategorySection id="fallCleanups" category="fallCleanups" />
        <CategorySection id="powerWashing" category="powerWashing" />
        <CategorySection id="bedCleanup" category="bedCleanup" />
        <CategorySection id="bushTrimming" category="bushTrimming" />
      </div>

      {/* About Us Section */}
      <div
        id="main-wrapper"
        style={{
          padding: "60px 0",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "2.2em", fontWeight: "bold", color: "#2E8B57", marginBottom: "20px" }}>
            About The Greater Edge
          </h2>
          <p style={{ fontSize: "1.1em", color: "#444", lineHeight: "1.6", marginBottom: "20px" }}>
            We're a young company with a team that brings decades of landscaping experience to every project.
            From custom paver patios to precision lawn care, we don't cut corners — we deliver results that
            make your property the best on the block.
          </p>
          <p style={{ fontSize: "1.1em", color: "#444", lineHeight: "1.6", marginBottom: "30px" }}>
            Ready to get the edge on your neighbors? Let's transform your outdoor space together.
          </p>
          <Link
            href="/contact"
            className="button icon solid fa-arrow-circle-right"
            style={{
              backgroundColor: "#2E8B57",
              color: "white",
              padding: "12px 30px",
              borderRadius: "30px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Request a Free Estimate
          </Link>
        </div>
      </div>
    </>
  );
}
