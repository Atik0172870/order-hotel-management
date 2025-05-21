
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, PlusIcon, MinusIcon, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

const foodItems: FoodItem[] = [
  { id: '1', name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato', price: 14.99, category: 'main', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Sandwich' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing and croutons', price: 12.50, category: 'starter', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Salad' },
  { id: '3', name: 'Grilled Salmon', description: 'Fresh salmon fillet with lemon butter sauce', price: 24.99, category: 'main', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Salmon' },
  { id: '4', name: 'Mushroom Soup', description: 'Creamy mushroom soup with herbs', price: 8.99, category: 'starter', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Soup' },
  { id: '5', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 9.50, category: 'dessert', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Cake' },
  { id: '6', name: 'Fresh Fruit Platter', description: 'Selection of seasonal fruits', price: 7.99, category: 'dessert', image: 'https://placehold.co/300x200/f8fafc/e2e8f0?text=Fruit' },
];

const FoodOrdering = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  
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
  
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Food Ordering</h2>
          <p className="text-muted-foreground">Manage guest food orders.</p>
        </div>
        <Button variant="outline" className="relative">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
          {totalCartItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              {totalCartItems}
            </Badge>
          )}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="starter">Starters</TabsTrigger>
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="dessert">Dessert</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
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
            <CardDescription>Room: <strong>103</strong> • Guest: <strong>Alex Johnson</strong></CardDescription>
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
            <Button className="w-full" disabled={cartItems.length === 0}>
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FoodOrdering;
