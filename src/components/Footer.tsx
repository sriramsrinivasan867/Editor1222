import { Twitter, Github, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Bgremoval.in</h3>
            <p className="text-gray-600 text-sm mb-4">
              Free online tool to remove backgrounds from images instantly using AI technology. 
              Perfect for e-commerce, social media, and professional use.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
              <Github className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-600 hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-primary">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Bgremoval.in. All rights reserved.
        </div>
      </div>
    </footer>
  );
};