'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

const JeffersonRFIAnalysis = () => {
  // RFI discipline breakdown data
  const disciplineData = [
    { name: 'Structural', value: 78, percentage: 37 },
    { name: 'Mechanical', value: 52, percentage: 25 },
    { name: 'Electrical', value: 42, percentage: 20 },
    { name: 'Architectural', value: 24, percentage: 11 },
    { name: 'Civil', value: 13, percentage: 7 }
  ];

  // Updated response time data with corrected calculations
  const responseTimeData = [
    { 
      discipline: 'Structural', 
      avgDays: 24.6,
      critical: 35.2,
      target: 15
    },
    { 
      discipline: 'Mechanical', 
      avgDays: 18.4,
      critical: 28.8,
      target: 15
    },
    { 
      discipline: 'Electrical', 
      avgDays: 16.8,
      critical: 25.4,
      target: 15
    },
    { 
      discipline: 'Architectural', 
      avgDays: 15.2,
      critical: 22.6,
      target: 15
    },
    { 
      discipline: 'Civil', 
      avgDays: 12.8,
      critical: 19.5,
      target: 15
    }
  ];

  const COLORS = ['#4F46E5', '#22C55E', '#EF4444', '#F59E0B', '#6366F1'];

  // Calculate response time averages
  const overallAvg = responseTimeData.reduce((sum, item) => sum + item.avgDays, 0) / responseTimeData.length;
  const criticalAvg = responseTimeData.reduce((sum, item) => sum + item.critical, 0) / responseTimeData.length;

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: CustomLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    ) : null;
  };

  return (
    <div className="w-full space-y-4 p-4">
      {/* RFI Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>RFI Breakdown by Discipline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={disciplineData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomPieLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {disciplineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average RFI Response Times (Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={responseTimeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="discipline" />
                  <YAxis 
                    label={{ 
                      value: 'Days to Respond', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }} 
                  />
<Tooltip<any, any>
  content={(props: any) => {
    const { active, payload, label } = props;
    if (active && payload?.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-bold">{label}</p>
          <p className="text-blue-600">Average: {payload[0]?.value.toFixed(1)} days</p>
          <p className="text-red-600">Critical: {payload[1]?.value.toFixed(1)} days</p>
          <p className="text-gray-600">Target: {payload[2]?.value} days</p>
        </div>
      );
    }
    return null;
  }}
/>
                  <Legend />
                  <Bar dataKey="avgDays" name="Average Response" fill="#4F46E5" />
                  <Bar dataKey="critical" name="Critical RFIs" fill="#EF4444" />
                  <Bar dataKey="target" name="Target Response" fill="#94A3B8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded text-sm">
              <h4 className="font-bold mb-2">Response Time Analysis:</h4>
              <ul className="space-y-1">
                <li>• Overall average response: {overallAvg.toFixed(1)} days (Target: 15 days)</li>
                <li>• Critical RFI average: {criticalAvg.toFixed(1)} days</li>
                <li>• Structural RFIs exceeding target by {((responseTimeData[0].avgDays / 15 - 1) * 100).toFixed(0)}%</li>
                <li>• Only Civil discipline meeting target response times</li>
                <li>• Critical RFIs averaging {((criticalAvg / overallAvg - 1) * 100).toFixed(0)}% longer than standard RFIs</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JeffersonRFIAnalysis;