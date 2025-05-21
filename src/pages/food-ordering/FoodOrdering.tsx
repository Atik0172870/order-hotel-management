
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, PlusIcon, MinusIcon, ShoppingCart, Send, Check, Utensils, Clock, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
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
};

// Updated food items with better images
const foodItems: FoodItem[] = [
  { id: '1', name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato', price: 14.99, category: 'main', image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing and croutons', price: 12.50, category: 'starter', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '3', name: 'Grilled Salmon', description: 'Fresh salmon fillet with lemon butter sauce', price: 24.99, category: 'main', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '4', name: 'Mushroom Soup', description: 'Creamy mushroom soup with herbs', price: 8.99, category: 'starter', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '5', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 9.50, category: 'dessert', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '6', name: 'Fresh Fruit Platter', description: 'Selection of seasonal fruits', price: 7.99, category: 'dessert', image: 'https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '7', name: 'Beef Burger', description: 'Juicy beef patty with lettuce, tomato, and special sauce', price: 16.50, category: 'main', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '8', name: 'Pasta Carbonara', description: 'Creamy pasta with pancetta and parmesan', price: 15.99, category: 'main', image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: '9', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 5.99, category: 'starter', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
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
  }
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
  
  const filteredItems = foodItems.filter(item => 
    (activeCategory === 'all' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleAddToCart = (item: FoodItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
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
      timestamp: new Date()
    };
    
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setIsOrderDialogOpen(false);
    
    toast.success('Order placed successfully', {
      description: `Order for Room ${roomNumber} has been sent to the kitchen.`
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
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'preparing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Preparing</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Food Ordering</h2>
          <p className="text-muted-foreground">Manage guest food orders.</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setActiveTab('menu')}
          >
            <Utensils className="mr-2 h-4 w-4" />
            Menu
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
        <TabsList>
          <TabsTrigger value="menu">Food Menu</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="mt-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search menu..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="starter">Starters</TabsTrigger>
                    <TabsTrigger value="main">Main</TabsTrigger>
                    <TabsTrigger value="dessert">Dessert</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden flex flex-col h-full">
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
                      </AspectRatio>
                    </div>
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between mt-auto">
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                      <Button onClick={() => handleAddToCart(item)}>Add to Order</Button>
                    </CardFooter>
                  </Card>
                ))}
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
                    <p>No items added yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleAddToCart(foodItems.find(f => f.id === item.id)!)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-3 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${totalAmount.toFixed(2)}</span>
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
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Recent food orders from guests</CardDescription>
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
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.roomNumber}</TableCell>
                      <TableCell>{order.guestName}</TableCell>
                      <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)} items</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.timestamp.toLocaleTimeString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {order.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Prepare
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-500"
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
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Deliver
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent>
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
            
            <div className="border rounded-md p-3">
              <h4 className="font-medium mb-2">Order Items</h4>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-1 text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 font-medium flex justify-between">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
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
