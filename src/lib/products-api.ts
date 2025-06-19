export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  features: string[];
  reviews?: { id: string; rating: number; comment: string }[];
}

// Define a common image URL from Unsplash to be used for all products
const COMMON_PRODUCT_IMAGE_URL =
  "https://images.unsplash.com/photo-1542291026-79eddc8727ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // A generic product shot

// Mock Product Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 199.99,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Immersive sound experience with industry-leading noise cancellation. Perfect for travel and daily commutes.",
    features: [
      "Bluetooth 5.0",
      "30-hour battery life",
      "Active Noise Cancellation",
      "Comfortable over-ear design",
    ],
    reviews: [{ id: "r1", rating: 5, comment: "Amazing sound quality!" }],
  },
  {
    id: "2",
    name: "Smart Fitness Tracker Watch",
    category: "Wearables",
    price: 79.5,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Monitor your health and fitness with advanced sensors and a sleek design.",
    features: ["Heart Rate Monitor", "Sleep Tracking", "Waterproof", "GPS"],
    reviews: [
      { id: "r2", rating: 4, comment: "Great features for the price." },
    ],
  },
  {
    id: "3",
    name: "4K Ultra HD Smart TV",
    category: "Electronics",
    price: 799.0,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Stunning visual clarity and smart features for an unparalleled entertainment experience.",
    features: [
      "UHD Resolution",
      "Built-in Streaming Apps",
      "Voice Control",
      "Multiple HDMI Ports",
    ],
    reviews: [
      { id: "r3", rating: 5, comment: "Picture quality is incredible!" },
    ],
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Designed for comfort and support during long working hours. Adjustable features for personalized comfort.",
    features: [
      "Lumbar Support",
      "Adjustable Armrests",
      "Breathable Mesh",
      "Swivel Base",
    ],
    reviews: [
      {
        id: "r4",
        rating: 4,
        comment: "Very comfortable, improved my posture.",
      },
    ],
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    price: 49.95,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Powerful sound in a compact design. Perfect for outdoor adventures and parties.",
    features: [
      "Water-resistant",
      "12-hour battery",
      "Rich Bass",
      "Integrated Microphone",
    ],
    reviews: [
      {
        id: "r5",
        rating: 5,
        comment: "Loud and clear sound, excellent battery life.",
      },
    ],
  },
  {
    id: "6",
    name: "Professional DSLR Camera",
    category: "Photography",
    price: 1200.0,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Capture stunning photos and videos with advanced features and interchangeable lenses.",
    features: [
      "24MP Sensor",
      "4K Video Recording",
      "Fast Autofocus",
      "Optical Viewfinder",
    ],
    reviews: [
      {
        id: "r6",
        rating: 5,
        comment: "A fantastic camera for aspiring professionals.",
      },
    ],
  },
  {
    id: "7",
    name: "Smart Home Hub",
    category: "Smart Home",
    price: 129.0,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Control all your smart devices from one central hub. Compatible with various ecosystems.",
    features: [
      "Voice Assistant Integration",
      "Zigbee & Z-Wave Support",
      "Remote Access",
      "Automated Routines",
    ],
    reviews: [
      {
        id: "r7",
        rating: 4,
        comment: "Easy to set up, works with almost everything.",
      },
    ],
  },
  {
    id: "8",
    name: "Gaming Laptop",
    category: "Electronics",
    price: 1499.0,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "High-performance laptop for demanding games and creative tasks. Blazing fast graphics and processor.",
    features: [
      "RTX 4070",
      "Intel Core i7",
      "16GB RAM",
      "512GB SSD",
      "144Hz Display",
    ],
    reviews: [
      { id: "r8", rating: 5, comment: "Runs all my games flawlessly!" },
    ],
  },
  {
    id: "9",
    name: "Luxury Leather Wallet",
    category: "Fashion",
    price: 75.0,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Handcrafted from premium leather, offering elegance and durability.",
    features: [
      "Genuine Leather",
      "Multiple Card Slots",
      "Bill Compartment",
      "Slim Design",
    ],
    reviews: [{ id: "r9", rating: 4, comment: "Looks great, feels durable." }],
  },
  {
    id: "10",
    name: "Electric Coffee Maker",
    category: "Kitchenware",
    price: 89.99,
    imageUrl: COMMON_PRODUCT_IMAGE_URL,
    description:
      "Brew delicious coffee with ease. Programmable settings and keep-warm function.",
    features: [
      "12-cup Capacity",
      "Programmable Timer",
      "Auto Shut-off",
      "Reusable Filter",
    ],
    reviews: [
      {
        id: "r10",
        rating: 5,
        comment: "Makes excellent coffee every morning.",
      },
    ],
  },
];

// Simulated API functions
export const getProducts = (params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Product[] => {
  let filteredProducts = [...MOCK_PRODUCTS];

  if (params?.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === params.category
    );
  }
  if (params?.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= params.minPrice!
    );
  }
  if (params?.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= params.maxPrice!
    );
  }
  if (params?.search) {
    const searchTermLower = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTermLower) ||
        p.description.toLowerCase().includes(searchTermLower)
    );
  }
  return filteredProducts;
};

export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};

export const getCategories = (): string[] => {
  const categories = new Set<string>();
  MOCK_PRODUCTS.forEach((p) => categories.add(p.category));
  return Array.from(categories);
};
