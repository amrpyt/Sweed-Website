import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  Archive,
  Bot,
  Boxes,
  CheckCircle2,
  CircleStop,
  Download,
  Eye,
  FileJson,
  Globe2,
  Image,
  Network,
  Play,
  Radar,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import "./styles.css";

const defaultConfig = {
  startUrl: "https://porto-template.framer.website/",
  maxPages: 7,
  maxAssets: 260,
  maxDepth: 4,
  sameOriginOnly: true,
  includePatterns: "",
  excludePatterns: "",
  deepCrawl: true,
  interactionExplorer: true,
  offlineQa: true,
  visualDiff: true,
  zipExport: true,
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [config, setConfig] = useState(defaultConfig);
  const activeJob = jobs.find((job) => job.id === activeId) || jobs[0];

  useEffect(() => {
    refreshJobs();
    const timer = setInterval(refreshJobs, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeJob?.id || activeJob.status !== "running") return;
    const source = new EventSource(`/api/jobs/${activeJob.id}/events`);
    source.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setJobs((current) => current.map((job) => job.id === activeJob.id ? { ...job, events: [...job.events, payload].slice(-200) } : job));
    };
    return () => source.close();
  }, [activeJob?.id, activeJob?.status]);

  async function refreshJobs() {
    const response = await fetch("/api/jobs");
    const nextJobs = await response.json();
    setJobs(nextJobs);
    setActiveId((current) => current || nextJobs[0]?.id || null);
  }

  async function startJob() {
    const payload = {
      ...config,
      includePatterns: splitPatterns(config.includePatterns),
      excludePatterns: splitPatterns(config.excludePatterns),
    };
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const job = await response.json();
    setJobs((current) => [job, ...current]);
    setActiveId(job.id);
  }

  async function cancelJob() {
    if (!activeJob) return;
    await fetch(`/api/jobs/${activeJob.id}/cancel`, { method: "POST" });
    await refreshJobs();
  }

  return (
    <main className="app-shell">
      <Sidebar jobs={jobs} activeId={activeJob?.id} onSelect={setActiveId} onRefresh={refreshJobs} />
      <section className="workspace">
        <Header activeJob={activeJob} />
        <div className="content-grid">
          <CaptureForm config={config} setConfig={setConfig} onStart={startJob} onCancel={cancelJob} activeJob={activeJob} />
          <LiveOps job={activeJob} />
        </div>
        <ResultSurface job={activeJob} />
      </section>
    </main>
  );
}

function Sidebar({ jobs, activeId, onSelect, onRefresh }) {
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-mark"><Radar size={20} /></div>
        <div>
          <strong>Capture Studio</strong>
          <span>local crawler console</span>
        </div>
      </div>
      <button className="ghost-button" onClick={onRefresh}><RefreshCcw size={15} /> Refresh</button>
      <div className="job-list">
        {jobs.length === 0 && <div className="empty">No jobs yet.</div>}
        {jobs.map((job) => (
          <button key={job.id} className={`job-item ${job.id === activeId ? "active" : ""}`} onClick={() => onSelect(job.id)}>
            <StatusIcon status={job.status} />
            <span>
              <strong>{new URL(job.config.startUrl).hostname}</strong>
              <small>{job.id} · {job.status}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="sidebar-note">
        <ShieldCheck size={16} />
        Capture only sites you own or have permission to copy.
      </div>
    </aside>
  );
}

function Header({ activeJob }) {
  const report = activeJob?.report;
  return (
    <header className="topbar">
      <div>
        <h1>Elite Website Capture</h1>
        <p>Browser capture, route graph, offline QA, visual proof, static export.</p>
      </div>
      <div className="topbar-stats">
        <Metric icon={<Route />} label="Routes" value={report?.routes?.length ?? 0} />
        <Metric icon={<Boxes />} label="Assets" value={report?.assets?.length ?? 0} />
        <Metric icon={<ShieldCheck />} label="Offline" value={report?.offlineQa?.status ?? "idle"} />
      </div>
    </header>
  );
}

function CaptureForm({ config, setConfig, onStart, onCancel, activeJob }) {
  const running = activeJob?.status === "running";
  return (
    <section className="panel command-panel">
      <div className="panel-heading">
        <div><h2>Command</h2><p>Start a browser-based capture job.</p></div>
        {running ? (
          <button className="danger-button" onClick={onCancel}><CircleStop size={16} /> Cancel</button>
        ) : (
          <button className="primary-button" onClick={onStart}><Play size={16} /> Start Capture</button>
        )}
      </div>
      <label className="field wide">
        <span>Target URL</span>
        <input value={config.startUrl} onChange={(event) => setConfig({ ...config, startUrl: event.target.value })} />
      </label>
      <div className="field-row">
        <NumberField label="Max Pages" value={config.maxPages} onChange={(value) => setConfig({ ...config, maxPages: value })} />
        <NumberField label="Max Assets" value={config.maxAssets} onChange={(value) => setConfig({ ...config, maxAssets: value })} />
        <NumberField label="Max Depth" value={config.maxDepth} onChange={(value) => setConfig({ ...config, maxDepth: value })} />
      </div>
      <div className="toggle-grid">
        <Toggle icon={<Globe2 />} label="Same Origin" checked={config.sameOriginOnly} onChange={(value) => setConfig({ ...config, sameOriginOnly: value })} />
        <Toggle icon={<Network />} label="Deep Crawl" checked={config.deepCrawl} onChange={(value) => setConfig({ ...config, deepCrawl: value })} />
        <Toggle icon={<Bot />} label="Interaction Explorer" checked={config.interactionExplorer} onChange={(value) => setConfig({ ...config, interactionExplorer: value })} />
        <Toggle icon={<ShieldCheck />} label="Offline QA" checked={config.offlineQa} onChange={(value) => setConfig({ ...config, offlineQa: value })} />
        <Toggle icon={<Image />} label="Visual Diff" checked={config.visualDiff} onChange={(value) => setConfig({ ...config, visualDiff: value })} />
        <Toggle icon={<Archive />} label="ZIP Export" checked={config.zipExport} onChange={(value) => setConfig({ ...config, zipExport: value })} />
      </div>
      <div className="field-row">
        <label className="field">
          <span>Include regex</span>
          <input value={config.includePatterns} onChange={(event) => setConfig({ ...config, includePatterns: event.target.value })} placeholder="/work, /contact" />
        </label>
        <label className="field">
          <span>Exclude regex</span>
          <input value={config.excludePatterns} onChange={(event) => setConfig({ ...config, excludePatterns: event.target.value })} placeholder="/admin, /login" />
        </label>
      </div>
    </section>
  );
}

function LiveOps({ job }) {
  const events = job?.events || [];
  const report = job?.report;
  const routeNodes = report?.routes || [];
  return (
    <section className="panel live-panel">
      <div className="panel-heading">
        <div><h2>Live Ops</h2><p>Timeline, discovered routes, asset health.</p></div>
        <StatusPill status={job?.status || "idle"} />
      </div>
      <div className="health-grid">
        <Metric icon={<Activity />} label="Events" value={events.length} />
        <Metric icon={<FileJson />} label="Report" value={report ? "ready" : "pending"} />
        <Metric icon={<Sparkles />} label="Visual" value={report?.visualDiff?.status ?? "idle"} />
      </div>
      <div className="route-map">
        <h3>Route Graph</h3>
        <div className="route-nodes">
          {routeNodes.length === 0 ? <span className="muted">No routes captured yet.</span> : routeNodes.map((route) => (
            <a key={route.path} href={job ? `/api/jobs/${job.id}/preview${route.path}` : "#"} target="preview-frame" className="route-node">
              <Route size={14} /> {route.path}
            </a>
          ))}
        </div>
      </div>
      <div className="timeline">
        {events.slice(-12).reverse().map((event) => (
          <div className="timeline-row" key={event.id}>
            <span>{event.type}</span>
            <p>{event.message || event.route || "event"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResultSurface({ job }) {
  const report = job?.report;
  const previewRoute = report?.routes?.find((route) => route.path.includes("scrambler"))?.path || report?.routes?.[0]?.path || "/";
  return (
    <section className="results-grid">
      <div className="panel preview-panel">
        <div className="panel-heading">
          <div><h2>Preview</h2><p>Captured static site route.</p></div>
          {job && <a className="ghost-button link-button" href={`/api/jobs/${job.id}/preview${previewRoute}`} target="_blank"><Eye size={15} /> Open</a>}
        </div>
        {job?.id ? <iframe name="preview-frame" title="Captured preview" src={`/api/jobs/${job.id}/preview${previewRoute}`} /> : <div className="empty preview-empty">Start a job to preview captured pages.</div>}
      </div>
      <div className="panel report-panel">
        <div className="panel-heading">
          <div><h2>Report</h2><p>QA status and export artifacts.</p></div>
          {job?.id && <a className="ghost-button link-button" href={`/api/jobs/${job.id}/download.zip`}><Download size={15} /> ZIP</a>}
        </div>
        <ReportSummary report={report} />
      </div>
    </section>
  );
}

function ReportSummary({ report }) {
  if (!report) return <div className="empty">No report yet.</div>;
  const failedRoutes = report.offlineQa?.routes?.filter((route) => route.status !== "pass") || [];
  const remoteLeaks = report.offlineQa?.routes?.flatMap((route) => route.failedRequests || []) || [];
  return (
    <div className="report-stack">
      <StatusLine ok={report.offlineQa?.status === "pass"} label="Offline QA" value={report.offlineQa?.status || "skipped"} />
      <StatusLine ok={report.visualDiff?.status === "pass"} label="Visual Diff" value={report.visualDiff?.status || "skipped"} />
      <StatusLine ok={failedRoutes.length === 0} label="Route Failures" value={failedRoutes.length} />
      <StatusLine ok={remoteLeaks.length === 0} label="External Leaks" value={remoteLeaks.length} />
      <div className="asset-list">
        <h3>Largest Assets</h3>
        {report.assets.slice().sort((a, b) => b.bytes - a.bytes).slice(0, 6).map((asset) => (
          <div className="asset-row" key={asset.url}>
            <span>{asset.localPath}</span>
            <strong>{formatBytes(asset.bytes)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type="number" min="1" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Toggle({ icon, label, checked, onChange }) {
  return (
    <button className={`toggle ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
      {React.cloneElement(icon, { size: 16 })}
      <span>{label}</span>
    </button>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="metric">
      {React.cloneElement(icon, { size: 17 })}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusIcon({ status }) {
  if (status === "completed") return <CheckCircle2 className="ok" size={18} />;
  if (status === "failed" || status === "cancelled") return <XCircle className="bad" size={18} />;
  return <Activity className="run" size={18} />;
}

function StatusPill({ status }) {
  return <span className={`status-pill ${status}`}>{status}</span>;
}

function StatusLine({ ok, label, value }) {
  return (
    <div className="status-line">
      {ok ? <CheckCircle2 size={17} className="ok" /> : <XCircle size={17} className="bad" />}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function splitPatterns(value) {
  return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

function formatBytes(bytes) {
  if (bytes > 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes > 1_000) return `${Math.round(bytes / 1_000)} KB`;
  return `${bytes} B`;
}

createRoot(document.getElementById("root")).render(<App />);
