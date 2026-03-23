import React, { useRef, useState } from 'react';

export default function VideoFeed({ 
  frame, 
  wsState, 
  processing, 
  done, 
  progress, 
  rawVideoUrl, 
  onUpload, 
  onPauseToggle, 
  paused 
}) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && wsState === 'connected') onUpload(file);
  };

  return (
    <div className="glass-panel rounded-xl flex flex-col h-full overflow-hidden relative">
      <div className="px-5 py-3 border-b border-[#2f3650] flex justify-between items-center bg-[#0f121a]">
        <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Live Surveillance Feed
        </h2>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={onPauseToggle}
            className="px-3 py-1 text-xs font-semibold bg-[#1b2030] border border-[#3c4462] hover:bg-[#252b40] rounded text-gray-200 transition-colors"
          >
            {paused ? 'RESUME PLAYBACK' : 'PAUSE TICK'}
          </button>
        </div>
      </div>

      <div 
        className={`flex-1 relative flex items-center justify-center bg-black overflow-hidden
          ${dragging ? 'ring-2 ring-blue-500 bg-[#121622]/80' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
      >
        {frame ? (
          <>
            <img src={frame} alt="Video Stream" className="w-full h-full object-contain" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2 py-1 bg-red-600/90 text-white text-xs font-bold rounded animate-blink tracking-wider shadow-lg">
                LIVE
              </span>
              <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-gray-200 text-xs font-mono rounded border border-gray-700 shadow-lg">
                FPS: 24.0
              </span>
            </div>
          </>
        ) : rawVideoUrl ? (
          <video src={rawVideoUrl} className="w-full h-full object-contain opacity-50" disabled />
        ) : (
          <div className="text-center p-8 text-gray-400 flex flex-col items-center">
            <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg mb-2">Drag & Drop Mission Footage</p>
            <p className="text-sm text-gray-500 mb-6">Supported formats: MP4, AVI, MOV</p>
            <button 
              className={`px-6 py-2 rounded font-semibold text-sm transition-all shadow-lg
                ${wsState === 'connected' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              onClick={() => wsState === 'connected' && fileInputRef.current?.click()}
              disabled={wsState !== 'connected'}
            >
              BROWSE FILES
            </button>
            <input 
              ref={fileInputRef} type="file" className="hidden" accept="video/*" 
              onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} 
            />
          </div>
        )}

        {(processing || done) && (
          <div className="absolute bottom-0 left-0 w-full bg-[#0c0f17]/90 backdrop-blur-sm border-t border-[#2f3650] px-4 py-2 flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400 w-16">{done ? 'DONE' : `${progress}%`}</span>
            <div className="flex-1 h-2 bg-[#1b2030] rounded-full overflow-hidden border border-[#353d59]">
              <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
