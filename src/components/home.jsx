import { useState } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Home() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    {
      id: "pavers",
      title: "Brick Pavers & Patios",
      description: "Custom hardscaping that transforms your outdoor living space",
      coverImage: "/images/Pavers/1.jpg",
      images: ["/images/Pavers/1.jpg", "/images/Pavers/2.jpg", "/images/Pavers/3.jpg"],
    },
    {
      id: "lawns",
      title: "Lawn Transformations",
      description: "Before & after. See the difference professional care makes",
      coverImage: "/images/Lawn1.jpg",
      images: ["/images/Lawn1.jpg"],
    },
    {
      id: "mulch",
      title: "Mulching & Bed Maintenance",
      description: "Fresh mulch, healthy beds, and professional care",
      coverImage: "/images/Mulching1.jpg",
      images: ["/images/Mulching1.jpg"],
    },
    {
      id: "bedCleanup",
      title: "Bed Clean Up",
      description: "Remove weeds, refresh soil, and make your beds shine",
      coverImage: "/images/Bed cleanup1.jpg",
      images: ["/images/Bed cleanup1.jpg", "/images/Bed cleanup2.jpg", "/images/Bed cleanup3.jpg"],
    },
    {
      id: "trimming",
      title: "Bush & Hedge Trimming",
      description: "Precision shaping for a polished, professional look",
      coverImage: "/images/Buss trimming.jpg",
      images: ["/images/Buss trimming.jpg"],
    },
    {
      id: "powerWashing",
      title: "Power Washing",
      description: "Restore your home's original beauty in hours",
      coverImage: "/images/Power washing1.jpg",
      images: ["/images/Power washing1.jpg"],
    },
    {
      id: "fallCleanups",
      title: "Fall Clean Ups",
      description: "Leaf removal, gutter cleaning, and winter preparation",
      coverImage: "/images/Fall clean ups.jpg",
      images: ["/images/Fall clean ups.jpg", "/images/Fall clean ups2.jpg", "/images/Fall cleanups (c).jpg"],
    },
  ];

  return (
    <>
      {/* Navigation */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        padding: "16px 24px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              <span style={{ color: "#2E8B57" }}>The Greater</span>
              <span style={{ color: "#1a1a1a" }}> Edge</span>
            </span>
          </Link>
          <div style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "500" }}>Home</Link>
            <Link href="/gallery" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "500" }}>Gallery</Link>
            <Link href="/contact" style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: "500" }}>Contact</Link>
            <Link href="/estimate" style={{ backgroundColor: "#2E8B57", color: "white", padding: "8px 22px", borderRadius: "40px", textDecoration: "none", fontWeight: "600", fontSize: "0.85rem" }}>Free Estimate</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f2b1f 0%, #1e4d32 50%, #2E8B57 100%)", padding: "80px 24px", textAlign: "center", color: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "16px" }}>Transform Your Outdoors</h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "28px" }}>Professional landscaping that gives you <span style={{ fontWeight: "bold", textDecoration: "underline" }}>the edge on your neighbors</span></p>
          <Link href="/contact" style={{ backgroundColor: "#ffffff", color: "#2E8B57", padding: "12px 32px", borderRadius: "50px", textDecoration: "none", fontWeight: "600" }}>Get a Quote</Link>
        </div>
      </section>

      {/* Our Work Section */}
      <div style={{ textAlign: "center", padding: "60px 24px 20px 24px" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px" }}>Our Work</h2>
        <div style={{ width: "60px", height: "3px", backgroundColor: "#2E8B57", margin: "0 auto" }} />
        <p style={{ color: "#666", marginTop: "16px" }}>Real projects. Real results. See what we can do for your property.</p>
      </div>

      {/* Categories with Cover Images and Dropdowns */}
      {categories.map((category) => {
        const isExpanded = expandedSections[category.id];
        const visibleImages = isExpanded ? category.images : [category.coverImage];
        const hasMore = category.images.length > 1;

        return (
          <section key={category.id} style={{ padding: "40px 24px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "8px" }}>{category.title}</h2>
                <div style={{ width: "50px", height: "3px", backgroundColor: "#2E8B57", marginBottom: "12px" }} />
                <p style={{ color: "#666" }}>{category.description}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginBottom: "20px" }}>
                {visibleImages.map((img, idx) => (
                  <div key={idx} style={{ overflow: "hidden", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", aspectRatio: "4/3", backgroundColor: "#f5f5f5" }}>
                    <img src={img} alt={`${category.title}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.src = "https://placehold.co/600x400/2E8B57/white?text=Photo+Coming+Soon"; }} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: "center" }}>
                  <button onClick={() => toggleSection(category.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#2E8B57", fontSize: "0.9rem", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px" }}>
                    {isExpanded ? "▲ Show Less" : "▼ Show More"}
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* About */}
      <section style={{ padding: "60px 24px", backgroundColor: "#f8faf8", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ width: "50px", height: "3px", backgroundColor: "#2E8B57", margin: "0 auto 24px auto" }} />
          <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "20px" }}>About The Greater Edge</h2>
          <p style={{ fontSize: "1rem", color: "#444", lineHeight: "1.6", marginBottom: "24px" }}>We're a young company with a team that brings <strong>decades of landscaping experience</strong> to every project. From custom paver patios to precision lawn care, we deliver results that make your property the best on the block.</p>
          <Link href="/contact" style={{ backgroundColor: "#2E8B57", color: "white", padding: "12px 32px", borderRadius: "50px", textDecoration: "none", fontWeight: "600", display: "inline-block" }}>Request a Free Estimate</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1a1a1a", color: "#888", padding: "36px 24px", textAlign: "center", fontSize: "0.85rem" }}>
        <p>&copy; {new Date().getFullYear()} The Greater Edge. All rights reserved.</p>
        <p style={{ marginTop: "10px" }}>Get the edge on your neighbors.</p>
      </footer>
    </>
  );
}
