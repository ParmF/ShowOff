import { Project, Testimonial } from './types';

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: '"Show-Off changed how we ship. Investors can see our commit velocity without us ever writing a manual report."',
    authorName: 'Alex Rivera',
    role: 'CTO @ Synthia',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWtwYt2_SjL7LAWFVFiXLrk8nOUIeNxwEMTbWZBs0yiUorDtFgLeC37Q-peFeVfCAcImtwTv-QAuSiJiiT0sc4pnoEjXK1_-zoFKF5VcGbaPA_YZ-dDLJEpaxjXj12mI_3KDzLB6mkT4DqJqj8UGYLtjKNq63qrEThzR0jxHFgstuyXBEIiFEQsaqsUF83h8ql_5tF9MYah3mRKvPZonHz-mjic2slmOT0B0NB54KY2y1OJe0EJyE-DpdXN67cm_cwQyj1r0A0hkxI'
  },
  {
    id: 't2',
    quote: '"Finally a tool that understands the dev workflow. I just push my code and the world sees the progress."',
    authorName: 'Sarah Chen',
    role: 'Indie Builder',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHjDNhKmAYIxMJXjzNIHeshGKaHg-XVjg1tWI3qCl1Cvroday2i2P9l7N5I5NQZvBVOGI7ZVfKSordLYw9sjwEpVqXv5dJWAmQ0NvlUdYGcPQ1qQ-73qNs25sk9r73cw6XivqMvKKN9g6O9FYPeh-ZkjWbWiN36Yt7y46ovNLWhSaGYziiuMqrRfLS_y7flzq6TauKY3bsMb99Z0khChPmzQejNQclL--TG02rR0-f8AvkEb6T2l1qHZ2ngNB4yMzkcaCbh7Y4tZTN'
  },
  {
    id: 't3',
    quote: '"Radical transparency was hard until Show-Off. Now it\'s the heart of our open source culture."',
    authorName: 'Marcus Thorne',
    role: 'OSS Lead @ Kernel',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHPVlg-hLxccasAKvuyZVvgg_b2ijsw26bN-0TZKOd6Jom7sTg_e3nR-orkFxNTTwLgcXyVbCIXHjuUmUULoQraE3bomMolNFjG0VvDVwafogPWHiNBCkAb2uRdvCxhR1o49rzrexvfbH6qZuomnKTfvz4zc_lmrn4X1k-PQj-Ku5lFQZRXx7oT6LWcwGU9f1wCITM9VtWOTX7aP0O6JXQdIdw0FUtQ0m6Vxd6D9av-WIcWM5EjE6a2IMY1qG_AcwHH5hg8lRf1bJj'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'nebula-engine',
    name: 'Nebula Engine',
    description: 'A revolutionary 3D neural network visual rendering engine built in Rust and WebAssembly, enabling beautiful browser-based graphics at over 120 FPS.',
    link: 'https://nebula.show-off.dev',
    status: 'beta',
    version: 'v4.1.0-beta',
    tags: ['TypeScript', 'Rust', 'WebAssembly', 'WebGL2'],
    githubUrl: 'https://github.com/synthia-corp/nebula-engine',
    followersCount: 14207,
    isFollowing: true,
    progress: 88,
    lastUpdated: '2026-06-04T08:42:00Z',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDLGVrKET_iWXjDIGRCZAjTBbWje3cHATfToOlY-3iZZzWX9U0N_clSpH2NPwRARPYSsn4wV2W3RO4d_rs-2WtqF7hST95rUbMn4VYAdl9M5jmQH1KDmG5NgsLvHIc-knpz0UgumIT9NWBWLpb4rNxUtgffJ7_xCk31GvoCO17CF2neKHOdkr0K3o3zgwpW1jtlf_-VFzCNjJ5ZDezBI3pTSg7fw2txkURjSIhBTulRo-44RdffX9_mNXYTZyzEzw8naPMsj4X5oCn',
    author: {
      name: 'Alex Rivera',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWtwYt2_SjL7LAWFVFiXLrk8nOUIeNxwEMTbWZBs0yiUorDtFgLeC37Q-peFeVfCAcImtwTv-QAuSiJiiT0sc4pnoEjXK1_-zoFKF5VcGbaPA_YZ-dDLJEpaxjXj12mI_3KDzLB6mkT4DqJqj8UGYLtjKNq63qrEThzR0jxHFgstuyXBEIiFEQsaqsUF83h8ql_5tF9MYah3mRKvPZonHz-mjic2slmOT0B0NB54KY2y1OJe0EJyE-DpdXN67cm_cwQyj1r0A0hkxI',
      handle: 'alex_rivera_synthia'
    },
    momentumPoints: [25, 45, 60, 100, 80, 50, 30],
    integrations: {
      githubActions: true,
      githubPages: true,
      webhookActive: true
    },
    devLogs: [
      {
        id: 'n1',
        projectId: 'nebula-engine',
        title: 'Optimized memory footprint in core parser',
        content: 'Refactored the voxel structure representation in Rust, reducing allocations per frame. Achieved a solid 12% memory reduction under synthetic load. Cleaned up double-pointer references and made allocator bounds inline to avoid page faults on high-volume vertex splits.',
        timestamp: '2026-06-04T08:42:00Z',
        type: 'perf',
        authorName: 'Alex Rivera',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWtwYt2_SjL7LAWFVFiXLrk8nOUIeNxwEMTbWZBs0yiUorDtFgLeC37Q-peFeVfCAcImtwTv-QAuSiJiiT0sc4pnoEjXK1_-zoFKF5VcGbaPA_YZ-dDLJEpaxjXj12mI_3KDzLB6mkT4DqJqj8UGYLtjKNq63qrEThzR0jxHFgstuyXBEIiFEQsaqsUF83h8ql_5tF9MYah3mRKvPZonHz-mjic2slmOT0B0NB54KY2y1OJe0EJyE-DpdXN67cm_cwQyj1r0A0hkxI',
        commitSha: '6d0bfe4'
      },
      {
        id: 'n2',
        projectId: 'nebula-engine',
        title: 'Merged UI improvements for mobile layout',
        content: 'Adjusted responsive grid container thresholds. Integrated dynamic resize observers for the canvas element, resolving viewport popping. Restructured mobile overlay tabs to use compact drawer layouts.',
        timestamp: '2026-06-03T18:30:00Z',
        type: 'feat',
        authorName: 'Alex Rivera',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWtwYt2_SjL7LAWFVFiXLrk8nOUIeNxwEMTbWZBs0yiUorDtFgLeC37Q-peFeVfCAcImtwTv-QAuSiJiiT0sc4pnoEjXK1_-zoFKF5VcGbaPA_YZ-dDLJEpaxjXj12mI_3KDzLB6mkT4DqJqj8UGYLtjKNq63qrEThzR0jxHFgstuyXBEIiFEQsaqsUF83h8ql_5tF9MYah3mRKvPZonHz-mjic2slmOT0B0NB54KY2y1OJe0EJyE-DpdXN67cm_cwQyj1r0A0hkxI',
        commitSha: '4c7ab42'
      },
      {
        id: 'n3',
        projectId: 'nebula-engine',
        title: 'Fixed WebAssembly initialization failure on Safari WebGL context',
        content: 'Safari had an issue where async wasm buffer compilation threw shared-memory initialization panics. Wrapped context setup inside a browser-safe feature detection guard and introduced synchronous fallbacks.',
        timestamp: '2026-06-01T14:15:00Z',
        type: 'fix',
        authorName: 'Alex Rivera',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWtwYt2_SjL7LAWFVFiXLrk8nOUIeNxwEMTbWZBs0yiUorDtFgLeC37Q-peFeVfCAcImtwTv-QAuSiJiiT0sc4pnoEjXK1_-zoFKF5VcGbaPA_YZ-dDLJEpaxjXj12mI_3KDzLB6mkT4DqJqj8UGYLtjKNq63qrEThzR0jxHFgstuyXBEIiFEQsaqsUF83h8ql_5tF9MYah3mRKvPZonHz-mjic2slmOT0B0NB54KY2y1OJe0EJyE-DpdXN67cm_cwQyj1r0A0hkxI',
        commitSha: 'fa38e91'
      }
    ]
  },
  {
    id: 'nova-compiler',
    name: 'Nova Compiler',
    description: 'A lightning-fast, optimizing type-safe system programming compiler targeting extremely compact binary output formats without garbage collection over-allocation.',
    link: 'https://nova.dev',
    status: 'stable',
    version: 'v1.4.2',
    tags: ['C++', 'LLVM', 'System Programming', 'Assembly'],
    githubUrl: 'https://github.com/nova-compiler/nova-core',
    followersCount: 8430,
    isFollowing: false,
    progress: 100,
    lastUpdated: '2026-06-04T19:12:00Z',
    coverImage: '',
    author: {
      name: 'Marcus Thorne',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHPVlg-hLxccasAKvuyZVvgg_b2ijsw26bN-0TZKOd6Jom7sTg_e3nR-orkFxNTTwLgcXyVbCIXHjuUmUULoQraE3bomMolNFjG0VvDVwafogPWHiNBCkAb2uRdvCxhR1o49rzrexvfbH6qZuomnKTfvz4zc_lmrn4X1k-PQj-Ku5lFQZRXx7oT6LWcwGU9f1wCITM9VtWOTX7aP0O6JXQdIdw0FUtQ0m6Vxd6D9av-WIcWM5EjE6a2IMY1qG_AcwHH5hg8lRf1bJj',
      handle: 'm_thorne_kernel'
    },
    momentumPoints: [80, 75, 45, 90, 60, 75, 95],
    integrations: {
      githubActions: true,
      githubPages: false,
      webhookActive: true
    },
    devLogs: [
      {
        id: 'nv1',
        projectId: 'nova-compiler',
        title: 'Optimized loop vectorization paths',
        content: 'Enhanced our AST generation layout in llvm back-end. SIMD pipelines now process adjacent array literals cleanly without unrolling registers unnecessarily.',
        timestamp: '2026-06-04T19:12:00Z',
        type: 'perf',
        authorName: 'Marcus Thorne',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHPVlg-hLxccasAKvuyZVvgg_b2ijsw26bN-0TZKOd6Jom7sTg_e3nR-orkFxNTTwLgcXyVbCIXHjuUmUULoQraE3bomMolNFjG0VvDVwafogPWHiNBCkAb2uRdvCxhR1o49rzrexvfbH6qZuomnKTfvz4zc_lmrn4X1k-PQj-Ku5lFQZRXx7oT6LWcwGU9f1wCITM9VtWOTX7aP0O6JXQdIdw0FUtQ0m6Vxd6D9av-WIcWM5EjE6a2IMY1qG_AcwHH5hg8lRf1bJj',
        commitSha: '9a90ffc'
      }
    ]
  },
  {
    id: 'aurora-analytics',
    name: 'Aurora Logs',
    description: 'An open-source distributed real-time telemetry analyzer capturing microservice metrics and event streaming profiles without bloating payload sizes.',
    link: 'https://aurora.io',
    status: 'active',
    version: 'v0.9.4',
    tags: ['Go', 'ClickHouse', 'React', 'gRPC'],
    githubUrl: 'https://github.com/aurora-logs/aurora-analytics',
    followersCount: 3824,
    isFollowing: false,
    progress: 74,
    lastUpdated: '2026-06-04T11:20:00Z',
    coverImage: '',
    author: {
      name: 'Sarah Chen',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHjDNhKmAYIxMJXjzNIHeshGKaHg-XVjg1tWI3qCl1Cvroday2i2P9l7N5I5NQZvBVOGI7ZVfKSordLYw9sjwEpVqXv5dJWAmQ0NvlUdYGcPQ1qQ-73qNs25sk9r73cw6XivqMvKKN9g6O9FYPeh-ZkjWbWiN36Yt7y46ovNLWhSaGYziiuMqrRfLS_y7flzq6TauKY3bsMb99Z0khChPmzQejNQclL--TG02rR0-f8AvkEb6T2l1qHZ2ngNB4yMzkcaCbh7Y4tZTN',
      handle: 'sarah_indie'
    },
    momentumPoints: [10, 20, 15, 30, 45, 80, 110],
    integrations: {
      githubActions: true,
      githubPages: true,
      webhookActive: false
    },
    devLogs: [
      {
        id: 'au1',
        projectId: 'aurora-analytics',
        title: 'Completed ClickHouse query caching pipeline',
        content: 'Created server side buffer for incoming telemetry metrics. Reduces peak transactional storage pressure by routing batch mutations over high-speed channels.',
        timestamp: '2026-06-04T11:20:00Z',
        type: 'feat',
        authorName: 'Sarah Chen',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHjDNhKmAYIxMJXjzNIHeshGKaHg-XVjg1tWI3qCl1Cvroday2i2P9l7N5I5NQZvBVOGI7ZVfKSordLYw9sjwEpVqXv5dJWAmQ0NvlUdYGcPQ1qQ-73qNs25sk9r73cw6XivqMvKKN9g6O9FYPeh-ZkjWbWiN36Yt7y46ovNLWhSaGYziiuMqrRfLS_y7flzq6TauKY3bsMb99Z0khChPmzQejNQclL--TG02rR0-f8AvkEb6T2l1qHZ2ngNB4yMzkcaCbh7Y4tZTN',
        commitSha: 'ab4930d'
      }
    ]
  }
];
