import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

type HlsPlayerProps = {
  src: string;
};

export const HlsPlayer = ({ src }: HlsPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    setLoading(true);
    setError(null);

    if (Hls.isSupported()) {
      hls = new Hls({
        lowLatencyMode: true,
        maxLiveSyncPlaybackRate: 1.5
      });

      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play();
        setLoading(false);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError('Stream offline or unavailable. Retrying...');
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls?.startLoad();
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        void video.play();
        setLoading(false);
      });
    } else {
      setError('HLS is not supported in this browser.');
      setLoading(false);
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
      {loading && <div className="absolute inset-0 grid place-items-center text-sm text-zinc-300">Loading stream...</div>}
      {error && <div className="absolute left-3 top-3 rounded bg-red-500/80 px-3 py-1 text-xs">{error}</div>}
      <video ref={videoRef} controls playsInline className="aspect-video w-full" />
    </div>
  );
};
