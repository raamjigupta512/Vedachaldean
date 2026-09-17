import { toast } from 'sonner';

/**
 * Toast notifications for user interactions across the VedaChaldea Atelier.
 * Provides subtle, elegant feedback for external actions, downloads, and copies.
 */

export const notifyWhatsAppOpening = (context?: { babyName?: string; orderId?: string }) => {
  const description = context?.orderId
    ? `Connecting to atelier desk for Order #${context.orderId}.`
    : context?.babyName
    ? `Pre-filled inquiry for ${context.babyName} prepared.`
    : 'Pre-filled inquiry message prepared for atelier consultation.';

  toast.success('Opening WhatsApp Concierge', {
    description,
    duration: 3500,
  });
};

export const notifyPdfStarting = () => {
  return toast.loading('Compiling Archival Dossier...', {
    description: 'Rendering 4-panel 300 DPI print-ready landscape PDF.',
  });
};

export const notifyPdfSuccess = (toastId?: string | number) => {
  if (toastId !== undefined) {
    toast.success('Archival Dossier Downloaded', {
      id: toastId,
      description: 'Print-ready A4 landscape PDF saved to your device.',
      duration: 4000,
    });
  } else {
    toast.success('Archival Dossier Downloaded', {
      description: 'Print-ready A4 landscape PDF saved to your device.',
      duration: 4000,
    });
  }
};

export const notifyPdfError = (toastId?: string | number) => {
  if (toastId !== undefined) {
    toast.error('Unable to Generate PDF', {
      id: toastId,
      description: 'Please try again or request direct dispatch via WhatsApp.',
      duration: 5000,
    });
  } else {
    toast.error('Unable to Generate PDF', {
      description: 'Please try again or request direct dispatch via WhatsApp.',
      duration: 5000,
    });
  }
};

export const notifyCopied = (label: string = 'Formatted summary copied to clipboard.') => {
  toast.success('Copied to Clipboard', {
    description: label,
    duration: 3000,
  });
};

export const notifyOrderPlaced = (orderId: string, candidateName: string) => {
  toast.success(`Order #${orderId} Confirmed!`, {
    description: `Dossier scheduled for 24h WhatsApp dispatch for ${candidateName}.`,
    duration: 5000,
  });
};

export const notifyThemeChanged = (newTheme: 'ivory' | 'midnight') => {
  if (newTheme === 'midnight') {
    toast.success('Midnight Palette Active', {
      description: 'High-contrast nocturnal obsidian & celestial gold theme enabled.',
      duration: 2500,
    });
  } else {
    toast.success('Ivory Palette Active', {
      description: 'Warm editorial ivory & classical parchment theme enabled.',
      duration: 2500,
    });
  }
};

