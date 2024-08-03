'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import Navbar from '@/components/Navbar/Navbar';

export default function LaunchParamsPage() {
  const lp = useLaunchParams();

  return (
    <>
      <Navbar/>
    </>
  );
};
