import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import fireplaceImg from "/src/images/fireplace.jpg";
import rockWallImg from "/src/images/rock-wall.png";
import dirtImg from "/src/images/dirt.jpg";

import Footer from "./components/footer";
import Header from "./components/header";

import "./app.css";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function App() {
  return (
    <div className="is-preload homepage">
      <div id="page-wrapper">
        <Header />
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
                    <a
                      href="#"
                      className="button large icon solid fa-arrow-circle-right"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
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
              <div className="col-4 col-12-medium">
                <section className="box feature">
                  <div className="boxImage">
                    <a href="#" className="image featured">
                      <img src={fireplaceImg} s alt="" />
                    </a>
                  </div>
                  <div className="inner">
                    <header>
                      <h2>Complete Fireplace and Rockwall</h2>
                      <p>Maybe here as well I think</p>
                    </header>
                    <p>
                      Phasellus quam turpis, feugiat sit amet in, hendrerit in
                      lectus. Praesent sed semper amet bibendum tristique
                      fringilla.
                    </p>
                  </div>
                </section>
              </div>
              <div className="col-4 col-12-medium">
                <section className="box feature">
                  <div className="boxImage">
                    <a href="#" className="image featured">
                      <img src={rockWallImg} alt="" />
                    </a>
                  </div>
                  <div className="inner">
                    <header>
                      <h2>Multi-Layer Rockwall with Mulch Beds</h2>
                      <p>This is also an interesting subtitle</p>
                    </header>
                    <p>
                      Phasellus quam turpis, feugiat sit amet in, hendrerit in
                      lectus. Praesent sed semper amet bibendum tristique
                      fringilla.
                    </p>
                  </div>
                </section>
              </div>
              <div className="col-4 col-12-medium">
                <section className="box feature">
                  <div className="boxImage">
                    <a href="#" className="image featured">
                      <img src={dirtImg} alt="" />
                    </a>
                  </div>
                  <div className="inner">
                    <header>
                      <h2>Laying Down Road</h2>
                      <p>Here's another intriguing subtitle</p>
                    </header>
                    <p>
                      Phasellus quam turpis, feugiat sit amet in, hendrerit in
                      lectus. Praesent sed semper amet bibendum tristique
                      fringilla.
                    </p>
                  </div>
                </section>
              </div>
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
                            <img src={fireplaceImg} alt="" />
                          </a>
                        </div>
                        <div className="col-6">
                          <a href="#" className="image fit">
                            <img src={fireplaceImg} alt="" />
                          </a>
                        </div>
                        <div className="col-6">
                          <a href="#" className="image fit">
                            <img src={fireplaceImg} alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="button icon fa-file-alt">
                      More
                    </a>
                  </section>
                </div>
              </div>
              <div className="col-8 col-12-medium imp-medium">
                <div id="content">
                  <section className="last">
                    <h2>So what's this all about?</h2>
                    <p>
                      This is the <strong>Greater Edge</strong> and we're more
                      than a landscaping company.
                    </p>
                    <p>
                      Phasellus quam turpis, feugiat sit amet ornare in,
                      hendrerit in lectus. Praesent semper bibendum ipsum, et
                      tristique augue fringilla eu. Vivamus id risus vel dolor
                      auctor euismod quis eget mi. Etiam eu ante risus. Aliquam
                      erat volutpat. Aliquam luctus mattis lectus sit amet
                      phasellus quam turpis.
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
        <Footer />
      </div>
    </div>
  );
}
