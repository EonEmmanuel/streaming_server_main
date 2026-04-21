import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { Card, PageShell } from '../../components/ui';

type Overview = { activeStreams: number; totalKeys: number; liveViewers: number };

export const DashboardPage = () => {
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    void apiFetch<Overview>('/overview', { headers: { Authorization: `Bearer ${token}` } }).then(setOverview);
  }, []);

  return (
    <PageShell>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-zinc-400">Active Streams</p><p className="text-3xl font-bold">{overview?.activeStreams ?? 0}</p></Card>
        <Card><p className="text-zinc-400">Total Keys</p><p className="text-3xl font-bold">{overview?.totalKeys ?? 0}</p></Card>
        <Card><p className="text-zinc-400">Live Viewers</p><p className="text-3xl font-bold">{overview?.liveViewers ?? 0}</p></Card>
      </div>
    </PageShell>
  );
};
