'use server';

import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';

export default async function incrementProgress() {
  const progressCookie = cookies().get('progress');
  let progress = progressCookie ? parseInt(progressCookie.value, 10) : 1;
  progress++;

  cookies().set('progress', progress.toString());

  if (progress > 4) {
    permanentRedirect('/dashboard');
  }
  return progress;
}


export async function resetProgress() {
  cookies().set('progress', "1");
}
