import { NextResponse } from 'next/server'
import { Resend } from 'resend' // ⚠️ ALLEEN HIER IMPORTEREN - NOOIT IN CLIENT COMPONENTS!
import { BRAND } from '@/lib/constants'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request: Request) {
  try {
    const { email, toolUsed } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    // Als Resend niet geconfigureerd is, return success zonder email te sturen
    if (!resend) {
      console.warn('Resend not configured - email not sent')
      return NextResponse.json({ success: true, sent: false })
    }

    // Stuur welkomstmail
    const { data, error } = await resend.emails.send({
      from: 'ArchiteQt Tools <tools@architeqt.tech>',
      to: [email],
      subject: `Welkom bij ${BRAND.name} Tools 👋`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00A693;">Bedankt voor je interesse! 👋</h1>
          
          <p>Je hebt zojuist de <strong>${toolUsed}</strong> gebruikt. Leuk dat je onze gratis tools waardeert!</p>
          
          <h2 style="color: #111827;">Wist je dat je met ${BRAND.name} nog veel meer kunt?</h2>
          
          <ul style="line-height: 1.8;">
            <li>📊 Volledig projectbeheer</li>
            <li>⏱️ Tijdregistratie</li>
            <li>💬 Klantcommunicatie</li>
            <li>📁 Documentbeheer</li>
            <li>📈 Rapportages</li>
          </ul>
          
          <p>
            <a href="${BRAND.signupUrl}" 
               style="display: inline-block; background: #00A693; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Probeer ${BRAND.name} 14 dagen gratis
            </a>
          </p>
          
          <p style="color: #6b7280; font-size: 14px;">
            Geen creditcard nodig. Opzeggen wanneer je wilt.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
          
          <p style="color: #9ca3af; font-size: 12px;">
            Je ontvangt deze email omdat je je hebt aangemeld via ${BRAND.name} Tools.<br>
            <a href="${BRAND.mainSite}/unsubscribe" style="color: #9ca3af;">Afmelden</a>
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, sent: true, messageId: data?.id })
  } catch (error) {
    console.error('Send welcome error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
