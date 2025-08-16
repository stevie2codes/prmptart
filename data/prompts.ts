export interface Prompt {
  id: string;
  title: string;
  phase: 'Research' | 'IA' | 'Ideation' | 'Prototyping' | 'Stakeholder' | 'Dev Handoff';
  impact: 'High Impact' | 'Quick Win' | '5-min Setup';
  summary: string;
  content: string;
  exampleOutput?: string;
  tags: string[];
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
    tags: ['Deep Dive', 'Persona-based']
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
    tags: ['Persona-based', 'Deep Dive']
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
    tags: ['Competitive Analysis', 'Quick Win']
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
    tags: ['Quick Win']
  },
  {
    id: '5',
    title: 'Analytics Deep Dive',
    phase: 'Research',
    impact: 'Quick Win',
    summary: 'Identify areas where qualitative research could explain quantitative analytics patterns.',
    content: createRTCCFContent(
      'You are a UX researcher with expertise in mixed-methods research and data interpretation.',
      'Review analytics dashboard and suggest areas where qualitative research could explain the numbers.',
      'You have [analytics dashboard] showing [key metrics] for [product/feature] over [time period].',
      'Focus on unexpected patterns, user behavior anomalies, and metrics that need human context.',
      'List format: Metric/Pattern, Possible Explanations, Research Method, Priority.'
    ),
    tags: ['Quick Win', 'Deep Dive']
  },

  // User Flows & Information Architecture
  {
    id: '6',
    title: 'Flow Alternatives',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Generate multiple user flow variations optimized for speed, clarity, and error reduction.',
    content: createRTCCFContent(
      'You are an information architect with expertise in user flow optimization.',
      'Propose 3 alternative user flow diagrams for completing [task], optimizing for different priorities.',
      'Users need to complete [specific task] in [product context] with [known constraints].',
      'One flow for speed, one for clarity, one for error reduction. Include decision points and alternative paths.',
      'Three flow diagrams with: Steps, Decision Points, Error Handling, Trade-offs Analysis.'
    ),
    tags: ['Deep Dive', 'Visual Output']
  },
  {
    id: '7',
    title: 'Onboarding Optimization',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Compare onboarding flows with competitors and suggest improvements to reduce drop-off.',
    content: createRTCCFContent(
      'You are a UX specialist focused on onboarding optimization and conversion improvement.',
      'Compare current onboarding flow to competitors and suggest changes to reduce drop-off.',
      'You have [current onboarding flow] and [competitor flows] with [drop-off data] at each step.',
      'Maintain essential information collection, consider user motivation at each step, suggest A/B tests.',
      'Comparison table with: Current Step, Competitor Approach, Drop-off Rate, Proposed Change, Expected Impact.'
    ),
    tags: ['Competitive Analysis', 'Deep Dive']
  },
  {
    id: '8',
    title: 'Feature Flow Mapping',
    phase: 'IA',
    impact: 'Quick Win',
    summary: 'Map user flows for new features considering both happy path and edge cases.',
    content: createRTCCFContent(
      'You are a product designer with expertise in comprehensive flow mapping and edge case planning.',
      'Map out a complete user flow for [feature] that considers both happy path and critical edge cases.',
      'Users want to [accomplish goal] using [new feature] in [product environment].',
      'Include error states, loading states, empty states, and permission-based variations.',
      'Flow diagram with: Happy Path, Edge Cases, Error Handling, State Variations.'
    ),
    tags: ['Quick Win', 'Deep Dive']
  },
  {
    id: '9',
    title: 'Flow Simplification',
    phase: 'IA',
    impact: 'Quick Win',
    summary: 'Simplify complex flows while preserving necessary decision points and functionality.',
    content: createRTCCFContent(
      'You are a UX architect specializing in complexity reduction and user journey optimization.',
      'Simplify complex flow while preserving all necessary decision points.',
      'You have a [complex user flow] with [X steps] that users find overwhelming or confusing.',
      'Must maintain all essential functionality, preserve critical decision points, reduce cognitive load.',
      'Two simplified variations with: Step Reduction Strategy, Preserved Functions, Trade-off Analysis.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '10',
    title: 'Navigation Structure',
    phase: 'IA',
    impact: 'High Impact',
    summary: 'Design navigation structures that minimize cognitive load based on user personas and tasks.',
    content: createRTCCFContent(
      'You are an information architect with expertise in user-centered navigation design.',
      'Suggest navigation structures that minimize cognitive load based on personas and jobs-to-be-done.',
      'You have [user personas] with [primary tasks] and [mental models] for [product type].',
      'Maximum 3 navigation levels, group related functions, match user expectations and language.',
      'Navigation hierarchy with: Structure Rationale, User Mental Model Alignment, Task Efficiency Analysis.'
    ),
    tags: ['Persona-based', 'Deep Dive']
  },

  // Ideation & Concept Development
  {
    id: '11',
    title: 'Concept Sketches',
    phase: 'Ideation',
    impact: 'High Impact',
    summary: 'Generate multiple solution concepts balancing desirability, feasibility, and viability.',
    content: createRTCCFContent(
      'You are a creative strategist and product designer with expertise in concept development.',
      'Generate 5 concept sketches for solving [user problem], balancing business and user needs.',
      'Users struggle with [specific problem] and need [desired outcome] within [business constraints].',
      'Balance desirability, feasibility, and viability. Include quick validation approaches for each concept.',
      'Concept descriptions with: Core Idea, User Value, Business Impact, Technical Feasibility, Validation Method.'
    ),
    tags: ['Visual Output', 'Deep Dive']
  },
  {
    id: '12',
    title: 'Interaction Models',
    phase: 'Ideation',
    impact: 'Quick Win',
    summary: 'Propose interaction models for MVP features with pros/cons analysis.',
    content: createRTCCFContent(
      'You are an interaction designer with expertise in pattern selection and usability evaluation.',
      'Take MVP scope and propose 3 interaction models with comprehensive pros/cons analysis.',
      'You have [MVP feature requirements] for [user segment] with [technical constraints] and [timeline].',
      'Consider implementation complexity, user familiarity, accessibility, and future scalability.',
      'Model comparison with: Interaction Pattern, User Experience, Development Effort, Scalability, Recommendation.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '13',
    title: 'Validation Concepts',
    phase: 'Ideation',
    impact: '5-min Setup',
    summary: 'Transform insights into wild and practical concepts with rapid validation approaches.',
    content: createRTCCFContent(
      'You are an innovation designer skilled at rapid concept development and validation planning.',
      'Turn insight into 2 wild and 2 practical design concepts with quick validation methods.',
      'You have [key insight] about [user behavior/need] that could inform [product area].',
      'Wild concepts push boundaries, practical concepts are immediately actionable. Include validation timeline.',
      'Concept matrix with: Idea Description, Innovation Level, Validation Method, Timeline, Success Metrics.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '14',
    title: 'Failure Analysis',
    phase: 'Ideation',
    impact: 'Quick Win',
    summary: 'Use reverse brainstorming to identify failure modes and convert them into solutions.',
    content: createRTCCFContent(
      'You are a design strategist with expertise in risk analysis and preventive design thinking.',
      'Facilitate reverse brainstorm - list ways product could fail, then flip into solution ideas.',
      'You are designing [product/feature] for [user segment] in [market context].',
      'Cover UX failures, technical failures, business failures, and adoption failures. Prioritize preventable issues.',
      'Two-column table: Potential Failure Modes, Preventive Solution Concepts.'
    ),
    tags: ['Quick Win', 'Deep Dive']
  },
  {
    id: '15',
    title: 'UI Metaphors',
    phase: 'Ideation',
    impact: '5-min Setup',
    summary: 'Develop UI metaphors that make complex concepts intuitive for target audience.',
    content: createRTCCFContent(
      'You are a UX designer with expertise in mental models and intuitive interface design.',
      'Propose UI metaphors that make this concept intuitive based on brand tone and audience.',
      'You need to make [complex concept] understandable for [target audience] matching [brand personality].',
      'Metaphors should be culturally appropriate, scalable across features, and support learning.',
      'Metaphor options with: Real-world Reference, Interface Application, User Understanding Benefit.'
    ),
    tags: ['Quick Win', 'Visual Output']
  },

  // Prototyping & Testing
  {
    id: '16',
    title: 'Clickable Prototype',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Convert wireframes into mid-fidelity prototypes ready for usability testing.',
    content: createRTCCFContent(
      'You are a prototyping specialist with expertise in creating testable interactive experiences.',
      'Convert wireframes into clickable mid-fidelity prototype for usability testing.',
      'You have [wireframe set] for [user flow] that needs to become [testable prototype].',
      'Focus on core interactions, include realistic content, note any unclear flow transitions.',
      'Prototype specification with: Key Interactions, Content Requirements, Unclear Areas, Testing Readiness.'
    ),
    tags: ['Quick Win', 'Visual Output']
  },
  {
    id: '17',
    title: 'Test Hypotheses',
    phase: 'Prototyping',
    impact: '5-min Setup',
    summary: 'Create testable hypotheses for design variations before high-fidelity development.',
    content: createRTCCFContent(
      'You are a UX researcher focused on rapid validation and evidence-based design decisions.',
      'Suggest quick testable hypotheses for validating design variations before high-fidelity work.',
      'You have [3 design variations] for [specific feature] targeting [user segment].',
      'Hypotheses must be measurable, achievable with available resources, and actionable.',
      'Testing plan with: Variation, Hypothesis, Success Metrics, Testing Method, Timeline.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '18',
    title: 'Usability Review',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Identify potential usability friction points using heuristic evaluation methods.',
    content: createRTCCFContent(
      'You are a usability expert with deep knowledge of interaction design principles and common pain points.',
      'Review prototype and list 5 likely usability friction points based on established heuristics.',
      'You have [prototype/design] for [user flow] targeting [user segment] with [usage context].',
      'Use Nielsen heuristics and accessibility guidelines, prioritize by severity and frequency.',
      'Friction point list with: Issue, Heuristic Violated, Severity, User Impact, Suggested Fix.'
    ),
    tags: ['Quick Win', 'Accessible Design']
  },
  {
    id: '19',
    title: 'Usability Test Script',
    phase: 'Prototyping',
    impact: 'High Impact',
    summary: 'Design comprehensive usability test covering core flows, edge cases, and success metrics.',
    content: createRTCCFContent(
      'You are a UX researcher specializing in moderated usability testing and behavioral observation.',
      'Design moderated usability test script covering core flows, edge cases, and task completion measurement.',
      'You need to test [prototype] with [user segment] focusing on [key user goals].',
      'Include warm-up, core tasks, edge case scenarios, post-task questions, and observation notes.',
      'Test script with: Introduction, Task Scenarios, Follow-up Questions, Success Metrics, Observation Framework.'
    ),
    exampleOutput: 'Task 1: "Imagine you need to [specific scenario]. Walk me through how you would do this."\nObserve: Hesitation points, error recovery, mental model mismatches\nSuccess: Completion rate, time on task, confidence rating',
    tags: ['Deep Dive']
  },
  {
    id: '20',
    title: 'Accessibility Improvements',
    phase: 'Prototyping',
    impact: 'Quick Win',
    summary: 'Identify low-effort UI changes to improve prototype accessibility and inclusion.',
    content: createRTCCFContent(
      'You are an accessibility specialist with expertise in inclusive design and WCAG compliance.',
      'Suggest low-effort UI changes to better support accessibility in the prototype.',
      'You have [prototype/design] that needs accessibility improvements within [development constraints].',
      'Focus on high-impact, low-effort changes. Consider visual, motor, and cognitive accessibility.',
      'Improvement list with: Current Issue, Accessibility Barrier, Proposed Change, Implementation Effort.'
    ),
    tags: ['Accessible Design', 'Quick Win']
  },

  // Stakeholder & PM Conversations
  {
    id: '21',
    title: 'Stakeholder Summary',
    phase: 'Stakeholder',
    impact: '5-min Setup',
    summary: 'Distill design concepts into concise talking points for non-design stakeholders.',
    content: createRTCCFContent(
      'You are a design communicator with expertise in translating design decisions for business audiences.',
      'Summarize design concept in 3 concise talking points tailored for non-design stakeholder.',
      'You need to present [design concept] to [stakeholder type] focusing on [their priorities].',
      'Use business language, focus on outcomes, avoid design jargon, include clear next steps.',
      'Three talking points with: Business Value, User Impact, Implementation Approach.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '22',
    title: 'KPI Alignment',
    phase: 'Stakeholder',
    impact: 'High Impact',
    summary: 'Reframe design rationale to directly connect with KPIs and product priorities.',
    content: createRTCCFContent(
      'You are a strategic designer skilled at connecting design decisions to business outcomes.',
      'Rewrite design rationale so it ties directly to KPIs and product management priorities.',
      'You have [design rationale] that needs to connect with [key metrics] and [PM priorities].',
      'Quantify impact where possible, link to revenue/retention/engagement, show measurement plan.',
      'Business case with: Design Decision, KPI Impact, Success Metrics, Timeline, ROI Projection.'
    ),
    tags: ['Deep Dive']
  },
  {
    id: '23',
    title: 'Objection Handling',
    phase: 'Stakeholder',
    impact: 'Quick Win',
    summary: 'Anticipate stakeholder objections and prepare evidence-based counterpoints.',
    content: createRTCCFContent(
      'You are a design advocate with experience in stakeholder management and persuasive communication.',
      'List 3 likely objections from engineering or product leadership and prepare counterpoints.',
      'You are proposing [design solution] to [leadership team] with [known concerns/constraints].',
      'Address technical feasibility, resource allocation, timeline, and business impact concerns.',
      'Objection handling guide with: Likely Objection, Root Concern, Evidence-Based Response, Compromise Options.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '24',
    title: 'Trade-off Visual',
    phase: 'Stakeholder',
    impact: 'High Impact',
    summary: 'Create visual communication of design trade-offs and decision rationale.',
    content: createRTCCFContent(
      'You are a design strategist with expertise in visual communication and decision frameworks.',
      'Create one-slide visual that communicates design trade-offs and rationale clearly.',
      'You need to show [design decisions] with [trade-offs made] to [stakeholder audience].',
      'Visual should be self-explanatory, show clear priorities, include impact assessment.',
      'Visual framework with: Options Considered, Evaluation Criteria, Trade-off Analysis, Recommended Path.'
    ),
    tags: ['Visual Output', 'Deep Dive']
  },
  {
    id: '25',
    title: 'Decision Logs',
    phase: 'Stakeholder',
    impact: 'Quick Win',
    summary: 'Document major design choices and rationale for product management sign-off.',
    content: createRTCCFContent(
      'You are a design documentarian with expertise in creating clear design decision records.',
      'Draft decision logs that track major design choices and rationale for PM sign-off.',
      'You have made [design decisions] throughout [project timeline] that need formal documentation.',
      'Include context, options considered, decision rationale, and success criteria for each choice.',
      'Decision log with: Date, Decision, Context, Options, Rationale, Success Criteria, Status.'
    ),
    tags: ['Quick Win']
  },

  // Developer Handoff & QA
  {
    id: '26',
    title: 'Component Specs',
    phase: 'Dev Handoff',
    impact: 'High Impact',
    summary: 'Write detailed component specifications including states, responsive behavior, and accessibility.',
    content: createRTCCFContent(
      'You are a design systems specialist with expertise in component specification and developer collaboration.',
      'Write component specification including states, responsive behavior, and accessibility requirements.',
      'You have [UI component] that needs comprehensive documentation for [development team].',
      'Include all interactive states, responsive breakpoints, accessibility requirements, and edge cases.',
      'Specification with: Component Anatomy, States, Responsive Behavior, Accessibility, Implementation Notes.'
    ),
    exampleOutput: 'Button Component:\n- States: Default, Hover, Active, Disabled, Loading\n- Responsive: Full width on mobile, auto width on desktop\n- Accessibility: ARIA labels, keyboard navigation, focus indicators\n- Variants: Primary, Secondary, Destructive',
    tags: ['Accessible Design', 'Deep Dive']
  },
  {
    id: '27',
    title: 'Design Redlines',
    phase: 'Dev Handoff',
    impact: 'Quick Win',
    summary: 'Identify critical redlines and annotations needed for development-ready designs.',
    content: createRTCCFContent(
      'You are a design handoff specialist with deep understanding of developer needs and design precision.',
      'List the top 5 redlines and annotations needed for this screen to be development-ready.',
      'You have [design screen] that needs developer handoff for [platform] with [technical constraints].',
      'Prioritize by implementation risk, focus on spacing, interactions, and responsive behavior.',
      'Redline priority list with: Element, Specification Needed, Why Critical, Implementation Risk.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '28',
    title: 'Design Consistency',
    phase: 'Dev Handoff',
    impact: 'Quick Win',
    summary: 'Review design files for inconsistencies before handoff to prevent implementation issues.',
    content: createRTCCFContent(
      'You are a design quality assurance specialist focused on consistency and implementability.',
      'Review design file for inconsistencies in spacing, typography, and component use before handoff.',
      'You have [design file] ready for handoff to [development team] for [platform/framework].',
      'Check design system compliance, component usage, spacing grid, typography scale, color usage.',
      'QA checklist with: Design Element, Inconsistency Found, Correct Standard, Fix Required.'
    ),
    tags: ['Quick Win']
  },
  {
    id: '29',
    title: 'Acceptance Criteria',
    phase: 'Dev Handoff',
    impact: 'High Impact',
    summary: 'Draft acceptance criteria for QA to validate implementation against design intent.',
    content: createRTCCFContent(
      'You are a design QA specialist with expertise in creating testable design requirements.',
      'Draft acceptance criteria for this feature so QA can validate against design intent.',
      'You have [designed feature] that needs QA validation criteria for [implementation team].',
      'Include visual specifications, interaction behavior, responsive requirements, and edge cases.',
      'Acceptance criteria with: Visual Requirements, Interaction Behavior, Responsive Tests, Edge Case Validation.'
    ),
    tags: ['Deep Dive']
  },
  {
    id: '30',
    title: 'Token Structure',
    phase: 'Dev Handoff',
    impact: 'Quick Win',
    summary: 'Propose design token naming structure for consistent implementation in code.',
    content: createRTCCFContent(
      'You are a design systems architect with expertise in scalable token architecture and developer workflows.',
      'Propose token naming structure for colors, typography, and spacing to maintain consistency in code.',
      'You need to establish [design token system] for [development framework] supporting [product scale].',
      'Names should be semantic, scalable, and align with development conventions and design system structure.',
      'Token structure with: Naming Convention, Examples, Rationale, Implementation Guidelines.'
    ),
    exampleOutput: 'Color Tokens:\n- Semantic: color-text-primary, color-bg-surface, color-border-default\n- Component: button-bg-primary, input-border-focus\n- State: color-error-500, color-success-100',
    tags: ['Quick Win']
  }
];

export const phases = ['Research', 'IA', 'Ideation', 'Prototyping', 'Stakeholder', 'Dev Handoff'] as const;
export const tags = ['Persona-based', 'Quick Win', 'Deep Dive', 'Accessible Design', 'Visual Output', 'Copywriting', 'Competitive Analysis'] as const;