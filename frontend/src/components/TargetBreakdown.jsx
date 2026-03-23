import React from 'react';

export default function TargetBreakdown({ tracks }) {
  const counts = Object.values(tracks).reduce((acc, t) => {
    acc[t.label] = (acc[t.label] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="glass-panel rounded-xl p-5">
      <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Target Breakdown</h3>
      
      <div className="flex flex-wrap gap-2">
        {entries.length === 0 ? (
          <span className="text-sm text-gray-600">No active targets</span>
        ) : (
          entries.map(([label, count]) => (
            <div key={label} className="flex items-center gap-2 bg-[#1b2030] border border-[#2f3650] px-3 py-1.5 rounded-full">
              <span className="text-xs uppercase text-gray-300 font-semibold">{label}</span>
              <span className="bg-blue-900/40 text-blue-300 text-xs font-mono px-2 py-0.5 rounded-full">
                {count}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
