import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  FolderKanban,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { apiRequest, API_BASE, setToken } from '../lib/api';

const resources = {
  pages: {
    title: 'Pages',
    endpoint: '/pages',
    fields: ['title', 'slug', 'seoTitle', 'seoDescription', 'seoKeywords', 'h1', 'bannerImage', 'content', 'ctaText', 'ctaButtonText', 'ctaButtonLink', 'status'],
    textarea: ['content', 'seoDescription', 'seoKeywords'],
  },
  services: {
    title: 'Services',
    endpoint: '/services',
    fields: ['title', 'slug', 'icon', 'shortDescription', 'fullDescription', 'image', 'seoTitle', 'seoDescription', 'seoKeywords', 'status'],
    textarea: ['shortDescription', 'fullDescription', 'seoDescription', 'seoKeywords'],
  },
  packages: {
    title: 'Packages',
    endpoint: '/packages',
    fields: ['name', 'slug', 'price', 'offerPrice', 'features', 'recommended', 'ctaText', 'status'],
    textarea: ['features'],
  },
  portfolio: {
    title: 'Portfolio',
    endpoint: '/portfolio',
    fields: ['title', 'category', 'image', 'description', 'clientName', 'websiteLink', 'status'],
    textarea: ['description'],
  },
  blogs: {
    title: 'Blogs',
    endpoint: '/blogs',
    fields: ['title', 'slug', 'featuredImage', 'shortDescription', 'content', 'seoTitle', 'seoDescription', 'seoKeywords', 'publishDate', 'status'],
    textarea: ['shortDescription', 'content', 'seoDescription', 'seoKeywords'],
  },
  gallery: {
    title: 'Gallery',
    endpoint: '/gallery',
    fields: ['title', 'category', 'image', 'status'],
  },
  testimonials: {
    title: 'Testimonials',
    endpoint: '/testimonials',
    fields: ['clientName', 'businessName', 'rating', 'reviewText', 'image', 'status'],
    textarea: ['reviewText'],
  },
  faqs: {
    title: 'FAQ',
    endpoint: '/faqs',
    fields: ['question', 'answer', 'pageCategory', 'status'],
    textarea: ['answer'],
  },
};

const nav = [
  ['Dashboard', '/admin', LayoutDashboard],
  ['Pages', '/admin/pages', FileText],
  ['Services', '/admin/services', Sparkles],
  ['Packages', '/admin/packages', Package],
  ['Portfolio', '/admin/portfolio', FolderKanban],
  ['Blogs', '/admin/blogs', FileText],
  ['Gallery', '/admin/gallery', Image],
  ['Testimonials', '/admin/testimonials', Star],
  ['FAQ', '/admin/faqs', MessageSquare],
  ['Inquiries', '/admin/inquiries', BarChart3],
  ['Media', '/admin/media', Image],
  ['Settings', '/admin/settings', Settings],
  ['Admins', '/admin/admins', Shield],
];

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    setToken(null);
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-white/10 bg-black/70 p-4 lg:min-h-screen">
        <Link to="/admin" className="mb-6 flex items-center gap-3">
          <img src="/assets/digital-boost-logo.png" alt="Digital Boost" className="h-12 w-auto" />
        </Link>
        <nav className="grid gap-1">
          {nav.map(([label, href, Icon]) => (
            <NavLink key={href} to={href} end={href === '/admin'} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold ${isActive ? 'bg-boost-yellow text-black' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div>
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/75 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-boost-yellow">CMS Dashboard</p>
            <h1 className="text-xl font-black">Digital Boost Admin</h1>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-bold hover:bg-white/10">
            <LogOut size={16} />
            Logout
          </button>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      setToken(data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#050505] px-4 text-white">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-2xl p-6">
        <img src="/assets/digital-boost-logo.png" alt="Digital Boost" className="mb-8 h-16 w-auto" />
        <h1 className="text-2xl font-black">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-400">Secure CMS access for Digital Boost.</p>
        <input className="mt-6 w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-sm outline-none focus:border-boost-yellow" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input className="mt-3 w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-sm outline-none focus:border-boost-yellow" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="mt-3 text-sm font-bold text-red-300">{error}</p>}
        <button className="mt-5 w-full rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black">Login</button>
        <p className="mt-4 text-xs text-zinc-500">Forgot password API is available at `/api/auth/forgot-password`.</p>
      </form>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    apiRequest('/dashboard').then(setData).catch(() => setData({}));
  }, []);

  const cards = [
    ['Total inquiries', data?.totalInquiries || 0],
    ['New inquiries', data?.newInquiries || 0],
    ['Total blogs', data?.totalBlogs || 0],
    ['Total services', data?.totalServices || 0],
    ['Total packages', data?.totalPackages || 0],
    ['Portfolio items', data?.totalPortfolioItems || 0],
  ];

  return (
    <AdminLayout>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="glass rounded-lg p-5">
            <p className="text-sm font-bold text-zinc-400">{label}</p>
            <p className="mt-2 text-3xl font-black text-boost-yellow">{value}</p>
          </div>
        ))}
      </div>
      <div className="glass mt-6 rounded-lg p-5">
        <h2 className="text-xl font-black">Recent Inquiries</h2>
        <div className="mt-4 grid gap-3">
          {(data?.recentInquiries || []).map((item) => (
            <div key={item._id} className="rounded-md border border-white/10 p-3 text-sm">
              <b>{item.name}</b> - {item.mobileNumber} - {item.status}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function ResourceManager({ type }) {
  const config = resources[type];
  const empty = Object.fromEntries(config.fields.map((field) => [field, field === 'status' ? 'active' : field === 'recommended' ? false : '']));
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const load = () => apiRequest(config.endpoint).then(setItems);
  useEffect(() => {
    setForm(empty);
    setEditing(null);
    load().catch(() => setItems([]));
  }, [type]);

  const save = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    if (typeof payload.features === 'string') payload.features = payload.features.split('\n').filter(Boolean);
    await apiRequest(editing ? `${config.endpoint}/${editing}` : config.endpoint, {
      method: editing ? 'PUT' : 'POST',
      body: JSON.stringify(payload),
    });
    setMessage('Saved successfully');
    setForm(empty);
    setEditing(null);
    load();
  };

  const edit = (item) => {
    setEditing(item._id);
    setForm({ ...empty, ...item, features: Array.isArray(item.features) ? item.features.join('\n') : item.features });
  };

  const remove = async (id) => {
    await apiRequest(`${config.endpoint}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <AdminLayout>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={save} className="glass rounded-lg p-5">
          <h2 className="text-xl font-black">{editing ? 'Edit' : 'Add'} {config.title}</h2>
          <div className="mt-5 grid gap-3">
            {config.fields.map((field) => (
              <label key={field} className="grid gap-1 text-sm font-bold text-zinc-300">
                {field}
                {config.textarea?.includes(field) ? (
                  <textarea className="min-h-24 rounded-md border border-white/10 bg-black/45 px-3 py-2 text-white outline-none focus:border-boost-yellow" value={form[field] || ''} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
                ) : field === 'recommended' ? (
                  <input type="checkbox" checked={!!form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.checked })} />
                ) : (
                  <input className="rounded-md border border-white/10 bg-black/45 px-3 py-2 text-white outline-none focus:border-boost-yellow" value={form[field] || ''} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
                )}
              </label>
            ))}
          </div>
          {message && <p className="mt-3 text-sm font-bold text-boost-yellow">{message}</p>}
          <button className="mt-5 rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black">Save</button>
        </form>
        <div className="glass overflow-hidden rounded-lg p-5">
          <h2 className="text-xl font-black">{config.title}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-zinc-400">
                <tr><th className="py-3">Title</th><th>Status</th><th>Updated</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-t border-white/10">
                    <td className="py-3 font-bold">{item.title || item.name || item.question || item.clientName}</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      <button onClick={() => edit(item)} className="text-boost-yellow">Edit</button>
                      <button onClick={() => remove(item._id)} className="text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Inquiries() {
  const [items, setItems] = useState([]);
  const load = () => apiRequest('/inquiries').then(setItems);
  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);
  const update = async (id, status) => {
    await apiRequest(`/inquiries/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
    load();
  };

  return (
    <AdminLayout>
      <div className="glass overflow-x-auto rounded-lg p-5">
        <h2 className="text-xl font-black">Inquiries</h2>
        <table className="mt-5 w-full min-w-[760px] text-left text-sm">
          <thead className="text-zinc-400"><tr><th>Name</th><th>Business</th><th>Mobile</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-white/10">
                <td className="py-3 font-bold">{item.name}</td>
                <td>{item.businessName}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.serviceInterested}</td>
                <td>
                  <select value={item.status} onChange={(event) => update(item._id, event.target.value)} className="rounded bg-black px-2 py-1">
                    {['New', 'Contacted', 'Converted', 'Rejected'].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

function MediaManager() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const load = () => apiRequest('/media').then(setItems);
  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);
  const upload = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file);
    await apiRequest('/media', { method: 'POST', body: data });
    setFile(null);
    load();
  };

  return (
    <AdminLayout>
      <form onSubmit={upload} className="glass mb-6 rounded-lg p-5">
        <h2 className="text-xl font-black">Media Manager</h2>
        <input className="mt-4" type="file" accept="image/*" onChange={(event) => setFile(event.target.files[0])} />
        <button disabled={!file} className="ml-3 rounded-md bg-boost-yellow px-4 py-2 text-sm font-black text-black disabled:opacity-50">Upload</button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item._id} className="glass rounded-lg p-3">
            <img src={`${API_BASE.replace('/api', '')}${item.path}`} alt={item.originalName} className="h-36 w-full rounded-md object-cover" />
            <p className="mt-2 truncate text-sm">{item.originalName}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

function SettingsPage() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    apiRequest('/settings').then((data) => {
      setItems(data);
      setValue(JSON.stringify(data.find((item) => item.key === 'website')?.value || {}, null, 2));
    }).catch(() => {});
  }, []);
  const save = async () => {
    await apiRequest('/settings/website', { method: 'PUT', body: JSON.stringify({ value: JSON.parse(value) }) });
    alert('Settings saved. Yash Infosystems credit is protected by API.');
  };
  return (
    <AdminLayout>
      <div className="glass rounded-lg p-5">
        <h2 className="text-xl font-black">Website Settings</h2>
        <p className="mt-2 text-sm text-zinc-400">Developer credit is enforced server-side and cannot be removed.</p>
        <textarea className="mt-5 min-h-[420px] w-full rounded-md border border-white/10 bg-black/45 p-4 font-mono text-sm outline-none focus:border-boost-yellow" value={value} onChange={(event) => setValue(event.target.value)} />
        <button onClick={save} className="mt-4 rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black">Save Settings</button>
      </div>
    </AdminLayout>
  );
}

function AdminsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin', status: 'active' });
  const load = () => apiRequest('/admins').then(setItems);
  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);
  const save = async (event) => {
    event.preventDefault();
    await apiRequest('/admins', { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', email: '', password: '', role: 'admin', status: 'active' });
    load();
  };
  return (
    <AdminLayout>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={save} className="glass rounded-lg p-5">
          <h2 className="text-xl font-black">Create Admin</h2>
          {['name', 'email', 'password'].map((field) => (
            <input key={field} className="mt-3 w-full rounded-md border border-white/10 bg-black/45 px-3 py-2 text-white" placeholder={field} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
          ))}
          <select className="mt-3 w-full rounded-md border border-white/10 bg-black/45 px-3 py-2 text-white" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <button className="mt-4 rounded-md bg-boost-yellow px-5 py-3 text-sm font-black text-black">Create</button>
        </form>
        <div className="glass rounded-lg p-5">
          <h2 className="text-xl font-black">Admins</h2>
          {items.map((item) => <p key={item._id} className="border-b border-white/10 py-3 text-sm">{item.name} - {item.email} - {item.role}</p>)}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route index element={<Dashboard />} />
      {Object.keys(resources).map((type) => <Route key={type} path={type} element={<ResourceManager type={type} />} />)}
      <Route path="inquiries" element={<Inquiries />} />
      <Route path="media" element={<MediaManager />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="admins" element={<AdminsPage />} />
    </Routes>
  );
}
