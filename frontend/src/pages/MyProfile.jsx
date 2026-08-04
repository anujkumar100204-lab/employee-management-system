import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import EmployeeLayout from '../components/EmployeeLayout';

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/employees/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setPhone(response.data.phone || '');
      setAddress(response.data.address || '');
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await api.put(
        '/employees/me',
        { phone, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Profile updated successfully');
      setEditing(false);
      fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <EmployeeLayout>
        <div className="p-8 text-slate-600">Loading profile...</div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">My Profile</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">{profile.full_name}</h2>
            <p className="text-sm text-gray-500">{profile.employee_id}</p>
          </div>

          {editing ? (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm text-slate-700 capitalize">{profile.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm text-slate-700">{profile.department_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="text-sm text-slate-700">₹{profile.salary}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="text-gray-500 px-4 py-2 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm text-slate-700 capitalize">{profile.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm text-slate-700">{profile.department_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="text-sm text-slate-700">₹{profile.salary}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-slate-700">{profile.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-slate-700">{profile.address || '—'}</p>
                </div>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit Phone / Address
              </button>
            </>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default MyProfile;