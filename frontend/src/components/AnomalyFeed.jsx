import React from 'react';

export default function AnomalyFeed({ anomalies }) {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Live Anomaly Feed</h3>
         <span className="flex h-2 w-2 relative">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
           <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
         </span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {anomalies.length === 0 ? (
          <div className="text-sm text-gray-600 italic mt-2">Monitoring normal bounds...</div>
        ) : (
          anomalies.map((anom, idx) => {
            const isCritical = anom.severity === 'CRITICAL';
            const isHigh = anom.severity === 'HIGH';
            
            return (
              <div 
                key={`${anom.type}-${idx}`} 
                className={`p-3 rounded-lg border-l-4 text-sm transition-colors
                  ${isCritical ? 'bg-red-950/30 border-red-500' : isHigh ? 'bg-orange-950/30 border-orange-500' : 'bg-yellow-950/30 border-yellow-500'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold tracking-widest ${isCritical ? 'text-red-400' : isHigh ? 'text-orange-400' : 'text-yellow-400'}`}>
                    {anom.severity}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">NOW</span>
                </div>
                <div className="text-gray-200 font-medium text-sm">{anom.type}</div>
                <div className="text-gray-400 text-xs mt-1">{anom.message}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
