import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { Card, PageShell } from '../../components/ui';

type LiveItem = { id: string; key: string; name: string; startedAt: string; viewerCount: number };

export const LiveMonitorPage = () => {
  const [streams, setStreams] = useState<LiveItem[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      void apiFetch<LiveItem[]>('/live').then(setStreams);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <PageShell>
      <h1 className="text-3xl font-bold">Live Monitor</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {streams.length === 0 ? (
          <Card>No active streams right now.</Card>
        ) : (
          streams.map((stream) => (
            <Card key={stream.id}>
              <p className="text-sm text-emerald-400">LIVE</p>
              <h2 className="text-xl font-semibold">{stream.name}</h2>
              <p className="text-sm text-zinc-400">/{stream.key}</p>
            </Card>
          ))
        )}
      </div>
    </PageShell>
  );
};
