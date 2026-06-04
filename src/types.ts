export interface DevLog {
  id: string;
  projectId: string;
  title: string;
  content: string;
  timestamp: string;
  type: 'feat' | 'fix' | 'refactor' | 'perf' | 'docs' | 'chore';
  authorName: string;
  authorAvatar: string;
  commitSha?: string;
}

export interface MetricSnapshot {
  activeContributors: number;
  globalReach: number;
  followersCount: number;
  weeklyCommits: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  status: 'stable' | 'beta' | 'alpha' | 'active' | 'completed' | 'archived';
  version: string;
  logoUrl?: string; // Optional logo path
  tags: string[];
  githubUrl?: string;
  followersCount: number;
  isFollowing?: boolean;
  progress: number; // 0 to 100
  lastUpdated: string; // ISO string
  coverImage?: string; // Gorgeous background image
  author: {
    name: string;
    avatarUrl: string;
    handle: string;
  };
  momentumPoints: number[]; // Activity graph points (e.g., last 7 days)
  devLogs: DevLog[];
  integrations: {
    githubActions: boolean;
    githubPages: boolean;
    webhookActive: boolean;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  role: string;
  avatarUrl: string;
}
