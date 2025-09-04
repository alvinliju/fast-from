import { Twitter, Heart, Coffee, FormInput } from "lucide-react"

function FastFormFooter() {
  return (
    <footer className="bg-white border-t border-white px-6 ">
      <div className="max-w-full mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg font-semibold text-gray-900">FastForms</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Forms that don't suck. Create beautiful, mobile-first forms in seconds.
            </p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>Built with</span>
              <Coffee className="h-3 w-3" />
              <span>3 Red Bulls by</span>
              <a 
                href="https://twitter.com/e3he0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                @e3he0
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="/forms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">My Forms</a></li>
              <li><a href="/builder" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Create Form</a></li>
              <li><a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
              <li><a href="/templates" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Templates</a></li>
              <li><a href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</a></li>
              <li>
                <a 
                  href="https://twitter.com/e3he0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
                >
                  <Twitter className="h-3 w-3" />
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8  border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">© 2025 FastForms. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a 
                href="https://twitter.com/e3he0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FastFormFooter }