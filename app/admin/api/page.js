'use client';
import React, { useState } from 'react';

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
];

export default function ApiDevPage() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/products?limit=3');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);

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
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 6 }}>API cho Developer</h1>
      <p style={{ color: 'var(--admin-muted)', fontSize: 13, marginBottom: 24 }}>REST API của website. Bấm một endpoint để nạp vào khung test, chỉnh và gửi thử ngay.</p>

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
  );
}
