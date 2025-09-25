import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  Package,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import useStore from '../../store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// NOTE: Removed Radix Dropdown imports on purpose.
// The rest of the header is untouched; only the user menu is self-managed.

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const {
    theme,
    toggleTheme,
    cartCount,
    user,
    isAuthenticated,
    logout,
    searchQuery,
    setSearchQuery
  } = useStore();

  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  // scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close user menu on route change
  useEffect(() => {
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // close on outside click & esc
  useEffect(() => {
    function onDocClick(e) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setShowUserMenu(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Electronics', path: '/products/Electronics' },
    { name: 'Clothing', path: '/products/Clothing' },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-background'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between h-16 md:h-20 gap-10">          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gradient-primary">
                ShopHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative text-sm font-medium transition-all duration-300 ${location.pathname === item.path
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className="relative">
                  {item.name}
                  <span className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ${location.pathname === item.path
                      ? 'w-full opacity-100'
                      : 'w-0 group-hover:w-full opacity-70'
                    }`} />
                </span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 input-modern"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="btn btn-secondary hover-lift transition-all duration-200"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="btn btn-secondary relative hover-lift transition-all duration-200 ">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* --- USER MENU (REPLACED: no Radix, no slide) --- */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  ref={userButtonRef}
                  variant="ghost"
                  size="sm"
                  aria-haspopup="true"
                  aria-expanded={showUserMenu}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu((s) => !s);
                  }}
                  className="flex items-center gap-2 hover:bg-transparent bg-transparent hover:scale-110 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block font-medium">{user?.name || 'User'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      ref={userMenuRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-4 w-48 rounded-sm flex flex-col gap-1 py-2 bg-background border shadow-md z-50"
                      onKeyDown={(e) => { if (e.key === 'Escape') setShowUserMenu(false); }}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-1 rounded-none hover:bg-indigo-100"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-1 rounded-none hover:bg-indigo-100"
                      >
                        <Package className="h-4 w-4" />
                        Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-1 rounded-none hover:bg-indigo-100"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-1 rounded-none hover:bg-indigo-100"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>

                      <div className="px-3"><div className="my-1 h-px bg-muted" /></div>

                      <button
                        onClick={() => { setShowUserMenu(false); logout && logout(); }}
                        className="flex items-center gap-2 px-3 py-1 text-destructive hover:bg-red-100 rounded-none"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/wishlist">
                  <Button variant="ghost" size="sm" className="hover-lift">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="btn-hero hidden md:flex">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="btn-hero hidden md:flex">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile User Button */}
            {/* <Link to={isAuthenticated ? "/profile" : "/login"} className="md:hidden">
              <Button variant="ghost" size="sm" className="hover-lift">
                <User className="h-5 w-5" />
              </Button>
            </Link> */}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 input-modern"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-2 border-t space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
