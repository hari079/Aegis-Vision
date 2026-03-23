# Aegis Vision — Tactical Intelligence System

**Aegis Vision** is a production-ready, real-time multi-object tracking and analytics system designed to process surveillance footage, analyze entity behaviors, and present critical tactical information via a high-performance modern dashboard.

## 🚀 Features & Capabilities

- **Real-Time Video Streaming Interface:** Utilizes Websockets to transmit real-time annotated frames and data telemetry instantaneously between the AI pipeline and the frontend.
- **Advanced Object Tracking:** Powered by **YOLOv8** and customized **ByteTrack**, accurately acquiring target classes (Persons, Light/Heavy Vehicles, etc.) under various confidences and tracking buffers.
- **Behavioral Anomaly Detection:** Analyzes entity movement histories to catch critical events implicitly:
  - **Speed Spikes:** Targets suddenly accelerating.
  - **Direction Reversals:** Suspicious pathing anomalies.
  - **Entity Convergence:** Multiple tracks converging aggressively on points of interest.
- **Tactical Formation Analysis:** Leverages **DBSCAN Clustering (Scikit-Learn)** on geographical centroid distribution to estimate large-group behavior patterns like *Convoy/Patrols*, *Grouped Formations*, or *Scattered Flanking*.
- **Live Target Matrix & Threat Scoring:** Maintains active threat models based on weighted tracking of asset classes across the viewport area.
- **Premium Dark-Mode Dashboard:** Built natively with React and Tailwind V4, providing an exceptionally clean, responsive, glass-morphism tactical layout.

---

## 👁️ System in Action

**Visual Intelligence Breakdown:**
![image alt](https://github.com/hari079/Aegis-Vision/blob/b571784f5e6a84646c9f367e7636357a5a317257/Screenshot%202026-03-24%20001058.png)
The image above demonstrates the system simultaneously executing several pipelines over a complex roundabout intersection:
- **Persistent Object Tracking:** YOLOv8 recognizes and maintains continuous track IDs tightly bounded around light vehicles (`car`), heavy transports (`truck`), and pedestrians (`person`).
- **Real-time Anomaly Engine:** Notice the staggered yellow `! DIRECTION REVERSAL` alerts on the top-left overlay. Our trajectory analyzer actively flags suspicious or erratic positional deviations frame-by-frame.
- **Geospatial Formation Inference:** Through Scikit-Learn DBSCAN clustering, the spatial distribution of the active entities is successfully categorized as `MULTI-CLUSTER / FLANKING` at the bottom left.
- **Dynamic Threat Calculation:** Concluding the synthesis of high target density, heavy vehicle presence, and movement anomalies, the matrix scales the current frame's Threat Level to an elevated `100/100`.

---

## 🏗️ Technical Architecture

### 1. Backend (`/backend`)
- **Framework:** FastAPI + Uvicorn 
- **Computer Vision:** OpenCV (`cv2`) + Ultralytics (YOLOv8)
- **Data & ML:** Numpy, Scikit-Learn (DBSCAN)
- **Communication:** Python WebSockets (`ws://`) + Multipart form uploads
- **Pipeline:** `pipeline.py` maintains stateful memory dictionaries mapping target trackers to trajectory histories, evaluating moving metrics every frame.

### 2. Frontend (`/frontend`)
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS V4 + Custom global CSS (`.glass-panel`)
- **Components:** Modular architecture separating the Video Feed, Anomaly Log, Active Targets Grid, and Control Panels.

---

## 💻 Setup & Execution

### Running the Backend
1. Open a terminal in the `backend` directory.
2. Activate the virtual environment: `.\venv\Scripts\activate`
3. Start the FastAPI server:
   ```powershell
   python -m uvicorn main:app --port 8000
   ```

### Running the Frontend
1. Open a terminal in the `frontend` directory.
2. Ensure dependencies are installed via `npm install`.
3. Start the Vite development server:
   ```powershell
   npm run dev -- --host
   ```
4. Access the dashboard via your local host (typically `http://localhost:5173`).
