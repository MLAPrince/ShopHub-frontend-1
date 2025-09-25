import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

// Category card component for displaying product categories
const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products/${category.name}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group"
      >
        <Card className="card-gradient hover-lift text-center overflow-hidden">
          <CardContent className="p-6">
            {/* Category Icon */}
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            
            {/* Category Name */}
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            
            {/* Product Count */}
            <p className="text-sm text-muted-foreground">
              {category.count} products
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;