
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, PlusIcon, MinusIcon, ShoppingCart, Send, Check, Utensils, Clock, X, Pizza, ThumbsUp, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogTrigger, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
  tags?: string[];
  preparationTime?: string;
};

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  roomNumber: string;
  guestName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  timestamp: Date;
  notes?: string;
};

// Expanded food items with more variety and better categorization
const foodItems: FoodItem[] = [
  { id: '1', name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato', price: 14.99, category: 'sandwiches', image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['lunch', 'quick'], preparationTime: '15 min' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing and croutons', price: 12.50, category: 'salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['healthy', 'vegetarian'], preparationTime: '10 min' },
  { id: '3', name: 'Grilled Salmon', description: 'Fresh salmon fillet with lemon butter sauce', price: 24.99, category: 'mains', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['dinner', 'seafood'], preparationTime: '25 min' },
  { id: '4', name: 'Mushroom Soup', description: 'Creamy mushroom soup with herbs', price: 8.99, category: 'starters', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['vegetarian', 'comfort'], preparationTime: '20 min' },
  { id: '5', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 9.50, category: 'desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['sweet', 'chocolate'], preparationTime: '5 min' },
  { id: '6', name: 'Fresh Fruit Platter', description: 'Selection of seasonal fruits', price: 7.99, category: 'desserts', image: 'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['healthy', 'vegan'], preparationTime: '10 min' },
  { id: '7', name: 'Beef Burger', description: 'Juicy beef patty with lettuce, tomato, and special sauce', price: 16.50, category: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['lunch', 'dinner'], preparationTime: '20 min' },
  { id: '8', name: 'Pasta Carbonara', description: 'Creamy pasta with pancetta and parmesan', price: 15.99, category: 'pasta', image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['dinner', 'italian'], preparationTime: '25 min' },
  { id: '9', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 5.99, category: 'starters', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['vegetarian', 'side'], preparationTime: '10 min' },
  { id: '10', name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with mozzarella', price: 17.99, category: 'pizza', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['dinner', 'italian'], preparationTime: '20 min' },
  { id: '11', name: 'Vegetarian Pizza', description: 'Fresh vegetables on a crispy crust', price: 16.99, category: 'pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['vegetarian', 'dinner'], preparationTime: '20 min' },
  { id: '12', name: 'Chicken Wrap', description: 'Grilled chicken with fresh veggies in a tortilla', price: 12.99, category: 'sandwiches', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['lunch', 'quick'], preparationTime: '15 min' },
  { id: '13', name: 'Greek Salad', description: 'Tomatoes, cucumbers, olives, and feta cheese', price: 11.99, category: 'salads', image: 'https://images.unsplash.com/photo-1608032773116-38d48a1dd4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['healthy', 'vegetarian'], preparationTime: '10 min' },
  { id: '14', name: 'Cheesecake', description: 'Creamy New York style cheesecake', price: 8.99, category: 'desserts', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['sweet', 'dessert'], preparationTime: '5 min' },
  { id: '15', name: 'Chicken Alfredo', description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken', price: 18.99, category: 'pasta', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['dinner', 'italian'], preparationTime: '25 min' },
  { id: '16', name: 'BBQ Chicken Pizza', description: 'BBQ sauce, grilled chicken, red onions, and cilantro', price: 18.99, category: 'pizza', image: 'https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['dinner', 'bbq'], preparationTime: '20 min' },
  { id: '17', name: 'Avocado Toast', description: 'Smashed avocado on toasted artisan bread', price: 10.99, category: 'breakfast', image: 'https://images.unsplash.com/photo-1588137378633-56eb9d9ceb6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['breakfast', 'vegetarian'], preparationTime: '10 min' },
  { id: '18', name: 'Veggie Burger', description: 'Plant-based patty with all the fixings', price: 15.99, category: 'burgers', image: 'https://images.unsplash.com/photo-1585238342070-61e1e768b1ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['vegetarian', 'vegan'], preparationTime: '20 min' },
  { id: '19', name: 'Pancake Stack', description: 'Fluffy pancakes with maple syrup and berries', price: 11.99, category: 'breakfast', image: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', popular: true, tags: ['breakfast', 'sweet'], preparationTime: '15 min' },
  { id: '20', name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 9.99, category: 'desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', tags: ['italian', 'coffee'], preparationTime: '5 min' },
];

// Sample past orders for the order history
const pastOrders: Order[] = [
  {
    id: 'order-001',
    roomNumber: '103',
    guestName: 'Alex Johnson',
    items: [
      { id: '1', name: 'Club Sandwich', price: 14.99, quantity: 1 },
      { id: '5', name: 'Chocolate Cake', price: 9.50, quantity: 1 }
    ],
    totalAmount: 24.49,
    status: 'delivered',
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 'order-002',
    roomNumber: '205',
    guestName: 'Sarah Williams',
    items: [
      { id: '3', name: 'Grilled Salmon', price: 24.99, quantity: 2 },
      { id: '6', name: 'Fresh Fruit Platter', price: 7.99, quantity: 1 }
    ],
    totalAmount: 57.97,
    status: 'preparing',
    timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
  },
  {
    id: 'order-003',
    roomNumber: '118',
    guestName: 'Robert Chen',
    items: [
      { id: '10', name: 'Pepperoni Pizza', price: 17.99, quantity: 1 },
      { id: '9', name: 'Garlic Bread', price: 5.99, quantity: 1 },
      { id: '14', name: 'Cheesecake', price: 8.99, quantity: 1 }
    ],
    totalAmount: 32.97,
    status: 'pending',
    timestamp: new Date(Date.now() - 900000) // 15 minutes ago
  }
];

// All food categories
const foodCategories = [
  { id: 'all', name: 'All' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'starters', name: 'Starters' },
  { id: 'salads', name: 'Salads' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' }
];

const FoodOrdering = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');
  const [roomNumber, setRoomNumber] = useState('103');
  const [guestName, setGuestName] = useState('Alex Johnson');
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(pastOrders);
  const [orderNotes, setOrderNotes] = useState('');
  const [showPopularItems, setShowPopularItems] = useState(true);
  
  const filteredItems = foodItems.filter(item => 
    (activeCategory === 'all' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))))
  );
  
  const popularItems = foodItems.filter(item => item.popular);
  
  const handleAddToCart = (item: FoodItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        toast.success(`Added ${item.name} to your order`, {
          description: `${item.preparationTime || '15-20 min'} preparation time`
        });
        return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      }
    });
  };
  
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(i => 
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prev.filter(i => i.id !== itemId);
      }
    });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    
    const newOrder: Order = {
      id: `order-${Math.floor(Math.random() * 1000)}`,
      roomNumber,
      guestName,
      items: [...cartItems],
      totalAmount: totalAmount,
      status: 'pending',
      timestamp: new Date(),
      notes: orderNotes
    };
    
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setOrderNotes('');
    setIsOrderDialogOpen(false);
    
    toast.success('Order placed successfully', {
      description: `Order for Room ${roomNumber} has been sent to the kitchen.`,
      icon: <Check className="h-4 w-4 text-green-500" />
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    const statusMessages = {
      preparing: 'Order is being prepared in the kitchen',
      delivered: 'Order has been delivered to the guest',
      cancelled: 'Order has been cancelled'
    };
    
    toast.info(`Order status updated: ${newStatus}`, {
      description: statusMessages[newStatus]
    });
  };
  
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const getStatusBadge = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'preparing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Preparing</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Food Ordering</h2>
          <p className="text-muted-foreground">Browse our menu and place your order.</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'menu' ? "default" : "outline"} 
            className="relative"
            onClick={() => setActiveTab('menu')}
          >
            <Utensils className="mr-2 h-4 w-4" />
            Menu
          </Button>
          <Button 
            variant={activeTab === 'orders' ? "default" : "outline"} 
            className="relative"
            onClick={() => setActiveTab('orders')}
          >
            <Clock className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button 
            variant={cartItems.length > 0 ? "default" : "outline"} 
            className="relative"
            onClick={() => setIsOrderDialogOpen(true)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart
            {totalCartItems > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {totalCartItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'menu' | 'orders')}>
        <TabsContent value="menu" className="mt-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search menu by name, description, or tags..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <ScrollArea className="h-16">
                <div className="flex space-x-2 pb-4">
                  {foodCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              
              {showPopularItems && activeCategory === 'all' && searchQuery === '' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Popular Items</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {popularItems.map((item) => (
                      <Card key={`popular-${item.id}`} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="w-full h-48 relative">
                          <AspectRatio ratio={16 / 9} className="bg-muted">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="rounded-t-lg object-cover w-full h-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://placehold.co/300x200/f8fafc/e2e8f0?text=${encodeURIComponent(item.name)}`;
                              }}
                            />
                            {item.popular && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                              </div>
                            )}
                          </AspectRatio>
                        </div>
                        <CardHeader className="p-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                          </div>
                          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                          {item.preparationTime && (
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.preparationTime} prep time
                            </div>
                          )}
                        </CardHeader>
                        <CardFooter className="p-3 pt-0 mt-auto">
                          <Button onClick={() => handleAddToCart(item)} className="w-full">
                            Add to Order
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  <div className="border-b my-6"></div>
                </div>
              )}
              
              <div className="space-y-3">
                {activeCategory !== 'all' && (
                  <h3 className="text-lg font-semibold">
                    {foodCategories.find(cat => cat.id === activeCategory)?.name || 'Menu Items'}
                  </h3>
                )}
                {searchQuery && (
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredItems.length} results for "{searchQuery}"
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="w-full h-48 relative">
                          <AspectRatio ratio={16 / 9} className="bg-muted">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="rounded-t-lg object-cover w-full h-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://placehold.co/300x200/f8fafc/e2e8f0?text=${encodeURIComponent(item.name)}`;
                              }}
                            />
                            {item.popular && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                              </div>
                            )}
                          </AspectRatio>
                        </div>
                        <CardHeader className="p-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                          </div>
                          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {item.preparationTime && (
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.preparationTime} prep time
                            </div>
                          )}
                        </CardHeader>
                        <CardFooter className="p-3 pt-0 mt-auto">
                          <Button onClick={() => handleAddToCart(item)} className="w-full">
                            Add to Order
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Pizza className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No items found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <Card className="w-full md:w-80 flex flex-col h-fit sticky top-6">
              <CardHeader>
                <CardTitle>Current Order</CardTitle>
                <CardDescription>
                  Room: <strong>{roomNumber}</strong> • Guest: <strong>{guestName}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="mx-auto h-8 w-8 mb-2 text-muted-foreground/60" />
                    <p>Your cart is empty</p>
                    <p className="text-sm mt-1">Add items from the menu to start your order</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <MinusIcon className="h-3 w-3" />
                          </Button>
                          <span className="w-4 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleAddToCart(foodItems.find(f => f.id === item.id)!)}
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-3 mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service Charge (10%):</span>
                        <span>${(totalAmount * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span>${(totalAmount * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={cartItems.length === 0}
                  onClick={() => setIsOrderDialogOpen(true)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {cartItems.length > 0 ? 'Place Order' : 'Add Items to Order'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Track and manage guest food orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id} className="group hover:bg-muted/40">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.roomNumber}</TableCell>
                        <TableCell>{order.guestName}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 items-center">
                            <span>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                            <div className="group-hover:block hidden">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">View</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Order Details</DialogTitle>
                                    <DialogDescription>
                                      {order.id} • Room {order.roomNumber} • {order.guestName}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Items</h4>
                                      <div className="space-y-2">
                                        {order.items.map((item, idx) => (
                                          <div key={idx} className="flex justify-between">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="border-t pt-2">
                                      <div className="flex justify-between font-medium">
                                        <span>Total:</span>
                                        <span>${order.totalAmount.toFixed(2)}</span>
                                      </div>
                                    </div>
                                    {order.notes && (
                                      <div>
                                        <h4 className="font-medium mb-1">Special Instructions</h4>
                                        <p className="text-sm p-2 bg-muted rounded">{order.notes}</p>
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-medium mb-1">Order Status</h4>
                                      <div>{getStatusBadge(order.status)}</div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{order.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date().toDateString() === order.timestamp.toDateString() 
                                ? 'Today' 
                                : order.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {order.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                                  className="h-8"
                                >
                                  <Clock className="h-3 w-3 mr-1" />
                                  Prepare
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-500 h-8"
                                  onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                            {order.status === 'preparing' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                className="h-8"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Deliver
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Review your items and provide room information to place your order.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="orderNotes">Special Instructions (Optional)</Label>
              <Input
                id="orderNotes"
                placeholder="Allergies, preferences, etc."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="border rounded-md p-3">
              <h4 className="font-medium mb-2">Order Items</h4>
              {cartItems.length > 0 ? (
                <div className="max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-1 text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Charge (10%)</span>
                      <span>${(totalAmount * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-1 pt-1 border-t">
                      <span>Total</span>
                      <span>${(totalAmount * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No items in your order.</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
              <Send className="h-4 w-4 mr-2" /> Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodOrdering;
