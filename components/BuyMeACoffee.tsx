'use client';

import { useEffect } from 'react';

/**
 * BuyMeACoffee floating widget component.
 *
 * Injects the official BMC script with drycheck configuration.
 * Handles React/Next.js hydration and SPA transitions gracefully.
 */
export default function BuyMeACoffee() {
  useEffect(() => {
    // Prevent duplicate widget button
    if (document.getElementById('bmc-wbtn')) {
      return;
    }

    const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.setAttribute('data-name', 'BMC-Widget');
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
      script.setAttribute('data-id', 'drycheck');
      script.setAttribute('data-description', 'Support me on Buy me a coffee!');
      script.setAttribute('data-message', 'Atleast share coffee with me :D');
      script.setAttribute('data-color', '#fac53f');
      script.setAttribute('data-position', 'Right');
      script.setAttribute('data-x_margin', '18');
      script.setAttribute('data-y_margin', '18');
      script.async = true;

      script.onload = () => {
        // BMC widget script listens to DOMContentLoaded. If that event
        // already fired before this script finished downloading, dispatch it.
        if (!document.getElementById('bmc-wbtn')) {
          const evt = new Event('DOMContentLoaded', {
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(evt);
        }
      };

      document.body.appendChild(script);
    } else {
      // Script tag exists but button isn't created yet
      if (!document.getElementById('bmc-wbtn')) {
        const evt = new Event('DOMContentLoaded', {
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(evt);
      }
    }
  }, []);

  return null;
}
