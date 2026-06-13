function Sidebar({ page, setPage }) {
  const items = [
    { id: 'dashboard', icon: '⬛', label: 'Dashboard'       },
    { id: 'add',       icon: '＋', label: 'Add Transaction' },
    { id: 'history',   icon: '☰',  label: 'History'         },
    { id: 'reports',   icon: '▦',  label: 'Reports'         },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">budget<span style={{color:'#f1f1f3'}}>track</span></div>
      {items.map(item => (
        <button
          key={item.id}
          className={`nav-item ${page === item.id ? 'active' : ''}`}
          onClick={() => setPage(item.id)}
        >
          <span>{item.icon}</span> {item.label}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;