export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const body = await request.text();
  if (body.length > 8192) {
    return Response.json({ error: 'Enquiry is too long.' }, { status: 413 });
  }

  let fields: unknown;
  try {
    fields = JSON.parse(body);
  } catch {
    return Response.json({ error: 'Invalid enquiry.' }, { status: 400 });
  }

  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return Response.json({ error: 'Invalid enquiry.' }, { status: 400 });
  }

  const values = fields as Record<string, unknown>;
  const field = (name: string) => typeof values[name] === 'string' ? values[name].trim() : '';
  const name = field('name');
  const email = field('email');
  const company = field('company');
  const phone = field('phone');
  const service = field('service');
  const message = field('message');

  if (!name || name.length > 100 || email.length > 150 ||
      !/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/.test(email) ||
      company.length > 120 || !phone || phone.length > 40 ||
      !service || service.length > 80 || message.length < 20 || message.length > 1200) {
    return Response.json({ error: 'Check the required fields and enter at least 20 characters about your project.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: 'Email delivery is temporarily unavailable. Please email info@azmache.com directly.' }, { status: 503 });
  }

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: ['info@azmache.com'],
        reply_to: email,
        subject: 'New AZMACH.E website enquiry',
        text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || '—'}`,
          `Phone: ${phone}`, `Service: ${service}`, '', message].join('\n'),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (result.ok) return Response.json({ ok: true });
  } catch {
    // Keep provider and network details out of the public response.
  }

  return Response.json({ error: 'We couldn’t send your enquiry. Please try again or email info@azmache.com directly.' }, { status: 502 });
}
