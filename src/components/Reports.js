function Reports({ transactions }) {
  const fmt = n => 'Rs ' + n.toLocaleString('en-IN');
  const MONTHS = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const monthMap = {};
  transactions.forEach(t => {
    const key = t.date.slice(3);
    if (!monthMap[key]) monthMap[key] = { inc: 0, exp: 0 };
    if (t.type === 'INCOME') monthMap[key].inc += t.amount;
    else                     monthMap[key].exp += t.amount;
  });

  const months = Object.keys(monthMap).sort((a, b) => {
    const [ma, ya] = a.split('/').map(Number);
    const [mb, yb] = b.split('/').map(Number);
    return ya !== yb ? ya - yb : ma - mb;
  });

  return (
    <div>
      <div className="page-title">Monthly Reports</div>
      <div className="card">
        <div className="card-title">Month by Month Summary</div>
        {months.length === 0 ? (
          <div className="empty">No data yet. Add transactions first.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Savings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {months.slice().reverse().map(m => {
                const { inc, exp } = monthMap[m];
                const sav = inc - exp;
                const [mo, yr] = m.split('/');
                return (
                  <tr key={m}>
                    <td>{MONTHS[parseInt(mo)]} {yr}</td>
                    <td><span className="amount income">+{fmt(inc)}</span></td>
                    <td><span className="amount expense">-{fmt(exp)}</span></td>
                    <td>
                      <span className={`amount ${sav >= 0 ? 'income' : 'expense'}`}>
                        {fmt(Math.abs(sav))}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${sav >= 0 ? 'income' : 'expense'}`}>
                        {sav >= 0 ? 'Surplus' : 'Deficit'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;