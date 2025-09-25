import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  ArrowLeft,
  Heart,
  Gift,
  Truck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import useStore from '../store/useStore';
import { useToast } from '@/hooks/use-toast';

// Shopping cart page with item management
const Cart = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const { 
    cart, 
    cartTotal, 
    cartCount, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart,
    addToWishlist 
  } = useStore();
  
  const { toast } = useToast();

  // Handle quantity update
  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (item) => {
    removeFromCart(item.uniqueId || item.id);
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your cart.`,
    });
  };

  // Handle move to wishlist
  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.uniqueId || item.id);
    toast({
      title: "Moved to wishlist",
      description: `${item.name} has been moved to your wishlist.`,
    });
  };

  // Handle apply promo code
  const handleApplyPromo = () => {
    // Mock promo code validation
    const validCodes = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'SUMMER20': 20
    };
    
    if (validCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(validCodes[promoCode.toUpperCase()]);
      toast({
        title: "Promo code applied!",
        description: `You saved ${validCodes[promoCode.toUpperCase()]}% on your order.`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
  };

  // Calculate totals
  const subtotal = cartTotal;
  const discount = (subtotal * promoDiscount) / 100;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Link to="/products" className='flex justify-center'>
              <Button className="btn-hero flex h-14 transition-all duration-300">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
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
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 flex"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Shopping Cart ({cartCount} items)
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.uniqueId || item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full md:w-32 h-32 bg-secondary/50 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Link 
                                to={`/product/${item.id}`}
                                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                {item.category}
                              </p>
                              {(item.selectedSize || item.selectedColor) && (
                                <div className="flex gap-2 mt-1">
                                  {item.selectedSize && (
                                    <Badge variant="secondary">Size: {item.selectedSize}</Badge>
                                  )}
                                  {item.selectedColor && (
                                    <Badge variant="secondary">Color: {item.selectedColor}</Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            <p className="text-xl font-bold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="btn-secondary"
                                onClick={() => handleQuantityUpdate(item.uniqueId || item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-lg font-medium w-12 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="btn-secondary"
                                onClick={() => handleQuantityUpdate(item.uniqueId || item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Item Actions */}
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveToWishlist(item)}
                                className="text-muted-foreground hover:text-primary flex py-2 bg-base-200"
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item)}
                                className="text-muted-foreground hover:text-destructive flex py-2 bg-base-200"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive flex"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={handleApplyPromo} variant="outline">
                    Apply
                  </Button>
                </div>
                {promoDiscount > 0 && (
                  <p className="text-sm text-success mt-2">
                    Promo code applied! You're saving {promoDiscount}%
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({promoDiscount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full btn-hero transition-all duration-300"
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                {/* Security Features */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>{shipping === 0 ? 'Free shipping included' : 'Free shipping on orders over $50'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Link to="/products">
              <Button variant="outline" className="w-full flex mt-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;