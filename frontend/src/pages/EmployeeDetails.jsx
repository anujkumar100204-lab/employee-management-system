import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
      } catch (err) {
        console.error('Failed to load employee', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-slate-600">Loading employee details...</div>;
  }

  if (!employee) {
    return <div className="p-8 text-slate-600">Employee not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <button  
        onClick={() => navigate('/employees')}
        className="text-blue-600 hover:underline mb-4 inline-block"
        >
        <span className="font-bold">←</span> Back to Employees
        </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`/default-avatar.png`}
            alt="Profile"
            className="w-16 h-16 rounded-full bg-slate-200 object-cover"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800">{employee.full_name}</h1>
            <p className="text-sm text-gray-500">{employee.employee_id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="text-sm text-slate-700 capitalize">{employee.gender}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Department</p>
            <p className="text-sm text-slate-700">{employee.department_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm text-slate-700">{employee.phone || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Salary</p>
            <p className="text-sm text-slate-700">₹{employee.salary}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-slate-700">{employee.address || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;