import { useEffect, useState } from 'react';
import api from '../api/axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/employees', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, department_id: departmentId },
      });
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to load employees', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(response.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [search, departmentId]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Employees</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.department_name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-slate-600">Loading employees...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Employee ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Gender</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Department</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Phone</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{emp.employee_id}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{emp.full_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 capitalize">{emp.gender}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{emp.department_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{emp.phone}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">₹{emp.salary}</td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-400">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;