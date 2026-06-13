function Dashboard({ transactions }) {
  const income  = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savings = income > 0 ? Math.round((balance / income) * 100) : 0;
  const fmt = n => 'Rs ' + n.toLocaleString('en-IN');

  return (
    <div>
      <div className="page-title">Dashboard</div>

      <div className="stats-row">
        <div className="stat-card income">
          <div className="stat-label">Total Income</div>
          <div className="stat-value">{fmt(income)}</div>
        </div>
        <div className="stat-card expense">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">{fmt(expense)}</div>
        </div>
        <div className="stat-card balance">
          <div className="stat-label">Net Balance</div>
          <div className="stat-value">{fmt(Math.abs(balance))}</div>
        </div>
        <div className="stat-card savings">
          <div className="stat-label">Savings Rate</div>
          <div className="stat-value">{savings}%</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Recent Transactions</div>
        {transactions.length === 0 ? (
          <div className="empty">No transactions yet. Add one!</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th><th>Category</th><th>Description</th><th>Amount</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[...transactions].reverse().slice(0, 5).map(t => (
                <tr key={t.id}>
                  <td><span className={`badge ${t.type.toLowerCase()}`}>{t.type}</span></td>
                  <td>{t.category}</td>
                  <td style={{color:'#8b8fa8'}}>{t.description}</td>
                  <td><span className={`amount ${t.type.toLowerCase()}`}>
                    {t.type === 'INCOME' ? '+' : '-'}{fmt(t.amount)}
                  </span></td>
                  <td style={{color:'#8b8fa8', fontSize:'12px'}}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;