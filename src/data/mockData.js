// Mock data for the e-commerce store - Replace with backend API calls later

export const categories = [
  { id: 1, name: 'Electronics', icon: '🔌', count: 450 },
  { id: 2, name: 'Clothing', icon: '👕', count: 320 },
  { id: 3, name: 'Home & Garden', icon: '🏠', count: 280 },
  { id: 4, name: 'Sports', icon: '⚽', count: 190 },
  { id: 5, name: 'Books', icon: '📚', count: 150 },
  { id: 6, name: 'Beauty', icon: '💄', count: 220 },
  { id: 7, name: 'Toys', icon: '🧸', count: 180 },
  { id: 8, name: 'Automotive', icon: '🚗', count: 120 },
];

export const products = [
  // Electronics
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500'
    ],
    description: 'High-quality wireless headphones with noise cancellation and superior sound quality.',
    features: ['Noise Cancellation', '30-hour Battery', 'Bluetooth 5.0', 'Quick Charge'],
    inStock: true,
    discount: 25,
    isNew: false,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500'
    ],
    description: 'Advanced smartwatch with health monitoring and fitness tracking.',
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Sleep Tracking'],
    inStock: true,
    discount: 20,
    isNew: true,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Smartphone 128GB',
    category: 'Electronics',
    price: 699.99,
    originalPrice: 799.99,
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500'
    ],
    description: 'Latest smartphone with advanced camera system and fast performance.',
    features: ['Triple Camera', '5G Ready', 'Fast Charging', '128GB Storage'],
    inStock: true,
    discount: 12,
    isNew: true,
    isFeatured: false
  },

  // Clothing
  {
    id: 4,
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
    ],
    description: 'Comfortable and stylish cotton t-shirt perfect for everyday wear.',
    features: ['100% Cotton', 'Machine Washable', 'Available in 5 Colors', 'Slim Fit'],
    inStock: true,
    discount: 25,
    isNew: false,
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Red']
  },
  {
    id: 5,
    name: 'Designer Jeans',
    category: 'Clothing',
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.4,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500'
    ],
    description: 'Premium designer jeans with perfect fit and modern style.',
    features: ['Stretch Denim', 'Modern Fit', 'Fade Resistant', 'Durable'],
    inStock: true,
    discount: 25,
    isNew: false,
    isFeatured: true,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black']
  },

  // Home & Garden
  {
    id: 6,
    name: 'Modern Table Lamp',
    category: 'Home & Garden',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'
    ],
    description: 'Elegant modern table lamp perfect for any room decoration.',
    features: ['LED Compatible', 'Adjustable Height', 'Modern Design', 'Easy Assembly'],
    inStock: true,
    discount: 20,
    isNew: true,
    isFeatured: false
  },
  {
    id: 7,
    name: 'Comfortable Office Chair',
    category: 'Home & Garden',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500'
    ],
    description: 'Ergonomic office chair designed for maximum comfort during long work sessions.',
    features: ['Ergonomic Design', 'Adjustable Height', 'Lumbar Support', '5-Year Warranty'],
    inStock: true,
    discount: 33,
    isNew: false,
    isFeatured: true
  },

  // Sports
  {
    id: 8,
    name: 'Professional Running Shoes',
    category: 'Sports',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0?w=500'
    ],
    description: 'High-performance running shoes designed for serious athletes.',
    features: ['Breathable Mesh', 'Cushioned Sole', 'Lightweight', 'Durable'],
    inStock: true,
    discount: 18,
    isNew: true,
    isFeatured: false,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue', 'Red']
  }
];

// Mock user data
export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  addresses: [
    {
      id: 1,
      type: 'home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      isDefault: true
    }
  ],
  orders: [
    {
      id: 1001,
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { id: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 }
      ]
    }
  ]
};

// Mock reviews
export const mockReviews = [
  {
    id: 1,
    productId: 1,
    user: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent sound quality and comfortable to wear for hours!',
    date: '2024-01-10',
    verified: true
  },
  {
    id: 2,
    productId: 1,
    user: 'Mike Chen',
    rating: 4,
    comment: 'Great headphones, battery life is amazing.',
    date: '2024-01-08',
    verified: true
  }
];

export default { categories, products, mockUser, mockReviews };