'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, FileText } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    state: 'Delhi (NCT)',
    date: '',
    reason: '',
    circularUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8">
      <div className="border-b border-neutral-800 pb-5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Contact &amp; Submit Corrections &bull; DryCheck India
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-400">
          Have an official state excise gazette or noticed an upcoming by-election dry day that we haven&apos;t added yet? Let us know.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Thank you for your submission!</h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
            Our team verifies official gazette notifications against state excise commissioner portals before updating the dataset.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors min-h-[44px]"
          >
            Submit another update
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. rahul@gmail.com"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                State / Union Territory
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State name"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Dry Date (YYYY-MM-DD)
              </label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="2026-11-08"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Reason / Occasion / Order Details
            </label>
            <textarea
              rows={3}
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g. State Assembly By-Election 48hr ban, local festival, or excise commissioner circular number..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Official Gazette / News Source Link (Optional)
            </label>
            <input
              type="url"
              value={formData.circularUrl}
              onChange={(e) => setFormData({ ...formData, circularUrl: e.target.value })}
              placeholder="https://excise.delhigovt.nic.in/..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3 flex items-start gap-2.5 text-xs text-neutral-400">
            <FileText className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              All submissions are checked directly against state government gazettes and excise department portal releases.
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-3 text-sm transition-all min-h-[44px]"
          >
            <Send className="h-4 w-4" />
            <span>Submit Verification Tip</span>
          </button>
        </form>
      )}

      <div className="mt-8 pt-5 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
        <Link href="/" className="text-amber-400 hover:underline min-h-[44px] flex items-center">
          &larr; Back to Home
        </Link>
        <span className="text-neutral-500">DryCheck India Community Review</span>
      </div>
    </div>
  );
}
