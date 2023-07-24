// Imports
// ========================================================
import { Link } from "react-router-dom";

// Component
// ========================================================
const Nav = () => {
  return <nav>
    <div className="px-8 py-6">
      <Link to="/" className="no-underline font-medium"><span>Create T3 App Turbo</span></Link>
      <ul>
        <li><Link to="http://localhost:3000">NextJS Pages</Link></li>
        <li><Link to="/">ViteJS</Link></li>
      </ul>
    </div>
  </nav>
};

// Exports
// ========================================================
export default Nav;