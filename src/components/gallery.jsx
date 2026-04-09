import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Gallery() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // All your images - hardcoded to match your actual files
  const categories = [
    {
      id: "pavers",
      title: "Brick Pavers & Patios",
      images: [
        "/images/pavers1.png",
        "/images/pavers2.png",
        "/images/pavers3.png",
        "/images/pavers4.png",
        "/images/pavers5.png",
      ].filter((path) => {
        // Only include if you have the file
        const img = new Image();
        img.src = path;
        return true;
      }),
    },
    {
      id: "lawns",
      title: "Lawn Transformations",
      images: [
        "/images/lawn1.png",
        "/images/lawn2.png",
        "/images/lawn3.png",
      ],
    },
    {
      id: "mulch",
      title: "Mulching & Bed Maintenance",
      images: [
        "/images/mulching1.png",
        "/images/mulching2.png",
        "/images/mulching3.png",
      ],
    },
    {
      id: "bedCleanup",
      title: "Bed Clean Up",
      images: [
        "/images/bedcleanup1.png",
        "/images/bedcleanup2.png",
        "/images/bedcleanup3.png",
      ],
    },
    {
      id: "trimming",
      title: "Bush & Hedge Trimming",
      images: [
        "/images/bushtrim1.png",
        "/images/bushtrim2.png",
        "/images/bushtrim3.png",
      ],
    },
    {
      id: "powerWashing",
      title: "Power Washing",
      images: [
        "/images/powerwashing1.png",
        "/images/powerwashing2.png",
        "/images/powerwashing3.png",
      ],
    },
    {
      id: "fallCleanups",
      title: "Fall Clean Ups",
      images: [
        "/images/fallcleanup1.png",
        "/images/fallcleanup2.png",
        "/images/fallcleanup3.png",
      ],
    },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        padding: "12px 24px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <img 
              src="/images/IMG_20250827_111608(1).png" 
              alt="The Greater Edge Logo" 
              style={{ height: "50px", width: "auto", objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span style={{ fontSize: "1.3rem", fontWeight: "600" }}>
              <span style={{ color: "#2E8B57" }}>The Greater</span>
              <span style={{ color: "#1a1a1a" }}> Edge</span>
            </span>
          </Link>
          <div style={{ display: "flex", gap: "28px" }}>
            <Link href="/" style={{ color: "#1a1a1a", textDecoration: "none" }}>Home</Link>
            <Link href="/gallery" style={{ color: "#2E8B57", textDecoration: "none", fontWeight: "600" }}>Gallery</Link>
            <Link href="/contact" style={{ color: "#1a1a1a", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{ backgroundColor: "#f8faf8", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "16px" }}>Our Gallery</h1>
        <div style={{ width: "60px", height: "3px", backgroundColor: "#2E8B57", margin: "0 auto 16px auto" }} />
        <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>Browse our completed projects and see the quality of our work</p>
      </div>

      {/* Gallery Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        {categories.map((category) => {
          const images = category.images;
          const coverImage = images[0];
          const additionalImages = images.slice(1);
          const isExpanded = expandedSections[category.id];
          const visibleImages = isExpanded ? images : [coverImage];
          const hasMore = additionalImages.length > 0;

          if (!coverImage) return null;

          return (
            <div key={category.id} style={{ marginBottom: "60px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "24px" }}>{category.title}</h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
                marginBottom: "16px",
              }}>
                {visibleImages.map((img, idx) => (
                  <div key={idx} style={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    aspectRatio: "4/3",
                    backgroundColor: "#f5f5f5",
                  }}>
                    <img 
                      src={img} 
                      alt={category.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      onError={(e) => { e.target.src = "https://placehold.co/600x400/2E8B57/white?text=Photo+Coming+Soon"; }} 
                    />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: "center" }}>
                  <button 
                    onClick={() => toggleSection(category.id)} 
                    style={{ 
                      background: "transparent", 
                      border: "none", 
                      cursor: "pointer", 
                      color: "#2E8B57", 
                      fontSize: "1rem", 
                      fontWeight: "500", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "8px", 
                      padding: "8px 16px",
                      borderRadius: "30px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(46, 139, 86, 0.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {isExpanded ? "▲ Show Less" : `▼ Show More (${additionalImages.length} more)`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1a1a1a", color: "#888", padding: "40px 24px", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} The Greater Edge. All rights reserved.</p>
        <p style={{ marginTop: "10px" }}>Get the edge on your neighbors.</p>
      </footer>
    </div>
  );
}
