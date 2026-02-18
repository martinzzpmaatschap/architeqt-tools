'use client'

import { useState } from 'react'
import { supabase, isSupabaseEnabled } from '@/lib/supabase'

interface LeadCaptureFormProps {
  toolUsed: string
}

export default function LeadCaptureForm({ toolUsed }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('')
  const [optedIn, setOptedIn] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Vul een geldig e-mailadres in')
      return
    }

    // Als Supabase niet enabled is, skip de opslag maar toon wel success
    if (!isSupabaseEnabled) {
      setStatus('success')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const { error } = await supabase!.from('tool_leads').insert({
        email,
        tool_used: toolUsed,
        opted_in: optedIn,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'tools-hub',
        }
      })

      if (error) throw error

      setStatus('success')
      
      // Optioneel: stuur welkomstmail via API route
      if (optedIn) {
        fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, toolUsed }),
        }).catch(() => {
          // Fail silently - email is nice-to-have, niet kritiek
        })
      }
    } catch (error) {
      console.error('Lead capture error:', error)
      setStatus('error')
      setErrorMessage('Er ging iets mis. Probeer het later opnieuw.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div className="text-4xl mb-2">✅</div>
        <p className="font-semibold text-green-900 mb-1">Bedankt!</p>
        <p className="text-sm text-green-700">
          We houden je op de hoogte over nieuwe tools en features.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
          Blijf op de hoogte van nieuwe tools
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          className="w-full border-2 border-gray-200 focus:border-primary-turquoise focus:ring-2 focus:ring-primary-turquoise/20 rounded-lg px-4 py-3 outline-none transition-all"
          disabled={status === 'loading'}
          required
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="optin"
          checked={optedIn}
          onChange={(e) => setOptedIn(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="optin" className="text-sm text-gray-600">
          Ja, stuur me updates over nieuwe tools en features
        </label>
      </div>

      {status === 'error' && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary-turquoise hover:bg-primary-turquoise-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Even geduld...' : 'Aanmelden'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Je kunt je altijd weer afmelden. We delen je gegevens niet met derden.
      </p>
    </form>
  )
}
