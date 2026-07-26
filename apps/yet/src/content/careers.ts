import archive from 'lucide-static/icons/archive.svg?raw';
import citrus from 'lucide-static/icons/citrus.svg?raw';
import cookingPot from 'lucide-static/icons/cooking-pot.svg?raw';
import euro from 'lucide-static/icons/euro.svg?raw';
import house from 'lucide-static/icons/house.svg?raw';
import mic from 'lucide-static/icons/mic.svg?raw';
import packageIcon from 'lucide-static/icons/package.svg?raw';
import palette from 'lucide-static/icons/palette.svg?raw';
import poundSterling from 'lucide-static/icons/pound-sterling.svg?raw';
import sandwich from 'lucide-static/icons/sandwich.svg?raw';
import stethoscope from 'lucide-static/icons/stethoscope.svg?raw';
import store from 'lucide-static/icons/store.svg?raw';
import ticket from 'lucide-static/icons/ticket.svg?raw';
import type { Career } from '../types/content';

export const careers: Career[] = [
  {
    icon: poundSterling,
    companyName: 'Kakaku.com, inc.',
    stacks: ['C#', 'VB Script'],
    roles: ['Backend'],
    joinedAt: '2014-01-07',
    leavedAt: '2015-01-01',
  },
  {
    icon: stethoscope,
    companyName: 'MedPeer, inc.',
    stacks: ['Laravel', 'CloudSearch'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2015-01-01',
    leavedAt: '2015-09-01',
  },
  {
    icon: ticket,
    companyName: 'Pharma Information Network, inc.',
    stacks: ['Laravel', 'Python', 'Golang', 'Ruby on Rails', 'Elasticsearch'],
    roles: ['Technical Lead', 'Backend', 'Frontend', 'SEO Expert'],
    joinedAt: '2015-09-01',
    leavedAt: '2016-11-01',
  },
  {
    icon: archive,
    companyName: 'Rista, inc.',
    stacks: ['Ruby on Rails', 'Elasticsearch'],
    roles: ['Backend', 'Frontend', 'SEO Expert'],
    joinedAt: '2016-11-01',
    leavedAt: '2017-12-01',
  },
  {
    icon: sandwich,
    companyName: 'Fitsplus, inc.',
    stacks: ['Ruby on Rails'],
    roles: ['PjM', 'Backend', 'Frontend', 'Infra', 'UI Design'],
    joinedAt: '2017-12-01',
    leavedAt: '2019-08-01',
  },
  {
    icon: ticket,
    companyName: 'Pharma Information Network, inc.',
    stacks: ['Ruby on Rails', 'Hugo'],
    roles: ['Technical Lead'],
    joinedAt: '2018-09-01',
    leavedAt: '2021-04-30',
  },
  {
    icon: cookingPot,
    companyName: 'DMM.com LLC',
    stacks: ['Ruby', 'Ruby on Rails', 'Elasticsearch'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2018-09-01',
    leavedAt: '2018-12-31',
  },
  {
    icon: mic,
    companyName: 'Lang-8, inc.',
    stacks: ['Ruby on Rails', 'I18n', 'Elasticsearch'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2018-11-01',
    leavedAt: '2021-03-31',
  },
  {
    icon: citrus,
    companyName: 'mikan',
    stacks: ['Next.js', 'Cloud Functions', 'Firebase Hosting'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2020-09-01',
    leavedAt: '2021-03-31',
  },
  {
    icon: packageIcon,
    companyName: 'shizai, inc.',
    stacks: ['Golang', 'NestJS', 'Next.js'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2021-09-01',
    leavedAt: '2022-03-31',
  },
  {
    icon: store,
    companyName: 'STORES, Inc.',
    stacks: ['Ruby on Rails', 'Next.js'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2021-12-01',
    leavedAt: '2022-01-31',
  },
  {
    icon: house,
    companyName: 'famitra, Inc.',
    stacks: ['Ruby on Rails', 'Next.js', 'Nx'],
    roles: ['Technical Lead', 'Backend', 'Frontend'],
    joinedAt: '2022-06-01',
    leavedAt: '2023-07-31',
  },
  {
    icon: euro,
    companyName: 'STRACT, Inc.',
    stacks: ['Lerna', 'NestJS', 'Next.js', 'Ionic', 'AWS CDK', 'Turborepo'],
    roles: ['Backend', 'Frontend'],
    joinedAt: '2022-10-01',
    leavedAt: '2023-12-31',
  },
  {
    icon: palette,
    companyName: 'amana, inc.',
    stacks: ['Next.js', 'NestJS', 'Turborepo', 'Pulumi', 'WXT', ' Astro'],
    roles: ['Manager'],
    joinedAt: '2024-01-22',
    leavedAt: '2026-02-28',
  },
];
