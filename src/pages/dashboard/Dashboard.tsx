
import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Pizza, Calendar, Users, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const revenueData = [
  { name: 'Mon', revenue: 2400 },
  { name: 'Tue', revenue: 1398 },
  { name: 'Wed', revenue: 9800 },
  { name: 'Thu', revenue: 3908 },
  { name: 'Fri', revenue: 4800 },
  { name: 'Sat', revenue: 5800 },
  { name: 'Sun', revenue: 4300 },
];

const occupancyData = [
  { name: 'Occupied', value: 65, color: '#3b82f6' },
  { name: 'Reserved', value: 15, color: '#f59e0b' },
  { name: 'Available', value: 20, color: '#10b981' },
];

const foodOrdersByCategory = [
  { name: 'Main Course', value: 40, color: '#f97316' },
  { name: 'Appetizers', value: 25, color: '#8b5cf6' },
  { name: 'Desserts', value: 15, color: '#ec4899' },
  { name: 'Beverages', value: 20, color: '#06b6d4' },
];

const recentOrders = [
  { id: '01', roomNumber: '103', customer: 'Alex Johnson', items: 'Club Sandwich, Fries', status: 'Delivered', amount: '$24.99' },
  { id: '02', roomNumber: '212', customer: 'Sarah Williams', items: 'Caesar Salad', status: 'Preparing', amount: '$18.50' },
  { id: '03', roomNumber: '145', customer: 'Mark Thompson', items: 'Steak, Wine', status: 'In Progress', amount: '$89.99' },
  { id: '04', roomNumber: '301', customer: 'Emma Davis', items: 'Pasta Carbonara', status: 'Delivered', amount: '$22.50' },
  { id: '05', roomNumber: '118', customer: 'Robert Wilson', items: 'Breakfast Set', status: 'Delivered', amount: '$15.99' },
];

const upcomingCheckIns = [
  { id: '01', roomNumber: '205', customer: 'Jennifer Adams', checkIn: '2025-05-21 14:00', nights: 3 },
  { id: '02', roomNumber: '310', customer: 'Michael Brown', checkIn: '2025-05-21 15:00', nights: 1 },
  { id: '03', roomNumber: '407', customer: 'Lisa Garcia', checkIn: '2025-05-22 12:00', nights: 5 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Delivered</Badge>;
      case 'Preparing':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Preparing</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to your hotel management dashboard.</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => navigate('/food-ordering')}>
            <Utensils className="mr-2 h-4 w-4" />
            Food Orders
          </Button>
          <Button variant="outline" onClick={() => navigate('/users')}>
            <Users className="mr-2 h-4 w-4" />
            Guests
          </Button>
        </div>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Overview Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily revenue for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Room Occupancy Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Room Occupancy</CardTitle>
            <CardDescription>Current room status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Food Order Analytics */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Food Orders</CardTitle>
                <CardDescription>Orders by category</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/food-ordering')}>
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={foodOrdersByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {foodOrdersByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button onClick={() => navigate('/food-ordering')} className="h-auto flex-col py-6 gap-2">
              <Pizza className="h-8 w-8" />
              <span>Food Orders</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6 gap-2">
              <Calendar className="h-8 w-8" />
              <span>Reservations</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6 gap-2">
              <Users className="h-8 w-8" />
              <span>Check In/Out</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-6 gap-2">
              <Utensils className="h-8 w-8" />
              <span>Room Service</span>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="check-ins">Upcoming Check-ins</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest food orders from guests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.roomNumber}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="text-right">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => navigate('/food-ordering')}>
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="check-ins">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Check-ins</CardTitle>
              <CardDescription>Guests checking in today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead className="text-right">Stay Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingCheckIns.map((checkIn) => (
                    <TableRow key={checkIn.id}>
                      <TableCell className="font-medium">{checkIn.roomNumber}</TableCell>
                      <TableCell>{checkIn.customer}</TableCell>
                      <TableCell>
                        {new Date(checkIn.checkIn).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="text-right">{checkIn.nights} night{checkIn.nights > 1 ? 's' : ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View All Reservations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
