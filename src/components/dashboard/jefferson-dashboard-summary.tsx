'use client';
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '../ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ComposedChart, 
  ReferenceLine 
} from 'recharts';
import { 
  AlertTriangle, 
  FileQuestion, 
  Clock, 
  CheckCircle, 
  Users 
} from 'lucide-react';
const JeffersonDashboardSummary = () => {
  // Monthly RFI Activity data
  const rfiTrends = [
    { month: '2024-05', opened: 45, closed: 40 },
    { month: '2024-06', opened: 40, closed: 36 },
    { month: '2024-07', opened: 38, closed: 35 },
    { month: '2024-08', opened: 35, closed: 32 },
    { month: '2024-09', opened: 42, closed: 38 },
    { month: '2024-10', opened: 34, closed: 30 }
  ].map(item => ({
    ...item,
    displayMonth: new Date(item.month).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }));

  // Workforce correlation data
  const workforceData = [
    { month: 'May 24', openRFIs: 95, workers: 89, criticalRFIs: 38 },
    { month: 'Jun 24', openRFIs: 104, workers: 102, criticalRFIs: 42 },
    { month: 'Jul 24', openRFIs: 125, workers: 106, criticalRFIs: 50 },
    { month: 'Aug 24', openRFIs: 134, workers: 93, criticalRFIs: 54 },
    { month: 'Sep 24', openRFIs: 171, workers: 85, criticalRFIs: 68 },
    { month: 'Oct 24', openRFIs: 209, workers: 80, criticalRFIs: 84 }
  ];

  const calculateTrailingAverage = () => {
    const lastThreeMonths = workforceData.slice(-3);
    const average = lastThreeMonths.reduce((sum, month) => sum + month.workers, 0) / 3;
    return Math.round(average);
  };

  return (
    <div className="w-full space-y-4 p-4">
      <h1 className="text-2xl font-bold">Jefferson Project Dashboard</h1>
      
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileQuestion className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Open RFIs</p>
                <p className="text-2xl font-bold">209</p>
                <p className="text-sm text-red-600">↑ 22% from Sep</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Critical RFIs</p>
                <p className="text-2xl font-bold">84</p>
                <p className="text-sm text-red-600">40% of total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Current Workers</p>
                <p className="text-2xl font-bold">80</p>
                <p className="text-sm text-red-600">↓ 26 from peak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">3-Month Avg Workers</p>
                <p className="text-2xl font-bold">{calculateTrailingAverage()}</p>
                <p className="text-sm text-gray-600">Aug-Oct Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold">$3.7M</p>
                <p className="text-sm text-green-600">↑ $1.27M from Aug</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>RFI Impact on Workforce</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={workforceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 250]}
                    label={{ value: 'RFIs', angle: -90, position: 'insideLeft' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 120]}
                    label={{ value: 'Workers', angle: 90, position: 'insideRight' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="openRFIs"
                    stroke="#dc2626"
                    strokeWidth={2}
                    yAxisId="left"
                    name="Open RFIs"
                  />
                  <Line
                    type="monotone"
                    dataKey="criticalRFIs"
                    stroke="#f97316"
                    strokeWidth={2}
                    yAxisId="left"
                    name="Critical RFIs"
                  />
                  <Line
                    type="monotone"
                    dataKey="workers"
                    stroke="#2563eb"
                    strokeWidth={2}
                    yAxisId="right"
                    name="Workers"
                  />
                  <ReferenceLine 
                    y={130} 
                    yAxisId="left" 
                    stroke="#dc2626" 
                    strokeDasharray="3 3"
                    label={{ value: 'RFI Impact Threshold', position: 'right', fill: '#dc2626' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly RFI Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rfiTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="displayMonth" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="opened" 
                    stroke="#4F46E5" 
                    name="RFIs Opened" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="closed" 
                    stroke="#22C55E" 
                    name="RFIs Closed" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JeffersonDashboardSummary;