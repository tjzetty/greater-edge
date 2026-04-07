import { useRef, useState } from "preact/hooks";
import { Link } from "preact-router/match";

// Logo import
import logoImg from "/src/images/logo.png";

// Helper function to get images - just looks in /src/images/
const getImage = (name) => {
  try {
    return new URL(`/src/images/${name}`, import.meta.url).href;
  } catch (e) {
    return null;
  }
};

export default function Home() {
  const aboutRef = useRef(null);
  const workSectionRef = useRef(null);
  
  const scrollToWork = () => {
    workSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    pavers: false,
    lawns: false,
    mulch: false,
    trimming: false,
    powerWashing: false,
    fallCleanups: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Define all images - just list your file names here
  const paverImages = [
    getImage("paver-1.jpg"),
    getImage("paver-2.jpg"),
    getImage("paver-3.jpg"),
    getImage("paver-4.jpg"),
  ].filter(img => img !== null);

  const lawnImages = [
    getImage("lawn-1.jpg"),
    getImage("lawn-2.jpg"),
    getImage("lawn-3.jpg"),
  ].filter(img => img !== null);

  const mulchImages = [
    getImage("mulch-1.jpg"),
    getImage("mulch-2.jpg"),
    getImage("mulch-3.jpg"),
  ].filter(img => img !== null);

  const trimImages = [
    getImage("trim-1.jpg"),
    getImage("trim-2.jpg"),
  ].filter(img => img !== null);

  const washImages = [
    getImage("wash-1.jpg"),
    getImage("wash-2.jpg"),
  ].filter(img => img !== null);

  const fallImages = [
    getImage("fall-1.jpg"),
    getImage("fall-2.jpg"),
  ].filter(img => img !== null);

  // Category data (ordered by priority)
  const categories = [
    {
      id: "pavers",
      title: "Brick Pavers & Patios",
      description: "Custom hardscaping that transforms your outdoor living space",
      images: paverImages,
      previewCount: 3,
    },
    {
      id: "lawns",
      title: "Lawn Transformations",
      description: "Before & after. See the difference professional care makes",
      images: lawnImages,
      previewCount: 3,
    },
    {
      id: "mulch",
      title: "Mulch Beds & Clean Up",
      description: "Fresh color, healthy soil, zero weeds",
      images: mulchImages,
      previewCount: 3,
    },
    {
      id: "trimming",
      title: "Bush & Hedge Trimming",
      description: "Precision shaping for a polished, professional look",
      images: trimImages,
      previewCount: 2,
    },
    {
      id: "powerWashing",
      title: "Power Washing",
      description: "Restore your home's original beauty in hours",
      images: washImages,
      previewCount: 2,
    },
    {
      id: "fallCleanups",
      title: "Fall Clean Ups",
      description: "Leaf removal, gutter cleaning, and winter preparation",
      images: fallImages,
      previewCount: 2,
    },
  ];

  const CategorySection = ({ category, index }) => {
    const isExpanded = expandedSections[category.id];
    const visibleImages = isExpanded ? category.images : category.images.slice(0, category.previewCount);
    const hasMore = category.images.length > category.previewCount;

    // Don't render section if no images
    if (category.images.length === 0) return null;

    return (
      <section
        style={{
          padding: "70px 0",
          borderBottom: index === categories.length - 1 ? "none" : "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}>
              {category.title}
            </h2>
            <div style={{
              width: "50px",
              height: "3px",
              backgroundColor: "#2E8B57",
              margin: "0 auto 16px auto",
              borderRadius: "2px",
            }} />
            <p style={{
              fontSize: "1rem",
              color: "#666",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: "1.5",
            }}>
              {category.description}
            </p>
          </div>

          {/* Image Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {visibleImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  overflow: "hidden",
                  borderRadius: "16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f5f5f5",
                  aspectRatio: "4/3",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                }}
              >
                <img
                  src={img}
                  alt={`${category.title} ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "8px" }}>
              <button
                onClick={() => toggleSection(category.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  color: "#2E8B57",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  borderRadius: "30px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(46, 139, 86, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {isExpanded ? (
                  <>
                    <span>▲</span>
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <span>▼</span>
                    <span>Show More</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <>
      {/* Sticky Navigation with Logo */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src={logoImg}
              alt="The Greater Edge"
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = "<span style='font-size:1.3rem;font-weight:bold;color:#2E8B57;'>The Greater Edge</span>";
              }}
            />
          </Link>

          {/* Nav Links */}
          <div style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "500", fontSize: "0.95rem" }}>
              Home
            </Link>
            <Link href="/gallery" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "500", fontSize: "0.95rem" }}>
              Gallery
            </Link>
            <Link href="/contact" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "500", fontSize: "0.95rem" }}>
              Contact
            </Link>
            <Link
              href="/estimate"
              style={{
                backgroundColor: "#2E8B57",
                color: "white",
                padding: "8px 22px",
                borderRadius: "40px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.85rem",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#236b43")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2E8B57")}
            >
              Free Estimate
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "500px",
          background: "linear-gradient(135deg, #0f2b1f 0%, #1e4d32 50%, #2E8B57 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", padding: "0 24px", color: "white" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Transform Your Outdoors
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "28px", opacity: 0.95, lineHeight: "1.4" }}>
            Professional landscaping that gives you{" "}
            <span style={{ fontWeight: "bold", textDecoration: "underline", textUnderlineOffset: "6px" }}>
              the edge on your neighbors
            </span>
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: "#ffffff",
                color: "#2E8B57",
                padding: "12px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                display: "inline-block",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              Get a Quote
            </Link>
            <button
              onClick={scrollToWork}
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
                padding: "12px 32px",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Work Sections Container */}
      <div ref={workSectionRef}>
        {categories.map((category, idx) => (
          <CategorySection key={category.id} category={category} index={idx} />
        ))}
      </div>

      {/* About Section */}
      <section
        ref={aboutRef}
        style={{
          padding: "70px 0",
          backgroundColor: "#f8faf8",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            width: "50px",
            height: "3px",
            backgroundColor: "#2E8B57",
            margin: "0 auto 24px auto",
            borderRadius: "2px",
          }} />
          <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "20px", letterSpacing: "-0.02em" }}>
            About The Greater Edge
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: "1.6", marginBottom: "24px" }}>
            We're a young company with a team that brings <strong>decades of landscaping experience</strong> to every project.
            From custom paver patios to precision lawn care, we deliver results that make your property the best on the block.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: "1.6", marginBottom: "32px" }}>
            Ready to get the edge on your neighbors? Let's transform your outdoor space together.
          </p>
          <Link
            href="/contact"
            style={{
              backgroundColor: "#2E8B57",
              color: "white",
              padding: "12px 32px",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.95rem",
              display: "inline-block",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#236b43";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2E8B57";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Request a Free Estimate
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#1a1a1a",
        color: "#888",
        padding: "36px 0",
        textAlign: "center",
        fontSize: "0.85rem",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p>&copy; {new Date().getFullYear()} The Greater Edge. All rights reserved.</p>
          <p style={{ marginTop: "10px" }}>Get the edge on your neighbors.</p>
        </div>
      </footer>
    </>
  );
}
