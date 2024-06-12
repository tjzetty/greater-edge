const facebookUrl = "https://www.facebook.com/profile.php?id=61560416566294";

export default function Footer() {
  return (
    <div id="footer-wrapper">
      <footer id="footer" className="container">
        <div className="row">
          <div className="col-3 col-6-medium col-12-small">
            <section className="widget links">
              <h3>Random Stuff</h3>
              <ul className="style2">
                <li>
                  <a href="#">Etiam feugiat condimentum</a>
                </li>
                <li>
                  <a href="#">Aliquam imperdiet suscipit odio</a>
                </li>
                <li>
                  <a href="#">Sed porttitor cras in erat nec</a>
                </li>
                <li>
                  <a href="#">Felis varius pellentesque potenti</a>
                </li>
                <li>
                  <a href="#">Nullam scelerisque blandit leo</a>
                </li>
              </ul>
            </section>
          </div>
          <div className="col-3 col-6-medium col-12-small">
            <section className="widget contact last">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <a
                    href={facebookUrl}
                    className="icon brands fa-facebook-f"
                    target="_blank"
                  >
                    <span className="label">Facebook</span>
                  </a>
                </li>
                {/* <li>
                            <a href="#" className="icon brands fa-instagram">
                                <span className="label">Instagram</span>
                            </a>
                            </li> */}
              </ul>
              <p>
                greateredgelandscapingllc@gmail.com
                <br />
                (810) 218-8272
              </p>
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div id="copyright">
              <ul className="menu">
                <li>
                  &copy; Greater Edge Landscaping LLC. All rights reserved
                </li>
                <li>
                  Design: <a href="http://html5up.net">HTML5 UP</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
