import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// removed Select imports on purpose (we'll use a tiny inline dropdown)
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '../components/Product/ProductCard';
import useStore from '../store/useStore';
import { products, categories } from '../data/mockData';

// Products listing page with filters and search
const Products = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const { filters, setFilters, clearFilters } = useStore();

  // --- NEW: local state for Sort dropdown isolation (no Radix)
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null);
  const sortButtonRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(e.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(e.target)
      ) {
        setShowSortMenu(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setShowSortMenu(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Get initial products based on category or all products
  useEffect(() => {
    let filtered = products;

    // Filter by category if specified in URL
    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply search filter
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category && !category) {
      filtered = filtered.filter(product =>
        product.category === filters.category
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product =>
        product.rating >= filters.rating
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        // popularity - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [category, searchParams, filters]);

  // Handle filter changes
  const handlePriceRangeChange = (value) => {
    setFilters({ priceRange: value });
  };

  const handleCategoryFilter = (selectedCategory) => {
    setFilters({ category: selectedCategory });
  };

  const handleRatingFilter = (rating) => {
    setFilters({ rating });
  };

  const handleSortChange = (sortBy) => {
    setFilters({ sortBy });
  };

  // Clear all filters
  const handleClearFilters = () => {
    clearFilters();
  };

  // helper to show human label for sort
  const getSortLabel = (val) => {
    switch (val) {
      case 'popularity': return 'Most Popular';
      case 'newest': return 'Newest First';
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'rating': return 'Highest Rated';
      default: return 'Sort by';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {category ? `${category} Products` : 'All Products'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
              {searchParams.get('q') && ` for "${searchParams.get('q')}"`}
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 ">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Sort Dropdown - REPLACED: inline isolated menu (no Radix / shadcn) */}
          <div className="relative w-full md:w-48">
            <button
              ref={sortButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSortMenu((s) => !s);
              }}
              className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none"
              aria-haspopup="menu"
              aria-expanded={showSortMenu}
            >
              <span className="text-sm">{getSortLabel(filters.sortBy)}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  ref={sortMenuRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="absolute z-50 mt-2 w-full rounded-md border bg-background shadow-lg"
                  role="menu"
                >
                  <button
                    type="button"
                    onClick={() => { handleSortChange('popularity'); setShowSortMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    role="menuitem"
                  >
                    Most Popular
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleSortChange('newest'); setShowSortMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    role="menuitem"
                  >
                    Newest First
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleSortChange('price-low'); setShowSortMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    role="menuitem"
                  >
                    Price: Low to High
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleSortChange('price-high'); setShowSortMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    role="menuitem"
                  >
                    Price: High to Low
                  </button>
                  <button
                    type="button"
                    onClick={() => { handleSortChange('rating'); setShowSortMenu(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    role="menuitem"
                  >
                    Highest Rated
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 ml-auto">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="w-full md:w-80 space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Filters
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Categories */}
                    {!category && (
                      <div>
                        <h3 className="font-medium text-foreground mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => handleCategoryFilter(cat.name)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filters.category === cat.name
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                }`}
                            >
                              {cat.icon} {cat.name} ({cat.count})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          value={filters.priceRange}
                          onValueChange={handlePriceRangeChange}
                          max={1000}
                          min={0}
                          step={10}
                          className="mb-3"
                        />
                        <div className='h-2 w-full'></div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Minimum Rating</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1, 0].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRatingFilter(rating)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filters.rating === rating
                                ? 'bg-primary text-primary-foreground '
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              }`}
                          >
                            {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
                }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* No Products Found */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
