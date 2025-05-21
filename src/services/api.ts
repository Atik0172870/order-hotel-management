
// This service simulates API calls to a backend
// In a real application, this would connect to your C# .NET API

// Constants for simulating network delay
const SIMULATED_DELAY_MS = 800;

// Simulated API request function with delay
const simulateApiRequest = async <T,>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, SIMULATED_DELAY_MS);
  });
};

// Types
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  status: string;
  shift: string;
}

// API service
export const api = {
  // Food ordering
  getFoodMenu: async (): Promise<FoodItem[]> => {
    const menu = [
      { id: '1', name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato', price: 14.99, category: 'main', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Sandwich' },
      { id: '2', name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing and croutons', price: 12.50, category: 'starter', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Salad' },
      { id: '3', name: 'Grilled Salmon', description: 'Fresh salmon fillet with lemon butter sauce', price: 24.99, category: 'main', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Salmon' },
      { id: '4', name: 'Mushroom Soup', description: 'Creamy mushroom soup with herbs', price: 8.99, category: 'starter', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Soup' },
      { id: '5', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 9.50, category: 'dessert', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Cake' },
      { id: '6', name: 'Fresh Fruit Platter', description: 'Selection of seasonal fruits', price: 7.99, category: 'dessert', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Fruit' },
    ];
    
    return simulateApiRequest(menu);
  },
  
  placeOrder: async (items: OrderItem[], roomNumber: string): Promise<{ success: boolean; orderId: string }> => {
    // This would make a POST request to create a new order
    return simulateApiRequest({ success: true, orderId: Math.random().toString(36).substring(2, 10) });
  },
  
  // User management
  getUsers: async (): Promise<User[]> => {
    const users = [
      { id: '1', name: 'John Smith', email: 'john.smith@example.com', role: 'Admin', status: 'active' as const, lastLogin: '2023-05-20 09:30' },
      { id: '2', name: 'Emily Johnson', email: 'emily.johnson@example.com', role: 'Manager', status: 'active' as const, lastLogin: '2023-05-19 14:45' },
      { id: '3', name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Staff', status: 'active' as const, lastLogin: '2023-05-20 08:15' },
      { id: '4', name: 'Jessica Williams', email: 'jessica.williams@example.com', role: 'Staff', status: 'inactive' as const, lastLogin: '2023-05-15 10:20' },
      { id: '5', name: 'David Miller', email: 'david.miller@example.com', role: 'Staff', status: 'active' as const, lastLogin: '2023-05-18 16:30' },
    ];
    
    return simulateApiRequest(users);
  },
  
  createUser: async (user: Partial<User>): Promise<User> => {
    // This would make a POST request to create a new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 10),
      name: user.name || 'New User',
      email: user.email || 'user@example.com',
      role: user.role || 'Staff',
      status: 'active',
      lastLogin: 'Never',
    };
    
    return simulateApiRequest(newUser);
  },
  
  // HR management
  getStaff: async (): Promise<StaffMember[]> => {
    const staff = [
      { id: '1', name: 'James Wilson', position: 'Front Desk Manager', department: 'Front Office', status: 'Full-time', shift: 'Morning' },
      { id: '2', name: 'Sarah Johnson', position: 'Chef', department: 'Kitchen', status: 'Full-time', shift: 'Evening' },
      { id: '3', name: 'Robert Brown', position: 'Housekeeping Supervisor', department: 'Housekeeping', status: 'Full-time', shift: 'Morning' },
      { id: '4', name: 'Jessica Smith', position: 'Waitress', department: 'F&B', status: 'Part-time', shift: 'Evening' },
      { id: '5', name: 'Michael Davis', position: 'Maintenance Technician', department: 'Maintenance', status: 'Full-time', shift: 'Morning' },
      { id: '6', name: 'Emma Wilson', position: 'Receptionist', department: 'Front Office', status: 'Part-time', shift: 'Night' },
      { id: '7', name: 'David Clark', position: 'Security Officer', department: 'Security', status: 'Full-time', shift: 'Night' },
    ];
    
    return simulateApiRequest(staff);
  },
  
  // Dashboard
  getDashboardStats: async (): Promise<any> => {
    const stats = {
      revenue: {
        today: 1249.00,
        yesterday: 1108.50,
        percentChange: 12.5,
      },
      orders: {
        active: 24,
        yesterday: 22,
        percentChange: 8,
      },
      guests: {
        current: 18,
        yesterday: 18.4,
        percentChange: -2,
      },
      staff: {
        onDuty: 8,
      },
    };
    
    return simulateApiRequest(stats);
  },
};

export default api;
