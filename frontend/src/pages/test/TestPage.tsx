import { useMemo, useState } from 'react';
import { HlsPlayer } from '../../components/HlsPlayer';
import { Card, PageShell } from '../../components/ui';
import { getHlsUrl } from '../../lib/api';

export const TestPage = () => {
  const [streamKey, setStreamKey] = useState('');
  const streamUrl = useMemo(() => (streamKey ? getHlsUrl(streamKey) : ''), [streamKey]);

  return (
    <PageShell>
      <h1 className="text-3xl font-bold">Test Streaming</h1>
      <Card className="space-y-3">
        <input
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          placeholder="Enter stream key"
          className="w-full rounded-lg bg-white/10 p-2"
        />
        <p className="text-xs text-zinc-400">Debug URL: {streamUrl || 'N/A'}</p>
        {streamKey ? <HlsPlayer src={streamUrl} /> : <p className="text-zinc-400">Enter a key to start preview.</p>}
      </Card>
    </PageShell>
  );
};
