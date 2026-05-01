'use server';

import { cosmic } from '@/lib/cosmic';

export async function subscribeToNewsletter(email: string) {
  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  try {
    // SDK v2: insertOne() with object_type, title, metadata
    await cosmic.objects.insertOne({
      object_type: 'newsletter-subscribers',
      title: email,
      metadata: {
        email,
        subscribed_at: new Date().toISOString(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { error: 'Failed to subscribe. Please try again.' };
  }
}