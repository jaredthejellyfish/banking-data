import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import React from 'react';

const View1 = dynamic(() => import('./views/view-1'));
const View2 = dynamic(() => import('./views/view-2'));
const View3 = dynamic(() => import('./views/view-3'));
const View4 = dynamic(() => import('./views/view-4'));


const views = [
  {
    id: '1',
    title: 'App Name',
    description: 'Connect your bank account to get started',
    component: <View1 />,
  },
  {
    id: '2',
    title: 'Welcome to App Name',
    description: 'Connect your bank account to get started',
    component: <View2 />,
  },
  {
    id: '3',
    title: 'Select your bank',
    description: 'Choose your bank to connect your account',
    component: <View3 />,
  },
  {
    id: '4',
    title: 'Enter your bank credentials',
    description: 'Enter your bank username and password',
    component: <View4 />,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const pageId = cookieStore.get('progress')?.value ?? '1';
  const view = views.find((view) => view.id === pageId);

  return {
    title: view?.title ?? 'Welcome to App Name',
    description:
      view?.description ?? 'Connect your bank account to get started',
  };
}

function InititalWalkthrough({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const pageId = cookieStore.get('progress')?.value ?? '1';

  const correctView = views.find((view) => view.id === pageId);

  return correctView ? (
    <main className="flex min-h-screen flex-row space justify-between items-center gap-y-10 sm:p-24 p-5">
      {correctView.component}
    </main>
  ) : (
    children
  );
}

export default InititalWalkthrough;
