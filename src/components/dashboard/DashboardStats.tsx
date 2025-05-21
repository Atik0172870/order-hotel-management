
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Coffee, CreditCard } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: React.ReactNode;
};

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <div className="flex items-center mt-1">
          {change.positive ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <p className={`text-xs ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            {change.value} vs. yesterday
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Today's Revenue"
        value="$1,249.00"
        change={{ value: "+12.5%", positive: true }}
        icon={<CreditCard className="h-5 w-5" />}
      />
      <StatCard
        title="Active Orders"
        value="24"
        change={{ value: "+8%", positive: true }}
        icon={<Coffee className="h-5 w-5" />}
      />
      <StatCard
        title="Current Guests"
        value="18"
        change={{ value: "-2%", positive: false }}
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard
        title="Staff on Duty"
        value="8"
        icon={<Users className="h-5 w-5" />}
      />
    </div>
  );
};

export default DashboardStats;
