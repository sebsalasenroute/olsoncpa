type CalculatorDetailsTableProps = {
  title?: string;
  rows: Array<Record<string, string | number>>;
};

export function CalculatorDetailsTable({
  title = "Detailed breakdown",
  rows
}: CalculatorDetailsTableProps) {
  if (rows.length === 0) {
    return null;
  }

  const columns = Object.keys(rows[0]);

  return (
    <section className="reveal-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-semibold text-slate-700">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className="border-t border-slate-200">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 text-slate-700">
                    {String(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
