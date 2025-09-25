import { create } from 'zustand';

// E-commerce Store with Zustand - Complete state management
const useStore = create((set, get) => ({
  // Theme state
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),

  // User state
  user: null,
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // Cart state
  cart: [],
  cartTotal: 0,
  cartCount: 0,
  
  // Add item to cart
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = state.cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...state.cart, { ...product, quantity }];
    }
    
    const cartTotal = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
    
    return { cart: newCart, cartTotal, cartCount };
  }),
  
  // Update cart item quantity
  updateCartItemQuantity: (productId, quantity) => set((state) => {
    const newCart = quantity <= 0 
      ? state.cart.filter(item => item.id !== productId)
      : state.cart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
    
    const cartTotal = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
    
    return { cart: newCart, cartTotal, cartCount };
  }),
  
  // Remove item from cart
  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(item => item.id !== productId);
    const cartTotal = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
    
    return { cart: newCart, cartTotal, cartCount };
  }),
  
  // Clear cart
  clearCart: () => set({ cart: [], cartTotal: 0, cartCount: 0 }),

  // Wishlist state
  wishlist: [],
  
  // Add/remove from wishlist
  addToWishlist: (product) => set((state) => ({
    wishlist: [...state.wishlist, product]
  })),
  
  removeFromWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.filter(item => item.id !== productId)
  })),
  
  isInWishlist: (productId) => {
    const state = get();
    return state.wishlist.some(item => item.id === productId);
  },

  // Search state
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),

  // Product filters
  filters: {
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'popularity'
  },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  clearFilters: () => set({
    filters: {
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'popularity'
    }
  }),

  // Orders state (mock for now - connect to backend later)
  orders: [],
  addOrder: (order) => set((state) => ({
    orders: [{ ...order, id: Date.now(), date: new Date() }, ...state.orders]
  })),

  // Loading states
  loading: {
    products: false,
    cart: false,
    auth: false
  },
  setLoading: (key, value) => set((state) => ({
    loading: { ...state.loading, [key]: value }
  })),
}));

export default useStore;