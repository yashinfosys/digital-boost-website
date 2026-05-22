import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useContactSettings } from '../lib/contactSettings';

export default function Footer() {
  const contact = useContactSettings();

  return (
    <>
      <footer className="border-t border-white/10 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-400">© 2026 Digital Boost. A Digital Unit of Yash Infosystems. All Rights Reserved.</p>
        <p className="mt-2 text-sm font-semibold text-zinc-300">Designed & Developed by Yash Infosystems.</p>
      </footer>
      <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-boost-yellow text-black shadow-glow transition hover:bg-white" aria-label="WhatsApp Digital Boost">
        <MessageCircle />
      </a>
      <a href={contact.phoneHref} className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-glow sm:hidden" aria-label="Call Digital Boost">
        <Phone />
      </a>
    </>
  );
}
