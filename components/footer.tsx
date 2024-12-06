const Footer = () => {
    return (
      <footer className="bg-[#0D1B2A] text-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
          <div className="flex items-center space-x-4">
          
            <img src="/logo.png" alt="Logo" className="h-10" />
          
        </div>
            <p className="text-sm mb-6">
              There are many vari of pass of lorem ipsum available but the
              majority have suffered in some form by injected humour or words.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
  
          {/* Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-300">Our Services</a></li>
              <li><a href="#" className="hover:text-gray-300">Best Cleaning</a></li>
              <li><a href="#" className="hover:text-gray-300">Quality Polish</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">Help</a></li>
            </ul>
          </div>
  
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-sm">
              86 Road Main Buleward, <br />
              Bahria Town, Lahore
            </p>
            <p className="text-sm mt-4">
              <a href="mailto:needhelp@crsine.com" className="hover:text-gray-300">
                📧 needhelp@servismart.com
              </a>
            </p>
            <p className="text-sm">
              <a href="tel:+923258083194" className="hover:text-gray-300">
                📞 +92 3258083194
              </a>
            </p>
          </div>
  
          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for daily news and updates.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-2 w-full text-black rounded-l"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="bg-[#173049] text-center py-4 mt-10 flex  justify-between p-10">
          <p className="text-sm">
            © Copyrights, 2024 ServisMart.com
          </p>
          <p className="text-sm ">
            <a href="#" className="hover:underline">Terms & Condition</a> /{" "}
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  