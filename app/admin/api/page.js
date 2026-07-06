'use client';
import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

const ENDPOINTS = [
  { method: 'GET', path: '/api/products?limit=12', desc: 'Danh sách sản phẩm (limit, cat)' },
  { method: 'GET', path: '/api/products/breville-barista-express', desc: 'Chi tiết sản phẩm theo slug/id' },
  { method: 'GET', path: '/api/shop-categories', desc: 'Danh mục sản phẩm' },
  { method: 'GET', path: '/api/posts?status=published&limit=5', desc: 'Danh sách bài viết đã đăng' },
  { method: 'GET', path: '/api/posts/1', desc: 'Chi tiết bài viết theo id' },
  { method: 'GET', path: '/api/pages', desc: 'Trang tùy chỉnh (Page Builder)' },
  { method: 'GET', path: '/api/settings', desc: 'Cấu hình công khai của website' },
  { method: 'GET', path: '/api/files', desc: 'Thư viện media' },
  { method: 'POST', path: '/api/coupons/validate', desc: 'Kiểm tra mã giảm giá', body: '{\n  "code": "COFFEE10",\n  "orderTotal": 5000000\n}' },
  { method: 'POST', path: '/api/contact', desc: 'Gửi liên hệ / đăng ký', body: '{\n  "name": "Nguyễn Văn A",\n  "phone": "0900000000",\n  "message": "Xin tư vấn"\n}' },
  { method: 'POST', path: '/api/posts', desc: 'Tạo bài viết 🔒 (cần token)', body: '{\n  "title": "Bài viết từ API",\n  "content": "Nội dung bài viết...",\n  "status": "published"\n}' },
];

export default function ApiDevPage() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/products?limit=3');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);

  // ── API keys / token ──
  const [keys, setKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [creating, setCreating] = useState(false);
  const [justCreated, setJustCreated] = useState(null);

  useEffect(() => { loadKeys(); }, []);
  async function loadKeys() {
    try { const r = await fetch('/api/admin/api-keys'); if (r.ok) { const d = await r.json(); setKeys(d.keys || []); } } catch {}
  }
  async function createKey() {
    if (creating) return;
    setCreating(true); setJustCreated(null);
    try {
      const r = await fetch('/api/admin/api-keys', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newKeyName || 'API Key' }) });
      const d = await r.json();
      if (r.ok && d.key) { setJustCreated(d.key.api_key); setNewKeyName(''); loadKeys(); }
      else alert('Lỗi tạo token: ' + (d.error || ''));
    } catch (e) { alert('Lỗi: ' + e.message); } finally { setCreating(false); }
  }
  async function deleteKey(id) {
    if (!confirm('Thu hồi token này?')) return;
    try { await fetch(`/api/admin/api-keys/${id}`, { method: 'DELETE' }); loadKeys(); } catch {}
  }

  function pick(ep) {
    setMethod(ep.method); setPath(ep.path); setBody(ep.body || ''); setResp(null);
  }

  async function send() {
    setLoading(true); setResp(null);
    const t0 = performance.now();
    try {
      const opts = { method };
      if (method !== 'GET' && body.trim()) { opts.headers = { 'Content-Type': 'application/json' }; opts.body = body; }
      const r = await fetch(path, opts);
      const text = await r.text();
      let pretty = text; try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch {}
      setResp({ status: r.status, ok: r.ok, ms: Math.round(performance.now() - t0), body: pretty });
    } catch (err) {
      setResp({ status: 0, ok: false, ms: 0, body: 'Lỗi: ' + err.message });
    } finally { setLoading(false); }
  }

  const curl = `curl -X ${method} "${typeof window !== 'undefined' ? window.location.origin : ''}${path}"${method !== 'GET' && body.trim() ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${body.replace(/\n/g, '')}'` : ''}`;

  const box = { background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', borderRadius: 14, padding: 20 };
  const input = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text)', fontSize: 13, fontFamily: 'monospace', outline: 'none' };
  const mColor = (m) => m === 'GET' ? '#16a34a' : m === 'POST' ? '#d97706' : '#6366f1';

  return (
    <AdminShell title="API cho Developer">
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 6 }}>API cho Developer</h1>
      <p style={{ color: 'var(--admin-muted)', fontSize: 13, marginBottom: 20 }}>REST API của website. Bấm một endpoint để nạp vào khung test, chỉnh và gửi thử ngay.</p>

      {/* API TOKEN */}
      <div style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>API Token</h2>
        <p style={{ color: 'var(--admin-muted)', fontSize: 12.5, marginBottom: 8, lineHeight: 1.6 }}>Token cho client bên ngoài gọi các API ghi (tạo bài viết, upload…). Đọc công khai không cần token; <strong>ghi thì bắt buộc</strong>. 3 cách gửi (giống WordPress REST API):</p>
        <ul style={{ margin: '0 0 14px', paddingLeft: 18, color: 'var(--admin-muted)', fontSize: 12, lineHeight: 1.9 }}>
          <li><code>X-API-Key: &lt;token&gt;</code></li>
          <li><code>Authorization: Bearer &lt;token&gt;</code></li>
          <li><code>Authorization: Basic base64("user:&lt;token&gt;")</code> — kiểu Application Password của WordPress</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="Tên token (vd: App di động, Zapier...)" style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text)', fontSize: 13, outline: 'none' }} />
          <button onClick={createKey} disabled={creating} style={{ background: 'var(--admin-primary)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontWeight: 700, cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap', opacity: creating ? 0.6 : 1 }}>{creating ? '...' : '+ Tạo token'}</button>
        </div>
        {justCreated && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 11.5, color: '#16a34a', fontWeight: 700, marginBottom: 6 }}>✅ Token mới — sao chép & lưu lại ngay:</div>
            <code style={{ fontSize: 12, color: 'var(--admin-text)', wordBreak: 'break-all', display: 'block' }}>{justCreated}</code>
          </div>
        )}
        {keys.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {keys.map(k => (
              <div key={k.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text)' }}>{k.name}</div>
                  <code style={{ fontSize: 11, color: 'var(--admin-muted)' }}>{String(k.api_key).slice(0, 10)}••••••{String(k.api_key).slice(-4)}</code>
                </div>
                <button onClick={() => deleteKey(k.id)} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: 6, padding: '5px 10px', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Thu hồi</button>
              </div>
            ))}
          </div>
        ) : <div style={{ fontSize: 12.5, color: 'var(--admin-muted)' }}>Chưa có token nào.</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 20 }} className="api-grid">
        {/* Danh sách endpoint */}
        <div style={box}>
          <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Endpoints</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ENDPOINTS.map((ep, i) => (
              <button key={i} onClick={() => pick(ep)} style={{ textAlign: 'left', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: '9px 11px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: mColor(ep.method), padding: '2px 6px', borderRadius: 4 }}>{ep.method}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--admin-text)', wordBreak: 'break-all' }}>{ep.path.split('?')[0]}</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--admin-muted)', marginTop: 4 }}>{ep.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tester */}
        <div style={box}>
          <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Thử API</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <select value={method} onChange={e => setMethod(e.target.value)} style={{ ...input, width: 90, fontWeight: 700, color: mColor(method) }}>
              <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
            </select>
            <input value={path} onChange={e => setPath(e.target.value)} placeholder="/api/..." style={input} />
          </div>
          {method !== 'GET' && (
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder='Body JSON (tùy chọn)' rows={5} style={{ ...input, marginBottom: 10, resize: 'vertical' }} />
          )}
          <button onClick={send} disabled={loading} style={{ background: 'var(--admin-primary)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 700, cursor: 'pointer', fontSize: 13, opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Đang gửi...' : '▶ Gửi'}
          </button>

          {resp && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, marginBottom: 6, color: 'var(--admin-muted)' }}>
                Status: <strong style={{ color: resp.ok ? '#16a34a' : '#ef4444' }}>{resp.status}</strong> · {resp.ms}ms
              </div>
              <pre style={{ background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: 14, fontSize: 12, color: 'var(--admin-text)', whiteSpace: 'pre-wrap', maxHeight: 340, overflow: 'auto', margin: 0 }}>{resp.body}</pre>
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11.5, color: 'var(--admin-muted)', marginBottom: 6 }}>Ví dụ curl:</div>
            <pre style={{ background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: 12, fontSize: 11.5, color: 'var(--admin-text)', whiteSpace: 'pre-wrap', margin: 0 }}>{curl}</pre>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 820px){ .api-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
    </AdminShell>
  );
}
