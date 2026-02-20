'use client';

import { useState } from 'react';

interface LeadCaptureFormProps {
  toolName: string;
}

export default function LeadCaptureForm({ toolName }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          toolName,
        }),
      });

      if (!response.ok) {
        throw new Error('Er ging iets mis');
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Er ging iets mis. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">✅</div>
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Succesvol verzonden!</h4>
            <p className="text-sm text-green-700">
              Check je inbox voor de resultaten en meer handige tips.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">📧 Ontvang dit resultaat per email</h4>
        <p className="text-sm text-gray-600">
          Vul je email in en ontvang dit resultaat + handige tips voor je project.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-architeqt focus:border-transparent"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-architeqt text-white px-6 py-3 rounded-lg font-semibold hover:bg-architeqt/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Verzenden...' : 'Verstuur'}
        </button>
      </form>

      {error && (
        <div className="mt-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        We respecteren je privacy. Geen spam, alleen waardevolle content.
      </p>
    </div>
  );
}
