import { useMemo } from 'react';
import { usePublicData } from './usePublicData';

export const defaultContactSettings = {
  phone: '+91 9554589777',
  phoneNumber: '919554589777',
  alternatePhone: '',
  alternatePhoneNumber: '',
  whatsappNumber: '919554589777',
  whatsappMessage: 'Hello Digital Boost, I want to know more about your services.',
  email: '',
  website: 'dboost.yashinfosystem.in',
  address: '',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.2517055678886!2d80.9151396!3d26.8319454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc81b59bfcf%3A0xf0bd1fc52e663df0!2sDigital%20Boost!5e0!3m2!1sen!2sin!4v1779213792582!5m2!1sen!2sin',
};

function onlyDigits(value = '') {
  return String(value).replace(/\D/g, '');
}

function formatIndiaPhone(value = '') {
  const digits = onlyDigits(value);
  if (!digits) return '';
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `+91 ${local}`;
}

function websiteUrl(value = '') {
  if (!value) return '';
  return value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`;
}

export function normalizeContactSettings(settings = {}) {
  const merged = { ...defaultContactSettings, ...(settings || {}) };
  const phoneNumber = onlyDigits(merged.phoneNumber || merged.phone);
  const alternatePhoneNumber = onlyDigits(merged.alternatePhoneNumber || merged.alternatePhone);
  const whatsappNumber = onlyDigits(merged.whatsappNumber || merged.whatsapp);
  const whatsappText = merged.whatsappMessage ? `?text=${encodeURIComponent(merged.whatsappMessage)}` : '';

  return {
    ...merged,
    phoneNumber,
    phone: merged.phone || formatIndiaPhone(phoneNumber),
    phoneHref: phoneNumber ? `tel:+${phoneNumber}` : '',
    alternatePhoneNumber,
    alternatePhone: merged.alternatePhone || formatIndiaPhone(alternatePhoneNumber),
    alternatePhoneHref: alternatePhoneNumber ? `tel:+${alternatePhoneNumber}` : '',
    whatsappNumber,
    whatsapp: whatsappNumber ? `https://wa.me/${whatsappNumber}${whatsappText}` : '',
    websiteUrl: websiteUrl(merged.website),
  };
}

export function useContactSettings() {
  const { data } = usePublicData('/settings/public', {});
  return useMemo(() => normalizeContactSettings(data?.contact), [data]);
}
