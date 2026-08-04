import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Bell, LogOut } from 'lucide-react';

function EmployeeLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { to: '/employee-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/my-profile', label: 'My Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold">Vertex Technologies</h1>
          <p className="text-xs text-slate-400">Employee Portal</p>
        </div>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}

          <button
            onClick={() => navigate('/employee-notices')}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-700 transition"
          >
            <Bell size={18} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default EmployeeLayout;