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

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await api.put(
        '/auth/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mb-6">
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h2>

          {showPasswordForm ? (
            <form onSubmit={handleChangePassword} className="max-w-sm">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-sm font-medium text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="text-gray-500 px-4 py-2 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="text-blue-600 hover:underline text-sm"
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default MyProfile;