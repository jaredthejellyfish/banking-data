import type { StaticImageData } from 'next/image';

import NavyFederal from '@p/navy-federal-logo.png';
import USBank from '@p/us-bank-logo.png';
import WellsFargo from '@p/wells-fargo-logo.svg';

type Institution = {
  name: string;
  id: string;
  logo: StaticImageData;
};

const institutions: Institution[] = [
  {
    name: 'U.S. Bank',
    id: 'ins_127990',
    logo: USBank,
  },
  {
    name: 'Wells Fargo',
    id: 'ins_127991',
    logo: WellsFargo as StaticImageData,
  },
  {
    name: 'Navy Federal Credit Union',
    id: 'ins_15',
    logo: NavyFederal,
  },
];

export { institutions, type Institution };
