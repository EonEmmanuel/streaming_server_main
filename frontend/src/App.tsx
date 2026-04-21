import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/admin/DashboardPage';
import { LiveMonitorPage } from './pages/admin/LiveMonitorPage';
import { LoginPage } from './pages/admin/LoginPage';
import { StreamsPage } from './pages/admin/StreamsPage';
import { TestPage } from './pages/test/TestPage';
import { WatchPage } from './pages/watch/WatchPage';

const Nav = () => (
  <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur">
    <nav className="mx-auto flex max-w-6xl items-center gap-4 p-4 text-sm text-zinc-300">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/streams">Streams</Link>
      <Link to="/admin/live-monitor">Live Monitor</Link>
      <Link to="/test">Test</Link>
    </nav>
  </header>
);

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/streams" element={<StreamsPage />} />
        <Route path="/admin/live-monitor" element={<LiveMonitorPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/watch/:streamKey" element={<WatchPage />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </>
  );
}
