import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    department_id: '',
    salary: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [employeeRes, departmentsRes] = await Promise.all([
          api.get(`/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/departments', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setDepartments(departmentsRes.data);
        setFormData({
          full_name: employeeRes.data.full_name,
          phone: employeeRes.data.phone || '',
          address: employeeRes.data.address || '',
          department_id: employeeRes.data.department_id,
          salary: employeeRes.data.salary,
        });
      } catch (err) {
        console.error('Failed to load employee', err);
        toast.error('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await api.put(`/employees/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Employee updated successfully');
      navigate('/employees');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update employee');
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-600">Loading employee data...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Employee</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;