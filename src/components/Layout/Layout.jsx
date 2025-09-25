import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

// Main layout component that wraps all pages
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content area */}
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;