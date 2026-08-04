import { useEffect, useState } from 'react';
import api from '../api/axios';
import EmployeeLayout from '../components/EmployeeLayout';

function EmployeeNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/notices', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(response.data);
      } catch (err) {
        console.error('Failed to load notices', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <EmployeeLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Notices</h1>

        {loading ? (
          <div className="text-slate-600">Loading notices...</div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
              >
                <h2 className="font-semibold text-slate-800 mb-1">{notice.title}</h2>
                <p className="text-sm text-slate-600 mb-3">{notice.description}</p>
                <p className="text-xs text-gray-400">
                  {new Date(notice.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
            {notices.length === 0 && (
              <div className="text-center text-sm text-gray-400 py-6">No notices yet</div>
            )}
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeNotices;