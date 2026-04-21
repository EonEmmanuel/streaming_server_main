import { FormEvent, useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { apiFetch } from '../../lib/api';
import { Button, Card, PageShell } from '../../components/ui';

type StreamKeyItem = {
  id: string;
  key: string;
  name: string;
  isActive: boolean;
  rtmpUrl: string;
};

export const StreamsPage = () => {
  const [items, setItems] = useState<StreamKeyItem[]>([]);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');

  const token = localStorage.getItem('token') ?? '';

  const refresh = async () => {
    const data = await apiFetch<StreamKeyItem[]>('/streams', { headers: { Authorization: `Bearer ${token}` } });
    setItems(data);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    await apiFetch('/streams', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ key, name })
    });
    setName('');
    setKey('');
    await refresh();
  };

  return (
    <PageShell>
      <h1 className="text-3xl font-bold">Stream Keys</h1>
      <Card>
        <form onSubmit={onCreate} className="grid gap-2 md:grid-cols-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display Name" className="rounded bg-white/10 p-2" />
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="stream-key" className="rounded bg-white/10 p-2" />
          <Button type="submit">Create</Button>
        </form>
      </Card>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-zinc-400">{item.key}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={item.isActive ? 'text-emerald-400' : 'text-zinc-500'}>{item.isActive ? 'ACTIVE' : 'DISABLED'}</span>
              <Button onClick={() => navigator.clipboard.writeText(item.rtmpUrl)} className="flex items-center gap-1"><Copy size={14} />RTMP</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
};
