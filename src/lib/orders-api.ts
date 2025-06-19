// src/lib/orders-api.ts

// Define types for Order and OrderItem
export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string; // To associate orders with a user (mock userId for now)
  orderDate: string; // e.g., "2023-04-15"
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
}

// Mock Order Data
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD001',
    userId: 'test@example.com', // Matches our mock user
    orderDate: '2023-05-10',
    totalAmount: 209.99,
    status: 'Delivered',
    items: [
      { productId: '1', name: 'Wireless Noise-Cancelling Headphones', imageUrl: 'https://placehold.co/96x96/E5E7EB/1F2937?text=Headphones', price: 199.99, quantity: 1 },
      { productId: '5', name: 'Portable Bluetooth Speaker', imageUrl: 'https://placehold.co/96x96/E5E7EB/1F2937?text=Bluetooth+Speaker', price: 49.95, quantity: 1 },
    ],
    shippingAddress: {
      fullName: 'Test User',
      address: '123 Mockingbird Ln',
      city: 'Mockville',
      zip: '12345',
      country: 'USA',
    },
  },
  {
    id: 'ORD002',
    userId: 'test@example.com', // Matches our mock user
    orderDate: '2023-06-01',
    totalAmount: 89.50,
    status: 'Shipped',
    items: [
      { productId: '2', name: 'Smart Fitness Tracker Watch', imageUrl: 'https://placehold.co/96x96/E5E7EB/1F2937?text=Fitness+Watch', price: 79.50, quantity: 1 },
    ],
    shippingAddress: {
      fullName: 'Test User',
      address: '123 Mockingbird Ln',
      city: 'Mockville',
      zip: '12345',
      country: 'USA',
    },
  },
  {
    id: 'ORD003',
    userId: 'another@example.com', // This user's orders won't show for 'test@example.com'
    orderDate: '2023-06-15',
    totalAmount: 1499.00,
    status: 'Processing',
    items: [
      { productId: '8', name: 'Gaming Laptop', imageUrl: 'https://placehold.co/96x96/E5E7EB/1F2937?text=Gaming+Laptop', price: 1499.00, quantity: 1 },
    ],
    shippingAddress: {
      fullName: 'Another User',
      address: '456 Fictional Rd',
      city: 'Faketown',
      zip: '67890',
      country: 'USA',
    },
  },
];

// Simulated API function to get orders for a specific user
export const getUserOrders = (userId: string): Order[] => {
  return MOCK_ORDERS.filter(order => order.userId === userId).sort((a, b) => {
    // Sort by date, newest first
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
  });
};
