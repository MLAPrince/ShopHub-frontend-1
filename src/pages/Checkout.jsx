import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useStore from '../store/useStore';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cart, cartTotal, clearCart, addOrder } = useStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order = {
      items: cart,
      total: cartTotal,
      status: 'processing'
    };
    
    addOrder(order);
    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive an email confirmation shortly.",
    });
    
    setLoading(false);
    window.location.href = '/orders';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <Button onClick={() => window.location.href = '/products'}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
                <Input placeholder="Cardholder Name" />
                
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Billing Address</h3>
                  <div className="space-y-2">
                    <Input placeholder="Street Address" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="City" />
                      <Input placeholder="ZIP Code" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full btn-hero flex transition-all duration-300"
                  size="lg"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;