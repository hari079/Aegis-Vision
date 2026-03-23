import React from 'react';

export default function ControlsPanel({ 
  modelName, setModelName, 
  conf, setConf, 
  sensitivity, setSensitivity, 
  wsState,
  onReset
}) {
  return (
    <div className="glass-panel rounded-xl p-5 mb-4 space-y-5">
      <div className="flex items-center justify-between pointer-events-none">
         <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest pointer-events-auto">Pipeline Configuration</h2>
         <span className={`w-2 h-2 rounded-full ${wsState === 'connected' ? 'bg-green-400' : 'bg-red-400'}`}></span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Model Selector */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400 uppercase tracking-wide">Inference Model</label>
          <select 
            value={modelName} 
            onChange={(e) => setModelName(e.target.value)}
            className="w-full bg-[#0b0e14] border border-[#2f3650] text-[#edf1ff] text-sm rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="yolov8n.pt">YOLOv8 Nano (Fastest)</option>
            <option value="yolov8s.pt">YOLOv8 Small (Balanced)</option>
            <option value="yolov8m.pt">YOLOv8 Medium (Accurate)</option>
          </select>
        </div>

        {/* Confidence Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Confidence Thresh</label>
            <span className="text-xs text-blue-400 font-mono">{conf.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0.05" max="0.80" step="0.05"
            value={conf} onChange={(e) => setConf(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1b2030] rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Tracker Sensitivity Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Track Buffer (Frames)</label>
            <span className="text-xs text-indigo-400 font-mono">{sensitivity}</span>
          </div>
          <input 
            type="range" min="15" max="120" step="5"
            value={sensitivity} onChange={(e) => setSensitivity(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#1b2030] rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
