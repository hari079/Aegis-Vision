import React from 'react';

export default function ThreatScoreCard({ score }) {
  const isHigh = score > 50;
  
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col justify-between">
      <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Threat Level</h3>
      <div className="flex items-end gap-3 mt-2">
        <span className={`text-4xl font-bold tracking-tighter ${isHigh ? 'text-red-500' : 'text-green-400'}`}>
          {score}
        </span>
        <span className="text-sm text-gray-500 mb-1 font-mono">/ 100</span>
      </div>
      
      <div className="mt-4 w-full bg-[#1b2030] rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${isHigh ? 'bg-red-500' : 'bg-green-400'}`}
          style={{ width: `${Math.max(5, score)}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-3 uppercase tracking-widest text-right">
        {isHigh ? 'ELEVATED RISK' : 'NOMINAL'}
      </p>
    </div>
  );
}
