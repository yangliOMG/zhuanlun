import * as React from 'react';

export interface PrayNavbarProps {
  data: Array<{
    name: string;
    value: string | number;
  }>;
  descColor?: string;
  namecColor?: string;
}

export default class PrayNavbar extends React.Component<PrayNavbarProps, any> {}
