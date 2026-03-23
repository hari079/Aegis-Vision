import React from 'react';

export default function FormationCard({ formation }) {
  let color = 'text-gray-400';
  let bg = 'bg-gray-800/30';
  
  if (formation.includes('CONVOY') || formation.includes('OFFENSIVE')) {
    color = 'text-yellow-400';
    bg = 'bg-yellow-900/20';
  } else if (formation.includes('MULTI-CLUSTER')) {
    color = 'text-orange-400';
    bg = 'bg-orange-900/20';
  }

  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col justify-between h-full">
      <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Formation Analysis</h3>
      
      <div className={`flex items-center justify-center p-4 rounded-lg border border-[#2f3650] ${bg} flex-1`}>
        <span className={`text-sm md:text-base font-bold text-center tracking-widest uppercase ${color}`}>
          {formation}
        </span>
      </div>
    </div>
  );
}
