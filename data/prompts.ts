export interface Prompt {
  id: string;
  title: string;
  phase: 'Research' | 'IA' | 'Ideation' | 'Prototyping' | 'Stakeholder' | 'Dev Handoff';
  impact: 'High Impact' | 'Quick Win' | '5-min Setup';
  summary: string;
  content: string;
  exampleOutput?: string;
  tags: string[];
  category: 'design' | 'research' | 'content' | 'development';
  isUserCreated?: boolean;
}

// Helper function to create RTCCF content from individual components
const createRTCCFContent = (role: string, task: string, context: string, constraints: string, format: string): string => {
  return `**Role:**
${role}

**Task:**
${task}

**Context:**
${context}

**Constraints:**
${constraints}

**Format:**
${format}`;
};

export const mockPrompts: Prompt[] = [
  // Research & Discovery
  {
    id: '1',
    title: 'Research Synthesis',
    phase: 'Research',
    impact: 'High Impact',
    summary: 'Cluster and synthesize raw user interview notes into patterns, insights, and HMWs.',
    content: createRTCCFContent(
      'You are a senior UX researcher with expertise in qualitative data analysis.',
      'Cluster qualitative interview notes into patterns and surface actionable insights.',
      'You have [X] user interview transcripts about [product/feature] that need analysis.',
      'At least 3 patterns, each with 2+ verbatim quotes, link each to a How Might We statement.',
      'Table with columns: Pattern, Insight, Evidence (quotes), HMW Statement.'
    ),
    exampleOutput: '| Pattern | Insight | Evidence | HMW Statement |\n|---------|---------|----------|---------------|\n| Navigation Confusion | Users struggle with current menu structure | "I never know where to find settings" | How might we simplify navigation paths? |',
    tags: ['Deep Dive', 'Persona-based'],
    category: 'research'
  },
  {
    id: '2',
    title: 'Behavioral Trends',
    phase: 'Research',
    impact: 'High Impact',
    summary: 'Identify behavioral trends, motivations, and blockers from survey and interview data.',
    content: createRTCCFContent(
      'You are a UX researcher specializing in behavioral analysis and user psychology.',
      'Identify behavioral trends, motivations, and blockers that could inform MVP scope.',
      'You have [survey data] and [interview transcripts] about [product/feature usage].',
      'Focus on actionable insights that directly impact product decisions and feature prioritization.',
      'Sections: Key Behaviors, Core Motivations, Major Blockers, MVP Implications.'
    ),
    tags: ['Persona-based', 'Deep Dive'],
    category: 'research'
  },
  {
    id: '3',
    title: 'Competitive Analysis',
    phase: 'Research',
    impact: 'Quick Win',
    summary: 'Analyze competitor flows to identify differentiators, parity features, and experience gaps.',
    content: createRTCCFContent(
      'You are a competitive intelligence researcher with deep UX analysis skills.',
      'Identify differentiators, parity features, and potential experience gaps from competitor analysis.',
      'You have [competitor screenshots] and [user flows] from [X competitors] in [product category].',
      'Focus on actionable opportunities, avoid feature copying, consider user context differences.',
      'Table with columns: Feature, Competitor Approach, Our Opportunity, Priority Level.'
    ),
    tags: ['Competitive Analysis', 'Quick Win'],
    category: 'research'
  },
  {
    id: '4',
    title: 'Research Questions',
    phase: 'Research',
    impact: '5-min Setup',
    summary: 'Convert business goals into user-centered research questions and testable assumptions.',
    content: createRTCCFContent(
      'You are a UX researcher skilled at translating business objectives into research frameworks.',
      'Translate high-level business goals into user-centered research questions and assumptions to validate.',
      'You have [business goals] and [success metrics] for [product/feature] targeting [user segment].',
      'Create testable hypotheses, prioritize by impact and feasibility, include success criteria.',
      'Table with columns: Business Goal, Research Question, Hypothesis, Success Criteria, Method.'
    ),
    tags: ['Quick Win'],
    category: 'research'
  },
  {
    id: '5',
    title: 'Analytics Deep Dive',
    phase: 'Research',
    impact: 'High Impact',
    summary: 'Analyze user behavior patterns from analytics data to identify opportunities and pain points.',
    content: createRTCCFContent(
      'You are a data analyst specializing in user behavior analytics and UX metrics.',
      'Analyze user behavior patterns from analytics data to identify opportunities and pain points.',
      'You have [analytics data] from [product/feature] including [metrics like page views, conversions, etc.].',
      'Focus on actionable insights, avoid correlation vs causation errors, prioritize by business impact.',
      'Sections: Key Patterns, Pain Points, Opportunities, Recommendations, Next Steps.'
    ),
    tags: ['Deep Dive', 'Data-driven'],
    category: 'research'
  },
  {
    id: '6',
    title: 'User Journey Mapping',
    phase: 'Research',
    impact: 'High Impact',
    summary: 'Create comprehensive user journey maps to identify touchpoints and improvement opportunities.',
    content: createRTCCFContent(
      'You are a UX strategist expert in journey mapping and service design.',
      'Create comprehensive user journey maps to identify touchpoints and improvement opportunities.',
      'You have [user research data] about [user segment] and their experience with [product/service].',
      'Include emotional states, pain points, opportunities, and actionable insights for each touchpoint.',
      'Journey map with phases: Awareness, Consideration, Decision, Usage, Support, Advocacy.'
    ),
    tags: ['Deep Dive', 'Visual Output'],
    category: 'design'
  },
  {
    id: '7',
    title: 'Persona Development',
    phase: 'Research',
    impact: 'High Impact',
    summary: 'Develop detailed user personas based on research data to guide design decisions.',
    content: createRTCCFContent(
      'You are a UX researcher specializing in persona development and user segmentation.',
      'Develop detailed user personas based on research data to guide design decisions.',
      'You have [user research data] including [interviews, surveys, analytics] about [target users].',
      'Create actionable personas with clear goals, pain points, and behavioral patterns.',
      'Persona template: Name, Photo, Demographics, Goals, Pain Points, Behaviors, Motivations, Tech Comfort.'
    ),
    tags: ['Persona-based', 'Deep Dive'],
    category: 'research'
  },
  {
    id: '8',
    title: 'Accessibility Audit',
    phase: 'Research',
    impact: 'Quick Win',
    summary: 'Conduct accessibility audits to identify and prioritize WCAG compliance issues.',
    content: createRTCCFContent(
      'You are an accessibility expert with deep knowledge of WCAG guidelines and inclusive design.',
      'Conduct accessibility audits to identify and prioritize WCAG compliance issues.',
      'You have [product/feature] that needs accessibility evaluation against [WCAG 2.1 AA standards].',
      'Focus on high-impact issues, provide specific remediation steps, prioritize by user impact.',
      'Table with columns: Issue, WCAG Criteria, Impact Level, Remediation Steps, Priority.'
    ),
    tags: ['Accessible Design', 'Quick Win'],
    category: 'design'
  },
  {
    id: '9',
    title: 'Usability Testing',
    phase: 'Research',
    impact: 'High Impact',
    summary: 'Plan and conduct usability testing sessions to identify user experience issues.',
    content: createRTCCFContent(
      'You are a UX researcher expert in usability testing and user experience evaluation.',
      'Plan and conduct usability testing sessions to identify user experience issues.',
      'You have [product/feature] that needs usability evaluation with [target user segment].',
      'Create testable scenarios, recruit appropriate participants, and provide actionable insights.',
      'Sections: Test Plan, Scenarios, Participant Criteria, Metrics, Analysis Framework.'
    ),
    tags: ['Deep Dive', 'Persona-based'],
    category: 'research'
  },
  {
    id: '10',
    title: 'Information Architecture',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Design intuitive information architecture and navigation structures for complex products.',
    content: createRTCCFContent(
      'You are an information architect specializing in complex product structures and user navigation.',
      'Design intuitive information architecture and navigation structures for complex products.',
      'You have [product] with [X features/sections] that needs logical organization and navigation.',
      'Focus on user mental models, minimize cognitive load, ensure findability and usability.',
      'Deliverables: Site map, Navigation structure, Content hierarchy, User flow recommendations.'
    ),
    tags: ['Deep Dive', 'Visual Output'],
    category: 'design'
  },
  {
    id: '11',
    title: 'Content Strategy',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Develop content strategy and governance frameworks for consistent user experiences.',
    content: createRTCCFContent(
      'You are a content strategist expert in information architecture and content governance.',
      'Develop content strategy and governance frameworks for consistent user experiences.',
      'You have [product/website] that needs content organization and governance structure.',
      'Create scalable frameworks, ensure consistency, define voice and tone guidelines.',
      'Sections: Content Audit, Strategy Framework, Governance Model, Voice & Tone, Content Types.'
    ),
    tags: ['Deep Dive', 'Content-focused'],
    category: 'content'
  },
  {
    id: '12',
    title: 'Taxonomy Design',
    phase: 'IA',
    impact: 'Quick Win',
    summary: 'Design classification systems and tagging structures for content organization.',
    content: createRTCCFContent(
      'You are an information architect specializing in taxonomy design and content classification.',
      'Design classification systems and tagging structures for content organization.',
      'You have [content/products] that need logical classification and searchable organization.',
      'Create intuitive categories, ensure scalability, consider user mental models.',
      'Deliverables: Taxonomy structure, Tagging guidelines, Search optimization, Maintenance plan.'
    ),
    tags: ['Quick Win', 'Content-focused'],
    category: 'content'
  },
  {
    id: '13',
    title: 'Search Experience',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Design intuitive search experiences with smart filtering and result ranking.',
    content: createRTCCFContent(
      'You are a UX designer specializing in search experiences and information retrieval.',
      'Design intuitive search experiences with smart filtering and result ranking.',
      'You have [product] with [search functionality] that needs improved user experience.',
      'Focus on query understanding, result relevance, filtering options, and search analytics.',
      'Sections: Search Interface, Filtering Options, Result Ranking, Analytics, Optimization.'
    ),
    tags: ['Deep Dive', 'Visual Output'],
    category: 'design'
  },
  {
    id: '14',
    title: 'Navigation Design',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Design intuitive navigation patterns that guide users through complex information.',
    content: createRTCCFContent(
      'You are a UX designer expert in navigation design and user wayfinding.',
      'Design intuitive navigation patterns that guide users through complex information.',
      'You have [product] with [complex structure] that needs clear navigation patterns.',
      'Focus on user mental models, minimize cognitive load, ensure consistency across platforms.',
      'Deliverables: Navigation patterns, User flows, Consistency guidelines, Testing plan.'
    ),
    tags: ['Deep Dive', 'Visual Output'],
    category: 'design'
  },
  {
    id: '15',
    title: 'Data Visualization',
    phase: 'IA',
    impact: 'Quick Win',
    summary: 'Design effective data visualizations that communicate complex information clearly.',
    content: createRTCCFContent(
      'You are a data visualization expert specializing in UX and information design.',
      'Design effective data visualizations that communicate complex information clearly.',
      'You have [data] that needs to be visualized for [user segment] to understand [insights].',
      'Choose appropriate chart types, ensure accessibility, focus on clarity over aesthetics.',
      'Deliverables: Chart recommendations, Design guidelines, Accessibility checklist, Testing plan.'
    ),
    tags: ['Quick Win', 'Visual Output'],
    category: 'design'
  },
  {
    id: '16',
    title: 'Concept Sketches',
    phase: 'Ideation',
    impact: 'Quick Win',
    summary: 'Create rapid concept sketches to explore different design directions.',
    content: createRTCCFContent(
      'You are a UX designer expert in rapid concept exploration and visual ideation.',
      'Create rapid concept sketches to explore different design directions.',
      'You have [design challenge] that needs multiple concept directions explored quickly.',
      'Focus on quantity over quality, explore diverse approaches, capture key ideas.',
      'Deliverables: 5-10 concept sketches, Key differentiators, Evaluation criteria, Next steps.'
    ),
    tags: ['Quick Win', 'Visual Output'],
    category: 'design'
  },
  {
    id: '17',
    title: 'Interaction Models',
    phase: 'Ideation',
    impact: 'High Impact',
    summary: 'Design interaction models that define how users will engage with your solution.',
    content: createRTCCFContent(
      'You are a UX designer specializing in interaction design and user engagement patterns.',
      'Design interaction models that define how users will engage with your solution.',
      'You have [design concept] that needs interaction patterns and user engagement models.',
      'Focus on user goals, natural interactions, feedback loops, and engagement patterns.',
      'Interaction model: User goals, Interaction patterns, Feedback mechanisms, Engagement loops, Success metrics.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'design'
  },
  {
    id: '18',
    title: 'Validation Concepts',
    phase: 'Ideation',
    impact: '5-min Setup',
    summary: 'Create validation concepts to test assumptions and gather user feedback.',
    content: createRTCCFContent(
      'You are a UX researcher expert in assumption validation and concept testing.',
      'Create validation concepts to test assumptions and gather user feedback.',
      'You have [design assumptions] that need validation through [user feedback methods].',
      'Focus on key assumptions, create testable concepts, plan for rapid feedback.',
      'Validation plan: Key assumptions, Test concepts, Feedback methods, Success criteria, Timeline.'
    ),
    tags: ['Quick Win', 'Validation'],
    category: 'research'
  },
  {
    id: '19',
    title: 'Failure Analysis',
    phase: 'Ideation',
    impact: 'Quick Win',
    summary: 'Analyze potential failure points and create mitigation strategies.',
    content: createRTCCFContent(
      'You are a UX strategist expert in risk assessment and failure prevention.',
      'Analyze potential failure points and create mitigation strategies.',
      'You have [design solution] that needs failure analysis and risk mitigation.',
      'Identify critical failure points, assess impact, create prevention strategies.',
      'Failure analysis: Risk assessment, Failure scenarios, Impact analysis, Mitigation strategies, Monitoring plan.'
    ),
    tags: ['Quick Win', 'Strategic'],
    category: 'design'
  },
  {
    id: '20',
    title: 'UI Metaphors',
    phase: 'Ideation',
    impact: '5-min Setup',
    summary: 'Explore UI metaphors that make complex interactions intuitive.',
    content: createRTCCFContent(
      'You are a UX designer expert in intuitive interface design and metaphor usage.',
      'Explore UI metaphors that make complex interactions intuitive.',
      'You have [complex interaction] that needs intuitive metaphor-based design.',
      'Find familiar real-world analogies, ensure cultural appropriateness, test for clarity.',
      'Metaphor exploration: Real-world analogs, Cultural considerations, Clarity testing, Implementation plan.'
    ),
    tags: ['Quick Win', 'Visual Output'],
    category: 'design'
  },
  {
    id: '21',
    title: 'Clickable Prototype',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Create clickable prototypes for user testing and stakeholder feedback.',
    content: createRTCCFContent(
      'You are a UX designer expert in rapid prototyping and user experience simulation.',
      'Create clickable prototypes for user testing and stakeholder feedback.',
      'You have [design concept] that needs interactive prototyping for [feedback objectives].',
      'Focus on key interactions, realistic user flows, testable scenarios.',
      'Prototype plan: Key interactions, User flows, Testing scenarios, Feedback collection, Iteration strategy.'
    ),
    tags: ['Quick Win', 'Visual Output'],
    category: 'design'
  },
  {
    id: '22',
    title: 'Test Hypotheses',
    phase: 'Prototyping',
    impact: '5-min Setup',
    summary: 'Design experiments to test design hypotheses and validate assumptions.',
    content: createRTCCFContent(
      'You are a UX researcher expert in hypothesis testing and experimental design.',
      'Design experiments to test design hypotheses and validate assumptions.',
      'You have [design hypotheses] that need testing through [experimental methods].',
      'Create testable hypotheses, design experiments, plan for data collection and analysis.',
      'Experiment design: Hypotheses, Test methods, Data collection, Analysis plan, Success criteria.'
    ),
    tags: ['Quick Win', 'Validation'],
    category: 'research'
  },
  {
    id: '23',
    title: 'Usability Review',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Conduct usability reviews to identify potential issues before user testing.',
    content: createRTCCFContent(
      'You are a UX designer expert in usability evaluation and heuristic analysis.',
      'Conduct usability reviews to identify potential issues before user testing.',
      'You have [prototype] that needs usability review before [user testing].',
      'Apply usability heuristics, identify potential issues, prioritize by impact.',
      'Review framework: Heuristic evaluation, Issue identification, Priority assessment, Remediation plan.'
    ),
    tags: ['Quick Win', 'Evaluation'],
    category: 'design'
  },
  {
    id: '24',
    title: 'Usability Test Script',
    phase: 'Prototyping',
    impact: 'High Impact',
    summary: 'Create comprehensive usability test scripts for systematic user evaluation.',
    content: createRTCCFContent(
      'You are a UX researcher expert in usability testing and user evaluation.',
      'Create comprehensive usability test scripts for systematic user evaluation.',
      'You have [prototype] that needs usability testing with [target users].',
      'Create realistic scenarios, clear instructions, measurable tasks, comprehensive data collection.',
      'Test script: Introduction, Scenarios, Tasks, Data collection, Debrief questions, Success metrics.'
    ),
    tags: ['Deep Dive', 'Validation'],
    category: 'research'
  },
  {
    id: '25',
    title: 'Accessibility Improvements',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Identify and implement accessibility improvements for inclusive design.',
    content: createRTCCFContent(
      'You are an accessibility expert specializing in inclusive design and WCAG compliance.',
      'Identify and implement accessibility improvements for inclusive design.',
      'You have [prototype] that needs accessibility evaluation and improvement.',
      'Focus on high-impact accessibility issues, ensure WCAG compliance, prioritize by user impact.',
      'Accessibility plan: Current state, Improvement areas, Implementation priority, Testing strategy, Compliance validation.'
    ),
    tags: ['Accessible Design', 'Quick Win'],
    category: 'design'
  },
  {
    id: '26',
    title: 'Stakeholder Summary',
    phase: 'Stakeholder',
    impact: 'High Impact',
    summary: 'Create comprehensive stakeholder summaries for project alignment.',
    content: createRTCCFContent(
      'You are a UX strategist expert in stakeholder communication and project alignment.',
      'Create comprehensive stakeholder summaries for project alignment.',
      'You have [design project] that needs stakeholder summary and alignment.',
      'Focus on business value, user impact, clear next steps, stakeholder concerns.',
      'Summary structure: Project overview, Key decisions, User value, Business impact, Next steps, Stakeholder feedback.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'content'
  },
  {
    id: '27',
    title: 'KPI Alignment',
    phase: 'Stakeholder',
    impact: 'Quick Win',
    summary: 'Align design decisions with business KPIs and success metrics.',
    content: createRTCCFContent(
      'You are a UX strategist expert in business alignment and KPI measurement.',
      'Align design decisions with business KPIs and success metrics.',
      'You have [design decisions] that need alignment with [business KPIs].',
      'Map design outcomes to business metrics, ensure measurable impact, plan for success tracking.',
      'KPI alignment: Business objectives, Design outcomes, Success metrics, Measurement plan, Reporting framework.'
    ),
    tags: ['Quick Win', 'Strategic'],
    category: 'content'
  },
  {
    id: '28',
    title: 'Objection Handling',
    phase: 'Stakeholder',
    impact: 'High Impact',
    summary: 'Prepare responses to common stakeholder objections and concerns.',
    content: createRTCCFContent(
      'You are a UX strategist expert in stakeholder management and objection handling.',
      'Prepare responses to common stakeholder objections and concerns.',
      'You have [design proposal] that may face [stakeholder objections].',
      'Anticipate concerns, prepare evidence-based responses, focus on business value and user impact.',
      'Objection handling: Common concerns, Evidence-based responses, Business value focus, User impact emphasis, Follow-up plan.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'content'
  },
  {
    id: '29',
    title: 'Trade-off Visual',
    phase: 'Stakeholder',
    impact: 'Quick Win',
    summary: 'Create visual representations of design trade-offs for stakeholder decision-making.',
    content: createRTCCFContent(
      'You are a UX designer expert in visual communication and decision support.',
      'Create visual representations of design trade-offs for stakeholder decision-making.',
      'You have [design decisions] with [trade-offs] that need stakeholder understanding.',
      'Visualize trade-offs clearly, show impact on different stakeholders, support informed decision-making.',
      'Trade-off visualization: Decision options, Impact analysis, Stakeholder effects, Recommendation rationale, Implementation timeline.'
    ),
    tags: ['Quick Win', 'Visual Output'],
    category: 'design'
  },
  {
    id: '30',
    title: 'Decision Logs',
    phase: 'Stakeholder',
    impact: 'Quick Win',
    summary: 'Document design decisions and rationale for future reference and alignment.',
    content: createRTCCFContent(
      'You are a UX strategist expert in decision documentation and project governance.',
      'Document design decisions and rationale for future reference and alignment.',
      'You have [design decisions] that need documentation for [future reference and alignment].',
      'Document decisions clearly, include rationale, capture stakeholder input, plan for future updates.',
      'Decision log: Decision summary, Rationale, Stakeholder input, Implementation plan, Review schedule.'
    ),
    tags: ['Quick Win'],
    category: 'content'
  },
  {
    id: '31',
    title: 'Component Specs',
    phase: 'Dev Handoff',
    impact: 'High Impact',
    summary: 'Create detailed component specifications for development implementation.',
    content: createRTCCFContent(
      'You are a UX designer expert in design specifications and developer collaboration.',
      'Create detailed component specifications for development implementation.',
      'You have [design components] that need detailed specifications for [development team].',
      'Provide comprehensive specs, ensure developer understanding, include all necessary details.',
      'Component specs: Visual design, Interactions, States, Accessibility, Implementation notes, Testing requirements.'
    ),
    tags: ['Deep Dive', 'Technical'],
    category: 'development'
  },
  {
    id: '32',
    title: 'Design Redlines',
    phase: 'Dev Handoff',
    impact: 'Quick Win',
    summary: 'Create precise design redlines for accurate development implementation.',
    content: createRTCCFContent(
      'You are a UX designer expert in design specifications and technical documentation.',
      'Create precise design redlines for accurate development implementation.',
      'You have [design elements] that need precise specifications for [development accuracy].',
      'Provide exact measurements, spacing, typography, colors, and interaction details.',
      'Redline documentation: Measurements, Spacing, Typography, Colors, Interactions, Implementation notes.'
    ),
    tags: ['Quick Win', 'Technical'],
    category: 'development'
  },
  {
    id: '33',
    title: 'Design Consistency',
    phase: 'Dev Handoff',
    impact: 'High Impact',
    summary: 'Ensure design consistency across all components and interactions.',
    content: createRTCCFContent(
      'You are a design systems expert specializing in consistency and quality assurance.',
      'Ensure design consistency across all components and interactions.',
      'You have [design system] that needs consistency validation and [quality assurance].',
      'Review all components, identify inconsistencies, create guidelines, ensure implementation quality.',
      'Consistency audit: Component review, Inconsistency identification, Guideline creation, Implementation validation, Quality metrics.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'design'
  },
  {
    id: '34',
    title: 'Acceptance Criteria',
    phase: 'Dev Handoff',
    impact: 'Quick Win',
    summary: 'Define clear acceptance criteria for design implementation quality.',
    content: createRTCCFContent(
      'You are a UX designer expert in quality assurance and acceptance criteria.',
      'Define clear acceptance criteria for design implementation quality.',
      'You have [design implementation] that needs [acceptance criteria] for quality validation.',
      'Create measurable criteria, ensure clarity, include accessibility requirements, plan for testing.',
      'Acceptance criteria: Visual accuracy, Interaction quality, Accessibility compliance, Performance requirements, Testing methods.'
    ),
    tags: ['Quick Win', 'Quality'],
    category: 'development'
  },
  {
    id: '35',
    title: 'Token Structure',
    phase: 'Dev Handoff',
    impact: 'High Impact',
    summary: 'Design comprehensive design token structure for consistent implementation.',
    content: createRTCCFContent(
      'You are a design systems expert specializing in token architecture and implementation.',
      'Design comprehensive design token structure for consistent implementation.',
      'You have [design system] that needs [token structure] for consistent implementation.',
      'Create scalable token system, ensure consistency, plan for evolution, document clearly.',
      'Token structure: Color tokens, Typography tokens, Spacing tokens, Component tokens, Documentation, Evolution plan.'
    ),
    tags: ['Deep Dive', 'Technical'],
    category: 'development'
  },
  {
    id: '36',
    title: 'Innovation Framework',
    phase: 'Ideation',
    impact: 'High Impact',
    summary: 'Apply innovation frameworks to systematically generate breakthrough ideas.',
    content: createRTCCFContent(
      'You are an innovation strategist expert in systematic ideation frameworks.',
      'Apply innovation frameworks to systematically generate breakthrough ideas.',
      'You have [business challenge] that needs innovative solutions using [framework approach].',
      'Follow framework methodology, ensure diverse perspectives, focus on breakthrough potential.',
      'Framework application: Methodology, Team composition, Process steps, Evaluation criteria, Output format.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'design'
  },
  {
    id: '37',
    title: 'Prototype Planning',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Plan prototyping approach and create rapid prototypes for user testing.',
    content: createRTCCFContent(
      'You are a prototyping expert specializing in rapid iteration and user testing.',
      'Plan prototyping approach and create rapid prototypes for user testing.',
      'You have [design concept] that needs prototyping for [user testing objectives].',
      'Choose appropriate fidelity level, focus on key interactions, plan for rapid iteration.',
      'Plan: Fidelity level, Key features, User testing goals, Iteration strategy, Timeline.'
    ),
    tags: ['Quick Win', 'Visual Output'],
    category: 'design'
  },
  {
    id: '38',
    title: 'Interactive Prototype',
    phase: 'Prototyping',
    impact: 'High Impact',
    summary: 'Create interactive prototypes that simulate real user experiences.',
    content: createRTCCFContent(
      'You are a UX designer expert in interactive prototyping and user experience simulation.',
      'Create interactive prototypes that simulate real user experiences.',
      'You have [design concept] that needs interactive prototyping for [user testing].',
      'Focus on key user flows, realistic interactions, and testable scenarios.',
      'Deliverables: Interactive prototype, User testing scenarios, Success criteria, Iteration plan.'
    ),
    tags: ['Deep Dive', 'Visual Output'],
    category: 'design'
  },
  {
    id: '39',
    title: 'Design System',
    phase: 'Prototyping',
    impact: 'High Impact',
    summary: 'Develop comprehensive design systems for consistent user experiences.',
    content: createRTCCFContent(
      'You are a design systems expert specializing in scalable design frameworks.',
      'Develop comprehensive design systems for consistent user experiences.',
      'You have [product suite] that needs consistent design patterns and components.',
      'Create scalable components, ensure consistency, document guidelines, plan for evolution.',
      'System components: Design tokens, Component library, Documentation, Governance model, Evolution plan.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'design'
  },
  {
    id: '40',
    title: 'User Testing',
    phase: 'Prototyping',
    impact: 'High Impact',
    summary: 'Conduct user testing sessions to validate prototypes and gather feedback.',
    content: createRTCCFContent(
      'You are a UX researcher expert in user testing and prototype validation.',
      'Conduct user testing sessions to validate prototypes and gather feedback.',
      'You have [prototype] that needs user testing to validate [design decisions].',
      'Create realistic scenarios, recruit appropriate users, gather actionable feedback.',
      'Testing plan: Scenarios, Participant criteria, Metrics, Analysis framework, Action items.'
    ),
    tags: ['Deep Dive', 'Persona-based'],
    category: 'research'
  },
  {
    id: '41',
    title: 'Iteration Planning',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Plan design iterations based on user feedback and testing results.',
    content: createRTCCFContent(
      'You are a UX designer expert in iterative design and user feedback integration.',
      'Plan design iterations based on user feedback and testing results.',
      'You have [user testing results] that need to inform [design iteration planning].',
      'Prioritize feedback, plan iterations, ensure user-centered improvements.',
      'Iteration plan: Feedback prioritization, Design changes, Testing strategy, Success metrics.'
    ),
    tags: ['Quick Win', 'Strategic'],
    category: 'design'
  },
  {
    id: '42',
    title: 'Stakeholder Presentation',
    phase: 'Stakeholder',
    impact: 'High Impact',
    summary: 'Present design solutions to stakeholders and gather feedback for alignment.',
    content: createRTCCFContent(
      'You are a UX strategist expert in stakeholder communication and design presentation.',
      'Present design solutions to stakeholders and gather feedback for alignment.',
      'You have [design solution] that needs stakeholder presentation and feedback.',
      'Focus on business value, user impact, and clear next steps for stakeholder alignment.',
      'Presentation structure: Problem, Solution, User value, Business impact, Next steps, Feedback collection.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'content'
  },
  {
    id: '43',
    title: 'Design Review',
    phase: 'Stakeholder',
    impact: 'Quick Win',
    summary: 'Conduct design reviews with stakeholders to ensure alignment and gather feedback.',
    content: createRTCCFContent(
      'You are a UX designer expert in design reviews and stakeholder collaboration.',
      'Conduct design reviews with stakeholders to ensure alignment and gather feedback.',
      'You have [design work] that needs stakeholder review and feedback collection.',
      'Prepare clear presentation, focus on key decisions, gather actionable feedback.',
      'Review structure: Design overview, Key decisions, Rationale, Feedback collection, Action items.'
    ),
    tags: ['Quick Win', 'Collaborative'],
    category: 'design'
  },
  {
    id: '44',
    title: 'Requirements Gathering',
    phase: 'Stakeholder',
    impact: 'High Impact',
    summary: 'Gather and document stakeholder requirements for design projects.',
    content: createRTCCFContent(
      'You are a UX strategist expert in requirements gathering and stakeholder management.',
      'Gather and document stakeholder requirements for design projects.',
      'You have [design project] that needs stakeholder requirements and project scope.',
      'Ensure clear communication, document requirements, validate understanding, plan for changes.',
      'Requirements document: Project scope, Stakeholder needs, Success criteria, Constraints, Timeline.'
    ),
    tags: ['Deep Dive', 'Strategic'],
    category: 'content'
  },
  {
    id: '45',
    title: 'Dev Handoff',
    phase: 'Dev Handoff',
    impact: 'High Impact',
    summary: 'Prepare comprehensive design handoff documentation for development teams.',
    content: createRTCCFContent(
      'You are a UX designer expert in design handoff and developer collaboration.',
      'Prepare comprehensive design handoff documentation for development teams.',
      'You have [design solution] that needs handoff to [development team] for implementation.',
      'Create clear specifications, ensure developer understanding, plan for collaboration and feedback.',
      'Handoff package: Design specs, Component details, Interactions, Assets, Collaboration plan.'
    ),
    tags: ['Deep Dive', 'Technical'],
    category: 'development'
  },
  {
    id: '46',
    title: 'Design QA',
    phase: 'Dev Handoff',
    impact: 'Quick Win',
    summary: 'Conduct design quality assurance to ensure implementation matches design intent.',
    content: createRTCCFContent(
      'You are a UX designer expert in design quality assurance and implementation review.',
      'Conduct design quality assurance to ensure implementation matches design intent.',
      'You have [implemented feature] that needs design QA against [original design specifications].',
      'Review implementation thoroughly, document issues, prioritize fixes, ensure design integrity.',
      'QA process: Implementation review, Issue documentation, Priority assessment, Fix coordination, Final validation.'
    ),
    tags: ['Quick Win', 'Technical'],
    category: 'development'
  }
];

export const phases = ['Research', 'IA', 'Ideation', 'Prototyping', 'Stakeholder', 'Dev Handoff'] as const;
export const tags = ['Persona-based', 'Quick Win', 'Deep Dive', 'Accessible Design', 'Visual Output', 'Copywriting', 'Competitive Analysis'] as const;