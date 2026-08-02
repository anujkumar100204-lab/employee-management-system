import { useEffect, useState } from 'react';
import api from '../api/axios';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data.stats);
        setChartData(response.data.chartData);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      }
    };

    fetchDashboard();
  }, []);

  if (!stats) {
    return <div className="p-8 text-slate-600">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold text-blue-600">{stats.total_employees}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Departments</p>
          <p className="text-2xl font-bold text-blue-600">{stats.total_departments}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Male Employees</p>
          <p className="text-2xl font-bold text-slate-700">{stats.male_employees}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Female Employees</p>
          <p className="text-2xl font-bold text-slate-700">{stats.female_employees}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Employees by Department
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {chartData.map((dept) => (
            <div
              key={dept.department_name}
              className="bg-slate-50 p-4 rounded-lg border border-gray-200"
            >
              <p className="text-sm text-gray-500">{dept.department_name}</p>
              <p className="text-xl font-bold text-blue-600">{dept.employee_count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;