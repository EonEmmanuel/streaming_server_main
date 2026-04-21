import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../lib/api';
import { Button, Card, PageShell } from '../../components/ui';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await apiFetch<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      localStorage.setItem('token', response.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <PageShell>
      <Card className="mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full rounded-lg bg-white/10 p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="w-full rounded-lg bg-white/10 p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </Card>
    </PageShell>
  );
};
