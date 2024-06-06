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
          <p>{body && body}</p>
        </div>
      </section>
    </div>
  );
}
