import fireplaceImg from "/src/images/fireplace.jpg";
import rockWallImg from "/src/images/rock-wall.png";
import dirtImg from "/src/images/dirt.jpg";
import paversImg from "/src/images/pavers.jpg";

export default function Gallery() {
  return (
    <div id="main-wrapper">
      <div class="container">
        <div id="content">
          <article>
            <h1>Gallery</h1>
            <br />
            <p>Please be patient, this page is under construction!</p>

            <h3>
              Take a Look at a Few of the Projects We Would Like to Showcase
            </h3>
            <div className="grid">
              <div className="row gtr-50">
                <div className="col-6">
                  <a
                    target="_blank"
                    className="image fit"
                    href={fireplaceImg}
                    data-lightbox="gallery"
                    data-title="Fire Pit with Flower Bed"
                    data-alt="Custom Fire Pit with Flower Bed"
                  >
                    <img src={fireplaceImg} alt="" />
                  </a>
                </div>
                <div className="col-6">
                  <a
                    target="_blank"
                    className="image fit"
                    href={rockWallImg}
                    data-lightbox="gallery"
                    data-title="Multi-Layered Rock Wall"
                    data-alt="Multi-Layered Rock Wall"
                  >
                    <img src={rockWallImg} alt="" />
                  </a>
                </div>
                <div className="col-6">
                  <a
                    target="_blank"
                    className="image fit"
                    href={dirtImg}
                    data-lightbox="gallery"
                    data-title="Operating Heavy Equipment"
                    data-alt="Operating Heavy Equipment"
                  >
                    <img src={dirtImg} alt="" />
                  </a>
                </div>
                <div className="col-6">
                  <a
                    target="_blank"
                    className="image fit"
                    href={paversImg}
                    data-lightbox="gallery"
                    data-title="Custom Pavers"
                    data-alt="Custom Pavers"
                  >
                    <img src={paversImg} alt="Custom Pavers" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
