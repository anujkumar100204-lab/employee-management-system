import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Layout from '../components/Layout';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDeptName, setNewDeptName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(response.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/departments',
        { department_name: newDeptName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Department added successfully');
      setNewDeptName('');
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add department');
    }
  };

  const startEditing = (dept) => {
    setEditingId(dept.id);
    setEditingName(dept.department_name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleUpdate = async (id) => {
    if (!editingName.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/departments/${id}`,
        { department_name: editingName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Department updated successfully');
      cancelEditing();
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update department');
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete department "${name}"?`);
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Department deleted successfully');
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete department');
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Departments</h1>

        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="New department name..."
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Department
          </button>
        </form>

        {loading ? (
          <div className="text-slate-600">Loading departments...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Department Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Employee Count</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id} className="border-b border-gray-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {editingId === dept.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        dept.department_name
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{dept.employee_count}</td>
                    <td className="px-4 py-3 text-sm space-x-3">
                      {editingId === dept.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(dept.id)}
                            className="text-green-600 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(dept)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(dept.id, dept.department_name)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {departments.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-4 py-6 text-center text-sm text-gray-400">
                      No departments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Departments;