
import React, { useState } from 'react';
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
  Search,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const staff = [
  { 
    id: '1', 
    firstName: 'James', 
    lastName: 'Wilson', 
    name: 'James Wilson', 
    position: 'Front Desk Manager', 
    department: 'Front Office', 
    status: 'Full-time', 
    shift: 'Morning',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952'
  },
  { 
    id: '2', 
    firstName: 'Sarah', 
    lastName: 'Johnson', 
    name: 'Sarah Johnson', 
    position: 'Chef', 
    department: 'Kitchen', 
    status: 'Full-time', 
    shift: 'Evening',
    image: null
  },
  { 
    id: '3', 
    firstName: 'Robert', 
    lastName: 'Brown', 
    name: 'Robert Brown', 
    position: 'Housekeeping Supervisor', 
    department: 'Housekeeping', 
    status: 'Full-time', 
    shift: 'Morning',
    image: null
  },
  { 
    id: '4', 
    firstName: 'Jessica', 
    lastName: 'Smith', 
    name: 'Jessica Smith', 
    position: 'Waitress', 
    department: 'F&B', 
    status: 'Part-time', 
    shift: 'Evening',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81' 
  },
  { 
    id: '5', 
    firstName: 'Michael', 
    lastName: 'Davis', 
    name: 'Michael Davis', 
    position: 'Maintenance Technician', 
    department: 'Maintenance', 
    status: 'Full-time', 
    shift: 'Morning',
    image: null
  },
  { 
    id: '6', 
    firstName: 'Emma', 
    lastName: 'Wilson', 
    name: 'Emma Wilson', 
    position: 'Receptionist', 
    department: 'Front Office', 
    status: 'Part-time', 
    shift: 'Night',
    image: null
  },
  { 
    id: '7', 
    firstName: 'David', 
    lastName: 'Clark', 
    name: 'David Clark', 
    position: 'Security Officer', 
    department: 'Security', 
    status: 'Full-time', 
    shift: 'Night',
    image: null
  },
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

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

const getRandomColor = (name: string) => {
  const colors = [
    'bg-blue-100 text-blue-600',
    'bg-purple-100 text-purple-600',
    'bg-green-100 text-green-600',
    'bg-amber-100 text-amber-600',
    'bg-pink-100 text-pink-600',
    'bg-indigo-100 text-indigo-600',
    'bg-cyan-100 text-cyan-600',
  ];
  
  // Simple hash function to determine color based on name
  const hashCode = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hashCode % colors.length];
};

const HRManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStaff = staff.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewProfile = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };
  
  const handleEditDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };
  
  const handleManageSchedule = (employee: any) => {
    toast({
      title: "Schedule Management",
      description: `Managing schedule for ${employee.name}`,
    });
  };
  
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
                <CardTitle>{staff.length}</CardTitle>
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
                <CardTitle>{leaveRequests.length}</CardTitle>
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
                  <Input 
                    placeholder="Search staff..." 
                    className="pl-10 w-[250px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            {person.image ? (
                              <AvatarImage src={person.image} alt={person.name} />
                            ) : (
                              <AvatarFallback className={getRandomColor(person.name)}>
                                {getInitials(person.firstName, person.lastName)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="font-medium">{person.name}</span>
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewProfile(person)}>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditDetails(person)}>
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleManageSchedule(person)}>
                              Manage Schedule
                            </DropdownMenuItem>
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
      
      {/* View Profile Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
            <DialogDescription>
              View employee details
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-24 w-24">
                  {selectedEmployee.image ? (
                    <AvatarImage src={selectedEmployee.image} alt={selectedEmployee.name} />
                  ) : (
                    <AvatarFallback className={`${getRandomColor(selectedEmployee.name)} text-xl`}>
                      {getInitials(selectedEmployee.firstName, selectedEmployee.lastName)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <div className="font-medium">{selectedEmployee.name}</div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Position</Label>
                  <div className="font-medium">{selectedEmployee.position}</div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <div className="font-medium">{selectedEmployee.department}</div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge variant={selectedEmployee.status === 'Full-time' ? 'default' : 'secondary'}>
                      {selectedEmployee.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Shift</Label>
                  <div className="font-medium">{selectedEmployee.shift}</div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Employee ID</Label>
                  <div className="font-medium">{selectedEmployee.id}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            <Button onClick={() => {
              setIsViewModalOpen(false);
              handleEditDetails(selectedEmployee);
            }}>Edit Details</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Details Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee information
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-24 w-24">
                  {selectedEmployee.image ? (
                    <AvatarImage src={selectedEmployee.image} alt={selectedEmployee.name} />
                  ) : (
                    <AvatarFallback className={`${getRandomColor(selectedEmployee.name)} text-xl`}>
                      {getInitials(selectedEmployee.firstName, selectedEmployee.lastName)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={selectedEmployee.firstName} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={selectedEmployee.lastName} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue={selectedEmployee.position} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue={selectedEmployee.department} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" defaultValue={selectedEmployee.status} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift</Label>
                    <Input id="shift" defaultValue={selectedEmployee.shift} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsEditModalOpen(false);
              toast({
                title: "Success",
                description: "Employee details updated successfully",
              });
            }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRManagement;
