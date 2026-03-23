import React from 'react';

export default function ActiveTargetsTable({ tracks }) {
  const trackEntries = Object.entries(tracks);
  
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Targets Matrix</h3>
        <span className="text-xs font-mono text-gray-500">Total: {trackEntries.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs uppercase bg-[#141824] sticky top-0 border-b border-[#2f3650]">
            <tr>
              <th className="px-3 py-2 font-semibold">ID</th>
              <th className="px-3 py-2 font-semibold">Class</th>
              <th className="px-3 py-2 font-semibold text-right">Vel (px/f)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2f3650]/50 font-mono">
            {trackEntries.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-3 py-6 text-center text-gray-600 italic">No targets acquired</td>
              </tr>
            ) : (
              trackEntries.slice(0, 50).map(([id, t]) => {
                const isFast = t.speed > 15;
                
                return (
                  <tr key={id} className={`hover:bg-[#1b2030] transition-colors ${isFast ? 'bg-red-900/10' : ''}`}>
                    <td className="px-3 py-2 text-indigo-300">#{id}</td>
                    <td className="px-3 py-2 text-gray-300 uppercase">{t.label}</td>
                    <td className={`px-3 py-2 text-right ${isFast ? 'text-red-400 font-bold' : 'text-gray-400'}`}>
                      {Number(t.speed).toFixed(1)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
