import React from 'react';
import JeffersonDashboardSummary from './jefferson-dashboard-summary';
import JeffersonRFIAnalysis from './jefferson-rfi-analysis';
import JeffersonForecast from './jefferson-forecast';

const JeffersonDashboard = () => {
  return (
    <div className="space-y-4">
      <JeffersonDashboardSummary />
      <JeffersonRFIAnalysis />
      <JeffersonForecast />
    </div>
  );
};

export default JeffersonDashboard;
