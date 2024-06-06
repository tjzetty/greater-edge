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
            <li className="current">
              <a href="index.html">Welcome</a>
            </li>
            <li>
              <a href="right-sidebar.html">Right Sidebar</a>
            </li>
            <li>
              <a href="no-sidebar.html">No Sidebar</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
