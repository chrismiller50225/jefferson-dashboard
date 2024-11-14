'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const JeffersonForecast = () => {
  const [forecastView, setForecastView] = useState('workers');
  
  // Scenario forecast data
  const scenarioData = [
    {
      month: 'Oct 24',
      highWorkers: 80, currWorkers: 80, lowWorkers: 80,
      highRev: 3.7, currRev: 3.7, lowRev: 3.7
    },
    {
      month: 'Nov 24',
      highWorkers: 98, currWorkers: 75, lowWorkers: 68,
      highRev: 4.8, currRev: 3.5, lowRev: 2.8
    },
    {
      month: 'Dec 24',
      highWorkers: 102, currWorkers: 73, lowWorkers: 65,
      highRev: 5.2, currRev: 3.3, lowRev: 2.5
    },
    {
      month: 'Jan 25',
      highWorkers: 105, currWorkers: 72, lowWorkers: 63,
      highRev: 5.5, currRev: 3.2, lowRev: 2.3
    }
  ];

  return (
    <div className="w-full space-y-4 p-4">
      {/* Scenario Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>3-Month Forecast Scenarios</span>
            <div className="flex gap-2">
              <button
                onClick={() => setForecastView('workers')}
                className={`px-2 py-1 text-xs rounded ${forecastView === 'workers' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Workers
              </button>
              <button
                onClick={() => setForecastView('revenue')}
                className={`px-2 py-1 text-xs rounded ${forecastView === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Revenue
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  domain={forecastView === 'workers' ? [50, 110] : [2, 6]}
                  label={{ 
                    value: forecastView === 'workers' ? 'Workers' : 'Revenue (M)', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-bold">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {forecastView === 'revenue' ? `$${entry.value}M` : entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {forecastView === 'workers' ? (
                  <>
                    <Line type="monotone" dataKey="highWorkers" stroke="#16a34a" strokeWidth={2} name="High Efficiency" />
                    <Line type="monotone" dataKey="currWorkers" stroke="#2563eb" strokeWidth={2} name="Current Trend" />
                    <Line type="monotone" dataKey="lowWorkers" stroke="#dc2626" strokeWidth={2} name="Low Efficiency" />
                  </>
                ) : (
                  <>
                    <Line type="monotone" dataKey="highRev" stroke="#16a34a" strokeWidth={2} name="High Efficiency" />
                    <Line type="monotone" dataKey="currRev" stroke="#2563eb" strokeWidth={2} name="Current Trend" />
                    <Line type="monotone" dataKey="lowRev" stroke="#dc2626" strokeWidth={2} name="Low Efficiency" />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Scenario Details */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-green-50 rounded">
              <p className="font-semibold text-green-700">High Efficiency</p>
              <p>Jan '25: {scenarioData[3].highWorkers} workers</p>
              <p>${scenarioData[3].highRev}M revenue</p>
              <p>Requires 31% workforce increase</p>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <p className="font-semibold text-blue-700">Current Trend</p>
              <p>Jan '25: {scenarioData[3].currWorkers} workers</p>
              <p>${scenarioData[3].currRev}M revenue</p>
              <p>Continued gradual decline</p>
            </div>
            <div className="p-3 bg-red-50 rounded">
              <p className="font-semibold text-red-700">Low Efficiency</p>
              <p>Jan '25: {scenarioData[3].lowWorkers} workers</p>
              <p>${scenarioData[3].lowRev}M revenue</p>
              <p>Critical intervention needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-red-600">Critical Issues</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>RFI backlog 61% above impact threshold</li>
                <li>Workforce declined 24.5% since July</li>
                <li>40% of RFIs affecting critical path</li>
                <li>Current backlog suggests continued pressure</li>
                <li>Response times exceed target by 45%</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-blue-600">Forecast Insights</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>High scenario requires 31% workforce increase</li>
                <li>Current trend suggests continued decline</li>
                <li>Revenue at risk: $2.3M-$5.5M range by Jan '25</li>
                <li>Critical RFI resolution key to improvement</li>
                <li>Structural discipline needs immediate attention</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-green-600">Recommendations</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Prioritize critical path RFI resolution</li>
                <li>Implement RFI response time tracking</li>
                <li>Add technical resources to Structural team</li>
                <li>Review workforce retention strategies</li>
                <li>Establish weekly RFI review meetings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JeffersonForecast;