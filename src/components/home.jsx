import { useRef } from "preact/hooks";
import { Link } from "preact-router/match";

import BoxCard from "./boxCard";

// Import your images
import fireplaceImg from "/src/images/fireplace.jpg";
import rockWallImg from "/src/images/rock-wall.png";
import dirtImg from "/src/images/dirt.jpg";
import paversImg from "/src/images/pavers.jpg";

export default function Home() {
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <>
      {/* Hero Section */}
      <div id="banner-wrapper" style={{ position: "relative", height: "400px" }}>
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
            backgroundColor: "black", // Background color for hero section
          }}
        >
          <h1 style={{ fontSize: "3em", fontWeight: "bold" }}>
            Transform Your Outdoors
          </h1>
          <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
            Your dream landscape is just a click away
          </p>
          <div>
            <Link
              href="/contact"
              className="button large icon solid fa-arrow-circle-right"
              style={{ marginRight: "10px", backgroundColor: "#2E8B57", color: "white" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-wrapper" style={{ padding: "50px 0", backgroundColor: "#2E8B57" }}>
        <div className="container">
          <div className="row">
            <BoxCard
              imgHref={rockWallImg}
              title={"Brick Pavers & Rock Wall"}
              body={
                "We completed a custom brick paver patio and multi-layer rock wall with drainage solutions, transforming this backyard into an elegant outdoor living space."
              }
            />
            <BoxCard
              imgHref={rockWallImg}
              title={"Multi-Layer Rockwall with Mulch Beds"}
              subtitle={"Custom solutions with drainage"}
            />
            <BoxCard imgHref={dirtImg} title={"Laying Down Road"} />
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="main-wrapper" style={{ padding: "50px 0", backgroundColor: "#f4f4f4" }}>
        <div className="container">
          <div className="row gtr-200">
            <div ref={myRef} className="col-8 col-12-medium imp-medium">
              <section className="last">
                <h2 id="aboutUsSection" style={{ fontSize: "2em", fontWeight: "bold", color: "black" }}>
                  So what's this all about?
                </h2>
                <p style={{ fontSize: "1.1em", color: "#333" }}>
                  We are <strong>The Greater Edge</strong>, a young and passionate landscaping company dedicated to transforming outdoor spaces into beautiful, functional environments. 
                  While we may be new, our team is committed to delivering top-quality results at a fair price.
                </p>
                <p style={{ fontSize: "1.1em", color: "#333" }}>
                  Whether it’s creating custom rock walls, stunning patios, or well-maintained gardens, we focus on attention to detail and exceeding our clients' expectations. 
                  Our work speaks for itself, and we believe that every project we take on should enhance the beauty and functionality of your outdoor spaces.
                </p>
                <a
                  href="#"
                  className="button icon solid fa-arrow-circle-right"
                  style={{ marginTop: "20px", backgroundColor: "#2E8B57", color: "white" }}
                >
                  Continue Reading
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery-wrapper" style={{ padding: "50px 0", backgroundColor: "#e7e7e7" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Our Recent Projects</h2>
          <div className="row">
            {/* Gallery Grid */}
            {[fireplaceImg, rockWallImg, dirtImg, paversImg].map((img, idx) => (
              <div className="col-3" key={idx}>
                <a href="#" className="image fit">
                  <img
                    src={img}
                    alt={`Project ${idx + 1}`}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Link href="/gallery" className="button icon fa-file-alt" style={{ backgroundColor: "#2E8B57", color: "white" }}>
              See More in the Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
