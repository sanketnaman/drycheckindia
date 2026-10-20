import { useState, useEffect, useCallback } from 'react';
import { getStateBySlug, getStatus, getTodayIST } from '@/lib/dryday';

// Region code → state slug mapping based on /data/dry-days.json
const REGION_MAP: Record<string, string> = {
  'DL': 'delhi',
  'MH': 'maharashtra',
  'KA': 'karnataka',
  'TN': 'tamil-nadu',
  'WB': 'west-bengal',
  'UP': 'uttar-pradesh',
  'GJ': 'gujarat',
  'RJ': 'rajasthan',
  'AP': 'andhra-pradesh',
  'TG': 'telangana',
  'KL': 'kerala',
  'MP': 'madhya-pradesh',
  'HR': 'haryana',
  'PB': 'punjab',
  'BR': 'bihar',
  'OD': 'odisha',
  'AS': 'assam',
  'NL': 'nagaland',
  'MZ': 'mizoram',
  'SK': 'sikkim',
  'TR': 'tripura',
  'MN': 'manipur',
  'ML': 'meghalaya',
  'AR': 'arunachal-pradesh',
  'CT': 'chhattisgarh',
  'JH': 'jharkhand',
  'GA': 'goa',
  'HP': 'himachal-pradesh',
  'UK': 'uttarakhand',
  'JK': 'jammu-and-kashmir',
  'LA': 'ladakh',
  'LD': 'lakshadweep',
  'CH': 'chandigarh',
  'AN': 'andaman-and-nicobar-islands',
  'PY': 'puducherry',
  'DD': 'dadra-and-nagar-haveli-and-daman-and-diu',
  'LK': 'lakshadweep',
};

export function useLocationState() {
  const [detectedState, setDetectedState] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Client-side only: read from edge headers if available (simulated for demo)
    // In production, this would come from a server-side prop or middleware
    // For this implementation we rely on a simulated region header or skip
    const region = (window as any).__REGION_CODE || null;
    if (region && REGION_MAP[region]) {
      setDetectedState(REGION_MAP[region]);
      setShowBanner(true);
    }
  }, []);

  const openStatePicker = useCallback(() => {
    const el = document.getElementById('state-directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { detectedState, showBanner, openStatePicker, REGION_MAP };
}
