import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Layout from '../components/Layout';

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/notices',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Notice added successfully');
      setTitle('');
      setDescription('');
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add notice');
    }
  };

  const startEditing = (notice) => {
    setEditingId(notice.id);
    setEditTitle(notice.title);
    setEditDescription(notice.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdate = async (id) => {
    if (!editTitle.trim() || !editDescription.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/notices/${id}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Notice updated successfully');
      cancelEditing();
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update notice');
    }
  };

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(`Delete notice "${title}"?`);
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Notice deleted successfully');
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete notice');
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Notices</h1>

        <form
          onSubmit={handleAdd}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 max-w-2xl"
        >
          <input
            type="text"
            placeholder="Notice title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Notice description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Notice
          </button>
        </form>

        {loading ? (
          <div className="text-slate-600">Loading notices...</div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
              >
                {editingId === notice.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="space-x-3">
                      <button
                        onClick={() => handleUpdate(notice.id)}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-500 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-slate-800 mb-1">{notice.title}</h2>
                    <p className="text-sm text-slate-600 mb-3">{notice.description}</p>
                    <p className="text-xs text-gray-400 mb-3">
                      {new Date(notice.created_at).toLocaleDateString()}
                    </p>
                    <div className="space-x-3">
                      <button
                        onClick={() => startEditing(notice)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id, notice.title)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {notices.length === 0 && (
              <div className="text-center text-sm text-gray-400 py-6">No notices yet</div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notices;