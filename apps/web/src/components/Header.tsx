import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">MA Consulting</Link>
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link></li>
          <li><Link to="/#about" className="text-gray-700 hover:text-blue-600 transition">About</Link></li>
          <li><Link to="/#services" className="text-gray-700 hover:text-blue-600 transition">Services</Link></li>
          <li><Link to="/#team" className="text-gray-700 hover:text-blue-600 transition">Team</Link></li>
          <li><Link to="/#blog" className="text-gray-700 hover:text-blue-600 transition">Blog</Link></li>
          <li><Link to="/#careers" className="text-gray-700 hover:text-blue-600 transition">Careers</Link></li>
          <li><Link to="/#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link></li>
        </ul>
        {/* Mobile menu button */}
        <button className="md:hidden">Menu</button>
      </nav>
    </header>
  )
}

export default Header