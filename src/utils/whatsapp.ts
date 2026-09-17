export const ATELIER_WHATSAPP_NUMBER = '919876543210';
export const ATELIER_WHATSAPP_DISPLAY = '+91 98765 43210';

export interface WhatsAppInquiryContext {
  babyName?: string;
  surname?: string;
  dob?: string;
  orderId?: string;
  parentName?: string;
  currency?: 'INR' | 'USD';
  step?: number;
}

/**
 * Returns a pre-filled WhatsApp conversation URL with a professional greeting
 * for general inquiries in the site footer.
 */
export function getFooterWhatsAppUrl(): string {
  const greeting = [
    'Namaste VedaChaldea Atelier,',
    '',
    'I would like to inquire about the personalized Baby Name Numerology & Nakshatra Dossier consultation.',
    'Could you please share guidance regarding the acoustic Chaldean calculations, Nakshatra alignment, and consultation process?',
    '',
    'Thank you.'
  ].join('\n');

  return `https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;
}

/**
 * Returns a pre-filled WhatsApp conversation URL with a professional greeting
 * tailored to the customer order modal intake and post-order verification.
 */
export function getOrderModalWhatsAppUrl(context?: WhatsAppInquiryContext): string {
  if (context?.orderId) {
    const lines = [
      'Namaste VedaChaldea Atelier,',
      '',
      `I am inquiring regarding my confirmed order:`,
      `• Order ID: #${context.orderId}`,
      context.babyName ? `• Candidate Child: ${context.babyName} ${context.surname || ''}`.trim() : '',
      context.parentName ? `• Parent: ${context.parentName}` : '',
      '',
      'Could you please confirm my 24-hour archival dossier preparation status and WhatsApp dispatch?',
      '',
      'Thank you.'
    ].filter(Boolean);

    return `https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  const childRef = context?.babyName ? ` for child candidate "${context.babyName} ${context.surname || ''}".` : '.';
  const lines = [
    'Namaste VedaChaldea Atelier,',
    '',
    `I am currently completing the Baby Name Numerology Dossier intake${childRef}`,
    'I have a quick inquiry regarding the birth coordinates and calculation process before finalizing my order.',
    'Could an atelier numerology specialist please assist me?',
    '',
    'Thank you.'
  ];

  return `https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
