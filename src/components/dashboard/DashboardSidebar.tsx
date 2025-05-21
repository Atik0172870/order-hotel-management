
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Coffee, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
  { icon: Coffee, label: 'Food Orders', path: '/food-ordering' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: ClipboardList, label: 'HR Management', path: '/hrm' },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sidebar-primary">HotelMS</h2>
      </div>
      
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
            <span className="font-medium text-sm">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-sidebar-foreground/70">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
