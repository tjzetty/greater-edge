export default function BoxCard({ imgHref, title, subtitle, body }) {
  return (
    <div className="col-4 col-12-medium">
      <section className="box feature">
        <div className="boxImage">
          <a href="#" className="image featured">
            <img src={imgHref} s alt="" />
          </a>
        </div>
        <div className="inner">
          <header>
            <h2>{title}</h2>
            <p>{subtitle && subtitle}</p>
          </header>
          <p>
            Phasellus quam turpis, feugiat sit amet in, hendrerit in lectus.
            Praesent sed semper amet bibendum tristique fringilla.
          </p>
        </div>
      </section>
    </div>
  );
}
