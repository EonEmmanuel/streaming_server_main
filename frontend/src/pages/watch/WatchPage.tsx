import { useParams } from 'react-router-dom';
import { HlsPlayer } from '../../components/HlsPlayer';
import { Card, PageShell } from '../../components/ui';
import { getHlsUrl } from '../../lib/api';

export const WatchPage = () => {
  const { streamKey } = useParams<{ streamKey: string }>();

  if (!streamKey) {
    return (
      <PageShell>
        <Card>Missing stream key.</Card>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <h1 className="text-3xl font-bold">Watching /{streamKey}</h1>
      <HlsPlayer src={getHlsUrl(streamKey)} />
    </PageShell>
  );
};
