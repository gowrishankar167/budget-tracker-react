function History({ transactions, onDelete }) {
  const fmt = n => 'Rs ' + n.toLocaleString('en-IN');

  return (
    <div>
      <div className="page-title">Transaction History</div>
      <div className="card">
        {transactions.length === 0 ? (
          <div className="empty">No transactions yet.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...transactions].reverse().map(t => (
                <tr key={t.id}>
                  <td><span className={`badge ${t.type.toLowerCase()}`}>{t.type}</span></td>
                  <td>{t.category}</td>
                  <td style={{color:'#8b8fa8'}}>{t.description}</td>
                  <td>
                    <span className={`amount ${t.type.toLowerCase()}`}>
                      {t.type === 'INCOME' ? '+' : '-'}{fmt(t.amount)}
                    </span>
                  </td>
                  <td style={{color:'#8b8fa8', fontSize:'12px'}}>{t.date}</td>
                  <td>
                    <button className="btn-del" onClick={() => onDelete(t.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default History;