
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserPlus, 
  Calendar, 
  ClipboardList, 
  DollarSign, 
  Clock,
  MoreVertical,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const staff = [
  { id: '1', name: 'James Wilson', position: 'Front Desk Manager', department: 'Front Office', status: 'Full-time', shift: 'Morning' },
  { id: '2', name: 'Sarah Johnson', position: 'Chef', department: 'Kitchen', status: 'Full-time', shift: 'Evening' },
  { id: '3', name: 'Robert Brown', position: 'Housekeeping Supervisor', department: 'Housekeeping', status: 'Full-time', shift: 'Morning' },
  { id: '4', name: 'Jessica Smith', position: 'Waitress', department: 'F&B', status: 'Part-time', shift: 'Evening' },
  { id: '5', name: 'Michael Davis', position: 'Maintenance Technician', department: 'Maintenance', status: 'Full-time', shift: 'Morning' },
  { id: '6', name: 'Emma Wilson', position: 'Receptionist', department: 'Front Office', status: 'Part-time', shift: 'Night' },
  { id: '7', name: 'David Clark', position: 'Security Officer', department: 'Security', status: 'Full-time', shift: 'Night' },
];

const schedules = [
  { id: '1', staffName: 'James Wilson', date: '2025-05-21', startTime: '07:00', endTime: '15:00', status: 'Completed' },
  { id: '2', staffName: 'Sarah Johnson', date: '2025-05-21', startTime: '15:00', endTime: '23:00', status: 'In Progress' },
  { id: '3', staffName: 'Robert Brown', date: '2025-05-21', startTime: '07:00', endTime: '15:00', status: 'Completed' },
  { id: '4', staffName: 'Jessica Smith', date: '2025-05-21', startTime: '18:00', endTime: '22:00', status: 'Scheduled' },
  { id: '5', staffName: 'David Clark', date: '2025-05-21', startTime: '23:00', endTime: '07:00', status: 'Scheduled' },
  { id: '6', staffName: 'James Wilson', date: '2025-05-22', startTime: '07:00', endTime: '15:00', status: 'Scheduled' },
  { id: '7', staffName: 'Sarah Johnson', date: '2025-05-22', startTime: '15:00', endTime: '23:00', status: 'Scheduled' },
];

const leaveRequests = [
  { id: '1', staffName: 'James Wilson', type: 'Annual Leave', startDate: '2025-06-01', endDate: '2025-06-07', status: 'Approved' },
  { id: '2', staffName: 'Sarah Johnson', type: 'Sick Leave', startDate: '2025-05-24', endDate: '2025-05-26', status: 'Pending' },
  { id: '3', staffName: 'Jessica Smith', type: 'Annual Leave', startDate: '2025-07-15', endDate: '2025-07-20', status: 'Approved' },
  { id: '4', staffName: 'Michael Davis', type: 'Personal Leave', startDate: '2025-06-10', endDate: '2025-06-12', status: 'Pending' },
];

const HRManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">HR Management</h2>
          <p className="text-muted-foreground">Manage staff, schedules, and leave requests.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>7</CardTitle>
                <CardDescription>Total Staff</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>5</CardTitle>
                <CardDescription>On Duty Today</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>2</CardTitle>
                <CardDescription>Leave Requests</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Directory</CardTitle>
                  <CardDescription>Manage hotel staff information</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search staff..." className="pl-10 w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.position}</TableCell>
                      <TableCell>{person.department}</TableCell>
                      <TableCell>
                        <Badge variant={person.status === 'Full-time' ? 'default' : 'secondary'}>
                          {person.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{person.shift}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Manage Schedule</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Schedule</CardTitle>
                  <CardDescription>Today and upcoming shifts</CardDescription>
                </div>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.staffName}</TableCell>
                      <TableCell>{schedule.date}</TableCell>
                      <TableCell>{schedule.startTime}</TableCell>
                      <TableCell>{schedule.endTime}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          schedule.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          schedule.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {schedule.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Shift</DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuItem>Cancel Shift</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leave">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Manage staff leave requests</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.staffName}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Deny</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRManagement;
