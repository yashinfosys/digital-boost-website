import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { navItems } from '../data';
import { useContactSettings } from '../lib/contactSettings';

export default function Header() {
  const [open, setOpen] = useState(false);
  const contact = useContactSettings();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-boost-yellow/20 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <img src="/assets/digital-boost-logo.png" alt="Digital Boost" className="h-11 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[230px]" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 font-['Rajdhani'] text-[13px] font-bold uppercase tracking-[0.12em] transition ${
                  isActive ? 'bg-boost-yellow text-black' : 'text-zinc-300 hover:bg-boost-yellow hover:text-black'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={contact.phoneHref} className="inline-flex items-center gap-2 rounded-md border border-boost-yellow/30 px-4 py-2 font-['Rajdhani'] text-sm font-bold tracking-[0.08em] text-white transition hover:border-boost-yellow hover:text-boost-yellow">
            <Phone size={16} />
            {contact.phone}
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-boost-yellow px-4 py-2 font-['Rajdhani'] text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-white">
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-boost-yellow/30 text-white xl:hidden" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-boost-yellow/15 bg-black/96 px-4 py-4 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map(([label, href]) => (
              <NavLink key={href} to={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-left font-['Rajdhani'] text-sm font-bold uppercase tracking-[0.12em] text-zinc-200 hover:bg-boost-yellow hover:text-black">
                {label}
              </NavLink>
            ))}
            <div className="grid gap-3 pt-3 sm:grid-cols-2">
              <a href={contact.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-bold text-white">
                <Phone size={16} />
                {contact.phone}
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-boost-yellow px-4 py-3 text-sm font-black text-black">
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
