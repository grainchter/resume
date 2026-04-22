export const reactContactFormCode = `import { useState } from 'react';
export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <textarea placeholder="Message" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
      <button type="submit" disabled={status === 'loading'}>Send</button>
      {status === 'success' && <p>Sent!</p>}
    </form>
  );
}`;