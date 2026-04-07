import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

export default function Gallery() {
  const [expandedSections, setExpandedSections] = useState({});
  const [allImages, setAllImages] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const checkImages = async () => {
      const categories = {
        pavers: { base: "Pavers", count: 20 },
        lawns: { base: "Lawn", count: 20 },
        mulch: { base: "Mulching", count: 20 },
        bedCleanup: { base: "Bedcleanup", count: 20 },
        trimming: { base: "Bushtrim", count: 20 },
        powerWashing: { base: "Powerwashing", count: 20 },
        fallCleanups: { base: "Fallcleanup", count: 20 },
      };

      const loaded = {};

      for (const [key, data] of Object.entries(categories)) {
        const found = [];
        for (let i = 1; i <= data.count; i++) {
          const imgPath = `/images/${data.base}${i}.png`;
          try {
            await new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                found.push(imgPath);
                resolve();
              };
              img.onerror = () => resolve();
              img.src = imgPath;
            });
          } catch (e) {
            // skip
          }
        }
        loaded[key] = found;
      }

      setAllImages(loaded);
      setImagesLoaded(true);
    };

    checkImages();
  }, []);

  const categories = [
    { id: "pavers", title: "Brick Pavers & Patios" },
    { id: "lawns", title: "Lawn Transformations" },
    { id: "mulch", title: "Mulching & Bed Maintenance" },
    { id: "bedCleanup", title: "Bed Clean Up" },
    { id: "trimming", title: "Bush & Hedge Trimming" },
    { id: "powerWashing", title: "Power Washing" },
    { id: "fallCleanups", title: "Fall Clean Ups" },
  ];

  if (!imagesLoaded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8faf8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "50px", height: "50px", border: "3px solid #2E8B57", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ color: "#2E8B57" }}>Loading...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        padding: "12px 24px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          
          {/* Logo + Company Name */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <img 
              src="/images/IMG_20250827_111608(1).png" 
              alt="The Greater Edge Logo" 
              style={{ height: "50px", width: "auto", objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span style={{ fontSize: "1.3rem", fontWeight: "600", color: "#1a1a1a" }}>
              <span style={{ color: "#2E8B57" }}>The Greater</span>
              <span style={{ color: "#1a1a1a" }}> Edge</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div style={{ display: "flex", gap: "28px" }}>
            <Link href="/" style={{ color: "#1a1a1a", textDecoration: "none" }}>Home</Link>
            <Link href="/gallery" style={{ color: "#2E8B57", textDecoration: "none", fontWeight: "600" }}>Gallery</Link>
            <Link href="/contact" style={{ color: "#1a1a1a", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </nav>

      <div style={{ backgroundColor: "#f8faf8", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "600", color: "#1a1a1a", marginBottom: "16px" }}>Our Gallery</h1>
        <div style={{ width: "60px", height: "3px", backgroundColor: "#2E8B57", margin: "0 auto 16px auto" }} />
        <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>Browse our completed projects and see the quality of our work</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        {categories.map((category) => {
          const images = allImages[category.id] || [];
          const coverImage = images[0] || "";
          const additionalImages = images.slice(1);
          const isExpanded = expandedSections[category.id];
          const visibleImages = isExpanded ? images : [coverImage];
          const hasMore = additionalImages.length > 0;

          if (images.length === 0) return null;

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
                    <img src={img} alt={category.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.src = "https://placehold.co/600x400/2E8B57/white?text=Photo+Coming+Soon"; }} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: "center" }}>
                  <button onClick={() => toggleSection(category.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#2E8B57", fontSize: "1rem", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px" }}>
                    {isExpanded ? "▲ Show Less" : `▼ Show More (${additionalImages.length} more)`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer style={{ backgroundColor: "#1a1a1a", color: "#888", padding: "40px 24px", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} The Greater Edge. All rights reserved.</p>
        <p style={{ marginTop: "10px" }}>Get the edge on your neighbors.</p>
      </footer>
    </div>
  );
}
