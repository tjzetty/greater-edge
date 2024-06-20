import { Match } from "preact-router/match";
import { Link } from "preact-router/match";

export default function Header() {
  return (
    <div id="header-wrapper">
      <header id="header" className="container">
        <div id="logo">
          <h1>
            <a href="/">
              Greater Edge
              <br />
              Landscaping
            </a>
          </h1>
          <span>LLC</span>
        </div>

        <nav id="nav">
          <ul>
            <Match path="/">
              {({ matches }) => (
                <li className={matches ? "current" : ""}>
                  <Link href="/">Home</Link>
                </li>
              )}
            </Match>
            <Match path="/gallery">
              {({ matches }) => (
                <li className={matches ? "current" : ""}>
                  <Link href="/gallery">Gallery</Link>
                </li>
              )}
            </Match>
            <Match path="/contact">
              {({ matches }) => (
                <li className={matches ? "current" : ""}>
                  <Link href="/contact">Contact Us</Link>
                </li>
              )}
            </Match>
          </ul>
        </nav>
      </header>
    </div>
  );
}
