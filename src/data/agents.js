export const AGENTS = [
  {
    id: 'codecraft',
    name: 'CodeCraft Elite',
    role: 'Senior Full-Stack Architect',
    description: 'Specializes in high-performance application architectures, algorithm design, React, Node.js, and debugging complex system layouts.',
    avatarColor: 'rgba(6, 182, 212, 0.15)',
    avatarBorder: 'rgba(6, 182, 212, 0.4)',
    accentColor: '#06b6d4',
    iconName: 'code',
    accentClass: 'accent-cyan',
    templates: [
      "Build a real-time chat component with WebSockets in React",
      "Optimize this database query and explain time complexity",
      "Create a responsive dark-mode navbar using CSS grids"
    ],
    thoughtFlow: [
      { step: 'Parsing Requirements', detail: 'Deconstructing query into specific tech-stack targets (Vite, React 19, Vanilla CSS).' },
      { step: 'Searching Knowledge', detail: 'Invoking internal database: searching for secure state management and DOM hook performance.' },
      { step: 'Executing Sandbox Test', detail: 'Tool call: [python_sandbox] - Running timing audits on rendering mechanisms.' },
      { step: 'Generating Refactored Output', detail: 'Formatting interactive responsive component with precise HSL colors.' }
    ]
  },
  {
    id: 'datavision',
    name: 'DataVision Pro',
    role: 'Principal Data Scientist',
    description: 'Expert in predictive modeling, visual charts, statistical anomaly detection, and deep data analysis insights.',
    avatarColor: 'rgba(168, 85, 247, 0.15)',
    avatarBorder: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#a855f7',
    iconName: 'chart',
    accentClass: 'accent-purple',
    templates: [
      "Analyze active user retention trends and project Q4 growth",
      "Write an algorithm to detect anomalous credit card transactions",
      "Generate an SVG visualization representing multi-agent performance metrics"
    ],
    thoughtFlow: [
      { step: 'Ingesting Schema', detail: 'Analyzing uploaded columns. Identified fields: timestamp, metric_val, cluster_group.' },
      { step: 'Vector Normalization', detail: 'Running standard Z-score analysis to filter background system noise.' },
      { step: 'Plotting Graph Nodes', detail: 'Tool call: [svg_renderer] - Designing responsive line vectors representing growth.' },
      { step: 'Compiling Analysis Report', detail: 'Finalizing text breakdown of statistically significant correlations.' }
    ]
  },
  {
    id: 'contentflow',
    name: 'ContentFlow AI',
    role: 'Lead Creative Strategist',
    description: 'Creates premium marketing campaigns, landing page copy, persuasive technical blogs, and high-impact SEO content.',
    avatarColor: 'rgba(245, 158, 11, 0.15)',
    avatarBorder: 'rgba(245, 158, 11, 0.4)',
    accentColor: '#f59e0b',
    iconName: 'edit',
    accentClass: 'accent-amber',
    templates: [
      "Draft a landing page headline and hook for an AI task manager",
      "Design an email drip campaign for re-engaging inactive users",
      "Create a 30-day technical marketing content strategy timeline"
    ],
    thoughtFlow: [
      { step: 'Audience Profiling', detail: 'Target user: Tech-savvy developers seeking productivity gains. Core desire: simplicity & speed.' },
      { step: 'Linguistic Analysis', detail: 'Analyzing competitors to establish a unique tone (bold, conversational, clear, no-fluff).' },
      { step: 'Structure Map', detail: 'Structuring landing copy using AIDA (Attention, Interest, Desire, Action) framework.' },
      { step: 'Drafting & Copy Polish', detail: 'Refining taglines for maximum punch and SEO keyword alignment.' }
    ]
  },
  {
    id: 'secureshield',
    name: 'SecureShield Pro',
    role: 'DevSecOps Specialist',
    description: 'Conducts deep security audits, vulnerability detection, JWT/OAuth structure reviews, and server hardening checks.',
    avatarColor: 'rgba(244, 63, 94, 0.15)',
    avatarBorder: 'rgba(244, 63, 94, 0.4)',
    accentColor: '#f43f5e',
    iconName: 'shield',
    accentClass: 'accent-rose',
    templates: [
      "Perform a security review of a stateless JWT authorization flow",
      "Draft an AWS IAM policy enforcing least-privilege for S3 access",
      "Inspect a node-backend setup for common SQL Injection vectors"
    ],
    thoughtFlow: [
      { step: 'Static Code Analysis', detail: 'Scanning input syntax for dangerous operations (eval, raw-concat, missing sanitization).' },
      { step: 'Threat Modeling', detail: 'Simulating hypothetical attack vectors: Man-In-The-Middle, Replay Attacks, CSRF.' },
      { step: 'Vulnerability Isolation', detail: 'Tool call: [owasp_scanner] - Identifying high-probability attack surfaces.' },
      { step: 'Generating Remediation Code', detail: 'Compiling mitigation code blocks and hardening recommendations.' }
    ]
  },
  {
    id: 'speedtracker',
    name: 'SpeedTracker',
    role: 'Network Speed Analyst',
    description: 'Monitors and analyzes internet speed, latency, and network quality. Helps identify slow connections and suggests the best network for your area.',
    avatarColor: 'rgba(34, 197, 94, 0.15)',
    avatarBorder: 'rgba(34, 197, 94, 0.4)',
    accentColor: '#22c55e',
    iconName: 'speed',
    accentClass: 'accent-green',
    templates: [
      "Test my current internet speed and check ping",
      "Which network is fastest in my area — Jio, Airtel or Vi?",
      "Why is my internet slow? Help me troubleshoot."
    ],
    thoughtFlow: [
      { step: 'Detecting Network', detail: 'Checking active connection type: 4G / 5G / WiFi / 3G.' },
      { step: 'Running Speed Test', detail: 'Tool call: [speed_test] - Measuring download, upload and ping in real-time.' },
      { step: 'Comparing Carriers', detail: 'Benchmarking results against Jio, Airtel, Vi and BSNL for your state.' },
      { step: 'Generating Report', detail: 'Compiling speed report with best network recommendation for your area.' }
    ]
  }
];

export const MOCK_CHATS = {
  'codecraft': [
    {
      sender: 'agent',
      message: 'Greetings! I am CodeCraft Elite, your dedicated full-stack software architect. How can I assist with your software design, optimization, or rendering needs today?',
      timestamp: '10:00 AM',
      thoughts: [],
      tasks: []
    }
  ],
  'datavision': [
    {
      sender: 'agent',
      message: 'Welcome to the analytics hub. I am DataVision Pro. Feed me your datasets, numbers, or CSV contents, and I will extract clean, mathematical insights and interactive visual graphs.',
      timestamp: '10:00 AM',
      thoughts: [],
      tasks: []
    }
  ],
  'contentflow': [
    {
      sender: 'agent',
      message: 'Hello! I am ContentFlow AI. Let\'s write copy that hooks readers instantly, design premium content campaigns, or polish your writing for high-impact SEO performance.',
      timestamp: '10:00 AM',
      thoughts: [],
      tasks: []
    }
  ],
  'secureshield': [
    {
      sender: 'agent',
      message: 'SecureShield initialization completed. I am ready to review your architectures, inspect auth setups for vulnerabilities, or construct secure CI/CD deployment logic. Safety-first protocols active.',
      timestamp: '10:00 AM',
      thoughts: [],
      tasks: []
    }
  ],
  'speedtracker': [
    {
      sender: 'agent',
      message: 'Hi! I am SpeedTracker. I can test your internet speed, check ping and latency, and help you find the fastest network in your area. Ready to run a speed test?',
      timestamp: '10:00 AM',
      thoughts: [],
      tasks: []
    }
  ]
};
