import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useStore from '../store/useStore';

// Orders page showing order history
const Orders = () => {
  const { orders, isAuthenticated } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock orders data if none exist
  const mockOrders = [
    {
      id: 1001,
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { id: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' }
      ],
      trackingNumber: 'TRK123456789',
      deliveryAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 1002,
      date: '2024-01-20',
      status: 'shipping',
      total: 89.99,
      items: [
        { id: 4, name: 'Premium Cotton T-Shirt', quantity: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
        { id: 5, name: 'Designer Jeans', quantity: 1, price: 60.00, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100' }
      ],
      trackingNumber: 'TRK987654321',
      deliveryAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 1003,
      date: '2024-01-25',
      status: 'processing',
      total: 199.99,
      items: [
        { id: 2, name: 'Smart Watch Pro', quantity: 1, price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' }
      ],
      trackingNumber: null,
      deliveryAddress: '123 Main St, New York, NY 10001'
    }
  ];

  const allOrders = orders?.length > 0 ? orders : mockOrders;

  // Filter orders
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchQuery) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Simple date filtering - in a real app, you'd have more sophisticated date filtering
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'recent' && new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-success', bg: 'bg-success' };
      case 'shipping':
        return { icon: Truck, color: 'text-primary', bg: 'bg-primary' };
      case 'processing':
        return { icon: Clock, color: 'text-warning', bg: 'bg-warning' };
      default:
        return { icon: Package, color: 'text-muted-foreground', bg: 'bg-muted' };
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Please Sign In
            </h2>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to view your orders.
            </p>
            <Button onClick={() => window.location.href = '/login'} className="btn-hero">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              No orders yet
            </h1>
            <p className="text-muted-foreground mb-8">
              When you place your first order, it will appear here. Start shopping to see your order history!
            </p>
            <Button
              onClick={() => window.location.href = '/products'}
              className="btn-hero"
            >
              <Package className="h-4 w-4 mr-2" />
              Start Shopping
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Orders
          </h1>
          <p className="text-muted-foreground">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders by ID or product name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="w-48 bg-white flex flex-col">
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Filter */}
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="recent">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-gradient ">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Order #{order.id}
                          <Badge 
                            variant="secondary" 
                            className={`${statusInfo.bg} text-white flex px-2`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-xs text-muted-foreground">
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/50 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address */}
                    <div className="text-sm text-muted-foreground mb-4">
                      <strong>Delivery Address:</strong> {order.deliveryAddress}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex h-10">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {order.status === 'shipping' && (
                        <Button variant="outline" size="sm" className="flex">
                          <Truck className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                      
                      {order.status === 'delivered' && (
                        <>
                          <Button variant="outline" size="sm" className="flex">
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                          <Button variant="outline" size="sm" className="flex">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No orders found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDateFilter('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;