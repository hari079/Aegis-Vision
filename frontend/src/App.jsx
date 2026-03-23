import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

import VideoFeed from './components/VideoFeed';
import ControlsPanel from './components/ControlsPanel';
import ThreatScoreCard from './components/ThreatScoreCard';
import FormationCard from './components/FormationCard';
import TargetBreakdown from './components/TargetBreakdown';
import AnomalyFeed from './components/AnomalyFeed';
import ActiveTargetsTable from './components/ActiveTargetsTable';

const CLIENT_ID = uuidv4();
const WS_URL = `ws://localhost:8000/ws/${CLIENT_ID}`;
const API_URL = `http://localhost:8000/analyze/${CLIENT_ID}`;

export default function App() {
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);
  const rawUrlRef = useRef(null);
  const pausedRef = useRef(false);

  const [frame, setFrame] = useState(null);
  const [latestFrame, setLatestFrame] = useState(null);
  const [rawVideoUrl, setRawVideoUrl] = useState(null);
  
  const [tracks, setTracks] = useState({});
  const [anomalies, setAnomalies] = useState([]);
  const [formation, setFormation] = useState('-');
  const [threatScore, setThreatScore] = useState(0);
  const [frameNum, setFrameNum] = useState(0);
  
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [wsState, setWsState] = useState('connecting');

  // Config State
  const [modelName, setModelName] = useState('yolov8m.pt');
  const [conf, setConf] = useState(0.20);
  const [sensitivity, setSensitivity] = useState(60);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      setWsState('connected');
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };

    ws.current.onerror = () => {
      setWsState('error');
    };

    ws.current.onclose = () => {
      setWsState('closed');
      setProcessing(false);
      reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.status === 'complete') {
        setProcessing(false);
        setDone(true);
        return;
      }

      const nextFrame = `data:image/jpeg;base64,${data.frame}`;
      setLatestFrame(nextFrame);
      if (!pausedRef.current) setFrame(nextFrame);

      setTracks(data.tracks || {});
      setAnomalies(data.anomalies || []);
      setFormation(data.formation || '-');
      setThreatScore(data.threat_score || 0);
      setFrameNum(data.frame_num || 0);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      ws.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (rawUrlRef.current) URL.revokeObjectURL(rawUrlRef.current);
    };
  }, []);

  const uploadVideo = async (file) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    if (rawUrlRef.current) URL.revokeObjectURL(rawUrlRef.current);
    const nextRawUrl = URL.createObjectURL(file);
    rawUrlRef.current = nextRawUrl;
    setRawVideoUrl(nextRawUrl);

    setDone(false);
    setProcessing(true);
    setPaused(false);
    setFrame(null);
    setLatestFrame(null);
    setTracks({});
    setAnomalies([]);
    setFrameNum(0);

    const payload = new FormData();
    payload.append('file', file);
    payload.append('model_name', modelName);
    payload.append('conf', conf.toString());
    payload.append('sensitivity', sensitivity.toString());

    try {
      const response = await fetch(API_URL, { method: 'POST', body: payload });
      if (!response.ok) throw new Error('Upload failed');
    } catch (error) {
      setProcessing(false);
    }
  };

  const handlePauseToggle = () => {
    setPaused(prev => {
      const next = !prev;
      if (!next && latestFrame) setFrame(latestFrame);
      return next;
    });
  };

  const activeTargets = Object.keys(tracks).length;
  const progress = done ? 100 : processing ? Math.min(96, Math.max(7, Math.floor(frameNum / 2.5))) : 0;

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#2f3650] bg-[#0c0f17]/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto">
          <div className="flex items-center gap-3">
             <span className="text-blue-500 font-bold text-xl tracking-widest uppercase">Aegis Vision</span>
             <span className="text-gray-700">|</span>
             <span className="text-gray-400 font-mono text-sm tracking-widest mt-0.5 shadow-sm">TACTICAL INTELLIGENCE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-1.5 text-xs font-bold rounded-full border shadow-sm transition-colors ${wsState === 'connected' ? 'bg-green-900/40 text-green-400 border-green-500/50 shadow-green-500/20' : 'bg-red-900/40 text-red-400 border-red-500/50 shadow-red-500/20'}`}>
              {wsState === 'connected' ? 'SYSTEM ONLINE' : 'ATTEMPTING RECONNECT...'}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Grid Layout */}
      <main className="p-4 md:p-6 lg:p-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Controls & Feed */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ControlsPanel 
              modelName={modelName} setModelName={setModelName}
              conf={conf} setConf={setConf}
              sensitivity={sensitivity} setSensitivity={setSensitivity}
              wsState={wsState}
            />

            <div className="flex-1 min-h-[500px] xl:min-h-[700px] shadow-2xl">
              <VideoFeed 
                frame={frame}
                wsState={wsState}
                processing={processing}
                done={done}
                progress={progress}
                rawVideoUrl={rawVideoUrl}
                onUpload={uploadVideo}
                onPauseToggle={handlePauseToggle}
                paused={paused}
              />
            </div>
          </div>
          
          {/* Right Column: Analytics */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="grid grid-cols-2 gap-4">
                <ThreatScoreCard score={threatScore} />
                <FormationCard formation={formation} />
             </div>
             
             <TargetBreakdown tracks={tracks} />
             
             <div className="grid grid-cols-1 gap-6 flex-1 min-h-[500px]">
                <div className="flex flex-col h-[300px]">
                  <ActiveTargetsTable tracks={tracks} />
                </div>
                <div className="flex flex-col h-[300px]">
                  <AnomalyFeed anomalies={anomalies} />
                </div>
             </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
