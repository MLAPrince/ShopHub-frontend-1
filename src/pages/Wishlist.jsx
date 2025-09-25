import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '../components/Product/ProductCard';
import useStore from '../store/useStore';
import { useToast } from '@/hooks/use-toast';

// Wishlist page showing saved products
const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, clearCart } = useStore();
  const { toast } = useToast();

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  // Handle add all to cart
  const handleAddAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product, 1);
    });
    toast({
      title: "Added to cart!",
      description: `${wishlist.length} items have been added to your cart.`,
    });
  };

  // Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your wishlist is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <Button
              onClick={() => window.location.href = '/products'}
              className="btn-hero flex transition-all duration-300"
            >
              <Heart className="h-4 w-4 mr-1" />
              Start Wishlist
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  // Share functionality - simplified for demo
                  navigator.share?.({
                    title: 'My Wishlist',
                    text: 'Check out my wishlist!',
                    url: window.location.href
                  }).catch(() => {
                    // Fallback for browsers that don't support Web Share API
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link copied!",
                      description: "Wishlist link copied to clipboard.",
                    });
                  });
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button
                onClick={handleAddAllToCart}
                className="btn-hero"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlist.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Remove Button Overlay */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>

                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Wishlist Actions */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Ready to purchase?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add all items to your cart and proceed to checkout
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={handleAddAllToCart}
                    className="w-full btn-hero"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add All to Cart ({wishlist.length} items)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      wishlist.forEach(product => removeFromWishlist(product.id));
                      toast({
                        title: "Wishlist cleared",
                        description: "All items have been removed from your wishlist.",
                      });
                    }}
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically show recommended products based on wishlist items */}
            <div className="text-center text-muted-foreground py-8 col-span-full">
              <p>Recommendations will appear here based on your wishlist items.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;