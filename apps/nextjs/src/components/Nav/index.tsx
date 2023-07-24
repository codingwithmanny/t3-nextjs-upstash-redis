// Imports
// ========================================================
import Link from "next/link";

// Component
// ========================================================
const Nav = () => {
  return <nav>
    <div className="px-8 py-6">
      <Link href="/" className="no-underline font-medium"><span>Create T3 App Turbo</span></Link>
      <ul>
        <li><Link href="/">NextJS Pages</Link></li>
        <li><Link href="http://localhost:5173">ViteJS</Link></li>
      </ul>
    </div>

  </nav>
};

// Exports
// ========================================================
export default Nav;