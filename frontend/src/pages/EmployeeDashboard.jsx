import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import EmployeeLayout from '../components/EmployeeLayout';

function EmployeeDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/employees/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, []);

  const handleDownloadSlip = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/salary/slip', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `SalarySlip_${profile.employee_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error('Failed to download salary slip');
    }
  };

  return (
    <EmployeeLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Welcome, {profile ? profile.full_name : '...'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {profile ? `${profile.employee_id} • ${profile.department_name}` : ''}
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-md">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">My Details</h2>
          {profile && (
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Gender:</span> <span className="text-slate-700 capitalize">{profile.gender}</span></p>
              <p><span className="text-gray-500">Salary:</span> <span className="text-slate-700">₹{profile.salary}</span></p>
              <p><span className="text-gray-500">Phone:</span> <span className="text-slate-700">{profile.phone || '—'}</span></p>
            </div>
          )}
          <button
            onClick={handleDownloadSlip}
            className="mt-4 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Download Salary Slip
          </button>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;