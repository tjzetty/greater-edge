import { useRef } from "preact/hooks";
import { Link } from "preact-router/match";

import BoxCard from "./boxCard";

import fireplaceImg from "/src/images/fireplace.jpg";
import rockWallImg from "/src/images/rock-wall.png";
import dirtImg from "/src/images/dirt.jpg";
import paversImg from "/src/images/pavers.jpg";

export default function Home() {
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  return (
    <>
      <div id="banner-wrapper">
        <div id="banner" className="box container">
          <div className="row">
            <div className="col-7 col-12-medium">
              <h2>We make your yard look greater.</h2>
              <p>
                Our website is under construction, it will be complete soon!
              </p>
            </div>
            <div className="col-5 col-12-medium">
              <ul>
                <li>
                  <Link
                    href="/contact"
                    className="button large icon solid fa-arrow-circle-right"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    onClick={executeScroll}
                    className="button alt large icon solid fa-question-circle"
                  >
                    More About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="features-wrapper">
        <div className="container">
          <div className="row">
            <BoxCard
              imgHref={fireplaceImg}
              title={"Complete Fireplace and Rockwall"}
              body={
                "Cleared dirt and completed the garden with flowers and fresh seeded grass all around."
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

      <div id="main-wrapper">
        <div className="container">
          <div className="row gtr-200">
            <div className="col-4 col-12-medium">
              <div id="sidebar">
                <section className="widget thumbnails">
                  <h3>Interesting stuff</h3>
                  <div className="grid">
                    <div className="row gtr-50">
                      <div className="col-6">
                        <a href="#" className="image fit">
                          <img src={fireplaceImg} alt="" />
                        </a>
                      </div>
                      <div className="col-6">
                        <a href="#" className="image fit">
                          <img src={rockWallImg} alt="" />
                        </a>
                      </div>
                      <div className="col-6">
                        <a href="#" className="image fit">
                          <img src={dirtImg} alt="" />
                        </a>
                      </div>
                      <div className="col-6">
                        <a href="#" className="image fit">
                          <img src={paversImg} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link href="/gallery" className="button icon fa-file-alt">
                    See More in the Gallery
                  </Link>
                </section>
              </div>
            </div>
            <div ref={myRef} className="col-8 col-12-medium imp-medium">
              <div>
                <section className="last">
                  <h2 id="aboutUsSection">So what's this all about?</h2>
                  <p>
                    This is the <strong>Greater Edge</strong> and we're more
                    than a landscaping company.
                  </p>
                  <p>
                    Phasellus quam turpis, feugiat sit amet ornare in, hendrerit
                    in lectus. Praesent semper bibendum ipsum, et tristique
                    augue fringilla eu. Vivamus id risus vel dolor auctor
                    euismod quis eget mi. Etiam eu ante risus. Aliquam erat
                    volutpat. Aliquam luctus mattis lectus sit amet phasellus
                    quam turpis.
                  </p>
                  <a
                    href="#"
                    className="button icon solid fa-arrow-circle-right"
                  >
                    Continue Reading
                  </a>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
