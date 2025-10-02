const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MA Consulting</h3>
            <p className="text-gray-300">Your trusted partner in professional consulting services. Delivering excellence since day one.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Investment Consulting</li>
              <li>Business Development</li>
              <li>Marketing Strategies</li>
              <li>Tax & Customs</li>
              <li>Development Works</li>
              <li>Dedicated Support</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/team" className="hover:text-white transition">Our Team</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@maconsulting.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Business St, City, State 12345</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MA Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer