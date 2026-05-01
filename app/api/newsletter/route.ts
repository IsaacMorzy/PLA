import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    
    // Mock: log the subscription
    console.log('Newsletter subscription:', email);
    
    return NextResponse.json({ success: true, message: 'Subscribed!' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}