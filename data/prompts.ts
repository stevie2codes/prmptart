export interface Prompt {
  id: string;
  title: string;
  phase: 'Research' | 'IA' | 'Ideation' | 'Prototyping' | 'Stakeholder' | 'Flows & IA';
  subcategory?: 'discovery' | 'synthesis' | 'storytelling' | 'validation' | 'brainstorming' | 'opportunity-framing' | 'concept-development' | 'prioritization' | 'navigation-ia' | 'task-flows' | 'content-hierarchy' | 'wireframing' | 'high-fidelity-design' | 'design-crit';
  summary: string;
  content: string;
  exampleOutput?: string;
  tags: string[];
  category: 'design' | 'research' | 'content' | 'development' | 'ideation' | 'flows' | 'prototyping';
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
  // Discovery
  {
    id: '207',
    title: 'Generative Interview Script',
    phase: 'Research',
    subcategory: 'discovery',
    summary: 'Generate a script for conducting generative research interviews.',
    content: createRTCCFContent(
      'You are a UX researcher.',
      'Draft a generative research interview script.',
      'You need to interview [persona] about their current workflow, challenges, and expectations with a SaaS application.',
      'Ensure questions are open-ended, neutral in tone, and structured to avoid bias. Include warm-up, core exploration, and reflection questions.',
      'Deliverables: Interview script with intro, 6–8 core questions, and wrap-up prompts.'
    ),
    tags: ['Interview', 'Generative Research'],
    category: 'research'
  },
  {
    id: '208',
    title: 'Competitive Analysis',
    phase: 'Research',
    subcategory: 'discovery',
    summary: 'Conduct a structured competitive analysis of similar products.',
    content: createRTCCFContent(
      'You are a product researcher.',
      'Perform a competitive analysis of 3–5 comparable products.',
      'You are studying SaaS products used by [persona] for data insights or reporting.',
      'Focus on feature sets, usability strengths, compliance gaps, and differentiators relevant to enterprise/government use cases.',
      'Deliverables: Competitive analysis matrix with product names, key features, strengths, weaknesses, and potential opportunities.'
    ),
    tags: ['Competitive Analysis', 'Benchmarking'],
    category: 'research'
  },
  {
    id: '204',
    title: 'Simulated Usability Interview',
    phase: 'Research',
    subcategory: 'discovery',
    summary: 'Simulate workflows for generating reports.',
    content: createRTCCFContent(
      'You are [persona].',
      'Simulate the steps of creating a quarterly compliance report in a data portal.',
      'You are role-playing as the participant while the moderator guides you.',
      'Answer naturally with detail about frustrations, workarounds, and thought process.',
      'Deliverables: Realistic transcript of a simulated usability test.'
    ),
    tags: ['Multi-Turn', 'Simulation'],
    category: 'research'
  },
  {
    id: '212',
    title: 'Stakeholder Interview Guide',
    phase: 'Research',
    subcategory: 'discovery',
    summary: 'Generate an interview guide for internal stakeholders or policy owners.',
    content: createRTCCFContent(
      'You are a UX researcher.',
      'Draft an interview guide for stakeholders.',
      'You need to interview internal [persona] (e.g., IT, policy owner, department lead) to understand constraints and goals.',
      'Keep tone professional, focus on uncovering organizational priorities, compliance needs, and technical limitations.',
      'Deliverables: Interview guide with 6–8 questions covering goals, success measures, and challenges.'
    ),
    tags: ['Stakeholder Research', 'Interview'],
    category: 'research'
  },

  // Synthesis
  {
    id: '201',
    title: 'Surface User Frustrations',
    phase: 'Research',
    subcategory: 'synthesis',
    summary: 'Identify recurring frustrations in workflows.',
    content: createRTCCFContent(
      'You are a UX researcher analyzing enterprise SaaS product feedback.',
      'Identify three recurring user frustrations with exporting or sharing reports.',
      'You have interview transcripts from [persona] working with reporting systems.',
      'Focus on specific frustrations tied to workflow inefficiency or compliance issues.',
      'Deliverables: Bullet points with frustration + supporting quote for each.'
    ),
    tags: ['One-Shot', 'Frustrations'],
    category: 'research'
  },
  {
    id: '202',
    title: 'Cluster Messy Notes',
    phase: 'Research',
    subcategory: 'synthesis',
    summary: 'Turn messy research notes into clusters and themes.',
    content: createRTCCFContent(
      'You are a research synthesizer.',
      'Cluster raw quotes into themes that highlight workflow pain points.',
      'You have transcripts/notes from [persona] preparing mandated reports.',
      'Focus on compliance risks and repeat inefficiencies; ignore unrelated details.',
      'Deliverables: Clustered themes with one-sentence summaries of user behavior + tension.'
    ),
    tags: ['SGEP', 'Clustering'],
    category: 'research'
  },
  {
    id: '203',
    title: 'From Patterns to Insights',
    phase: 'Research',
    subcategory: 'synthesis',
    summary: 'Transform clustered research into actionable insights with step-by-step reasoning.',
    content: createRTCCFContent(
      'You are a design researcher.',
      'Analyze user quotes to generate deeper insights.',
      'You have a cluster of [persona] feedback about shaping datasets.',
      'Think step by step: What are they trying to achieve? Why is the difficulty occurring? What implication does this have for compliance or accuracy?',
      'Deliverables: Concise design-relevant insight statement.'
    ),
    tags: ['Chain-of-Thought', 'Insight'],
    category: 'research'
  },
  {
    id: '209',
    title: 'User Journey Mapping',
    phase: 'Research',
    subcategory: 'synthesis',
    summary: 'Create a user journey map to highlight workflows, pain points, and opportunities.',
    content: createRTCCFContent(
      'You are a UX researcher and strategist.',
      'Create a user journey map for [persona].',
      'You have research notes and quotes describing their workflow with a data/insight application.',
      'Focus on capturing steps, goals, emotions, and friction points across the journey.',
      'Deliverables: Journey map with phases, user actions, emotions, pain points, and opportunities for improvement.'
    ),
    tags: ['Journey Mapping', 'Experience Mapping'],
    category: 'research'
  },
  {
    id: '213',
    title: 'Thematic Trend Spotting',
    phase: 'Research',
    subcategory: 'synthesis',
    summary: 'Identify cross-context themes from multiple sources of research data.',
    content: createRTCCFContent(
      'You are a research synthesizer.',
      'Spot cross-cutting trends across different [persona] groups.',
      'You have research notes from multiple jurisdictions or branches of government.',
      'Focus on shared patterns, tensions, or opportunities that recur across contexts.',
      'Deliverables: 3–5 high-level themes with supporting evidence from multiple contexts.'
    ),
    tags: ['Trend Analysis', 'Synthesis'],
    category: 'research'
  },

  // Storytelling
  {
    id: '205',
    title: 'Reframe into Design Opportunities',
    phase: 'Research',
    subcategory: 'storytelling',
    summary: 'Turn insights into open-ended “How might we” opportunities.',
    content: createRTCCFContent(
      'You are a strategic design researcher.',
      'Reframe insights into design opportunities.',
      'You have the insight: “[persona] often duplicates reports manually because they don’t trust automated calculations.”',
      'Ensure reframes focus on trust, transparency, and product outcomes like efficiency and compliance confidence.',
      'Deliverables: Three “How might we” questions.'
    ),
    tags: ['Opportunity Framing', 'How-Might-We'],
    category: 'research'
  },
  {
    id: '206',
    title: 'Audience-Specific Insight Storytelling',
    phase: 'Research',
    subcategory: 'storytelling',
    summary: 'Tailor insights for executives and design teams.',
    content: createRTCCFContent(
      'You are a research storyteller.',
      'Rewrite one insight into two tailored narratives.',
      'You have an insight requiring stakeholder communication.',
      'One version should be outcome-driven for executives (compliance, cost savings); the other should be behavioral and flow-specific for designers and devs.',
      'Deliverables: Two rewritten insight summaries + one recommended design step per audience.'
    ),
    tags: ['Storytelling', 'Stakeholder Alignment'],
    category: 'research'
  },
  {
    id: '214',
    title: 'Evidence Matrix Creation',
    phase: 'Research',
    subcategory: 'storytelling',
    summary: 'Organize research evidence across qualitative and quantitative data sources.',
    content: createRTCCFContent(
      'You are a UX researcher.',
      'Create an evidence matrix that combines qualitative and quantitative findings.',
      'You have quotes, survey data, and behavioral logs about [persona] workflows.',
      'Ensure each theme is supported by at least two forms of evidence.',
      'Deliverables: Matrix table with rows as themes and columns for Quotes, Survey Data, and Behavioral Data.'
    ),
    tags: ['Evidence Matrix', 'Storytelling'],
    category: 'research'
  },

  // Validation
  {
    id: '210',
    title: 'Survey Generator',
    phase: 'Research',
    subcategory: 'validation',
    summary: 'Generate a short survey to validate themes with a larger sample of users.',
    content: createRTCCFContent(
      'You are a UX researcher.',
      'Draft a 5–7 question survey to validate themes discovered in qualitative research.',
      'You are studying how [persona] interacts with a data/insight application.',
      'Ensure questions are clear, unbiased, and mix multiple-choice with open-ended for richer data.',
      'Deliverables: Survey with 5–7 questions, labeled by type (MCQ, scale, open text).'
    ),
    tags: ['Survey', 'Validation'],
    category: 'research'
  },
  {
    id: '211',
    title: 'Persona Hypothesis Builder',
    phase: 'Research',
    subcategory: 'validation',
    summary: 'Transform raw notes into draft personas for alignment.',
    content: createRTCCFContent(
      'You are a UX strategist.',
      'Generate a proto-persona profile from research notes.',
      'You have early data about [persona] including goals, frustrations, and workflows.',
      'Keep the output lightweight for early-stage alignment, not final persona documentation.',
      'Deliverables: Proto-persona with attributes: Goals, Needs, Behaviors, Pain Points, Tools Used.'
    ),
    tags: ['Persona', 'Hypothesis'],
    category: 'research'
  },

  // Ideation Prompts
  // Brainstorming
  {
    id: '303',
    title: 'Concept Sketch Prompts',
    phase: 'Ideation',
    subcategory: 'brainstorming',
    summary: 'Generate prompts for creating concept sketches and visual ideation.',
    content: createRTCCFContent(
      'You are a creative facilitator specializing in visual ideation and concept development.',
      'Generate prompts for creating concept sketches and visual ideation.',
      'You need to help [persona] create concept sketches for [product/feature] that needs visual ideation.',
      'Focus on creative prompts that encourage visual thinking, rapid sketching, and concept exploration.',
      'Deliverables: 5-7 concept sketch prompts with clear objectives and creative constraints.'
    ),
    tags: ['Brainstorming', 'Visual Ideation'],
    category: 'ideation'
  },

  // Brainstorming - Crazy 8s Expansion
  {
    id: '305',
    title: 'Crazy 8s Expansion',
    phase: 'Ideation',
    subcategory: 'brainstorming',
    summary: 'Generate divergent solution sketches in a Crazy 8s format.',
    content: createRTCCFContent(
      'You are a product designer facilitating a workshop.',
      'Expand one core idea into 8 variations.',
      'You have an insight about [persona] and a design opportunity to explore.',
      'Each idea should be distinct, time-boxed, and described concisely.',
      'Deliverables: 8 idea variations with 1–2 sentence descriptions each.'
    ),
    tags: ['Brainstorming', 'Divergence'],
    category: 'ideation'
  },

  // Brainstorming - Blue Sky Exploration
  {
    id: '306',
    title: 'Blue Sky Exploration',
    phase: 'Ideation',
    subcategory: 'brainstorming',
    summary: 'Encourage unconstrained idea generation beyond current limitations.',
    content: createRTCCFContent(
      'You are a design facilitator.',
      'Generate 5–7 “blue sky” solutions that ignore today’s constraints.',
      'You have a problem statement about [persona] experiencing friction in workflows.',
      'Think beyond technical limits, compliance rules, or budget. Focus on pure possibilities.',
      'Deliverables: List of 5–7 unconstrained ideas with imaginative framing.'
    ),
    tags: ['Brainstorming', 'Exploration'],
    category: 'ideation'
  },

  // Opportunity Framing
  {
    id: '307',
    title: 'How Might We Generator',
    phase: 'Ideation',
    subcategory: 'opportunity-framing',
    summary: 'Transform insights into open-ended "How Might We" questions.',
    content: createRTCCFContent(
      'You are a design strategist.',
      'Generate "How Might We" questions.',
      'You have an insight from research about [persona] pain points or unmet needs.',
      'Ensure each question is user-centered, open-ended, and aligned with product outcomes.',
      'Deliverables: 3–5 "How Might We" questions phrased clearly for a workshop.'
    ),
    tags: ['Opportunity Framing', 'How-Might-We'],
    category: 'ideation'
  },
  {
    id: '308',
    title: 'Constraint-Driven Ideation',
    phase: 'Ideation',
    subcategory: 'opportunity-framing',
    summary: 'Reframe opportunities under intentional constraints.',
    content: createRTCCFContent(
      'You are a product strategist.',
      'Generate solution ideas under specific constraints.',
      'You have an insight about [persona] and a known problem area.',
      'Apply a constraint like "half the resources," "mobile-only," or "1-day build."',
      'Deliverables: 3–4 solution directions, each framed by how the constraint changes the idea.'
    ),
    tags: ['Opportunity Framing', 'Constraints'],
    category: 'ideation'
  },

  // Concept Development
  {
    id: '309',
    title: 'Concept Sketch Prompts',
    phase: 'Ideation',
    subcategory: 'concept-development',
    summary: 'Generate divergent early concepts for a workflow or feature.',
    content: createRTCCFContent(
      'You are a product designer.',
      'Suggest divergent concept directions for a new feature.',
      'You have a workflow insight about [persona] and a prototype idea to explore.',
      'Focus on breadth over depth; emphasize different angles of solving the same need.',
      'Deliverables: 3–4 concept directions described in 2–3 sentences each, with pros/cons.'
    ),
    tags: ['Concept Development', 'Brainstorming'],
    category: 'ideation'
  },
  {
    id: '310',
    title: 'Idea Remix Generator',
    phase: 'Ideation',
    subcategory: 'concept-development',
    summary: 'Combine or remix existing ideas into hybrid concepts.',
    content: createRTCCFContent(
      'You are a design thinker.',
      'Generate new ideas by remixing or combining two or more existing concepts.',
      'You have a set of early concepts for [persona] workflows.',
      'Ensure remixes are distinct from the originals and highlight added value.',
      'Deliverables: 3–5 hybrid ideas with clear descriptions of how they combine existing elements.'
    ),
    tags: ['Concept Development', 'Remix'],
    category: 'ideation'
  },

  // Prioritization
  {
    id: '311',
    title: 'Impact/Effort Matrix',
    phase: 'Ideation',
    subcategory: 'prioritization',
    summary: 'Prioritize concepts based on impact and effort.',
    content: createRTCCFContent(
      'You are a product strategist.',
      'Organize ideas into an Impact vs Effort matrix.',
      'You have a list of 5–10 potential solutions generated for [persona].',
      'Classify ideas into four quadrants (Quick Wins, Major Projects, Fill-Ins, Time Wasters) and explain rationale.',
      'Deliverables: A matrix with quadrants labeled and each idea placed, with 1–2 sentence rationale.'
    ),
    tags: ['Prioritization', 'Convergence'],
    category: 'ideation'
  },
  {
    id: '312',
    title: 'Dot Voting Simulation',
    phase: 'Ideation',
    subcategory: 'prioritization',
    summary: 'Simulate dot-voting to converge on top ideas.',
    content: createRTCCFContent(
      'You are a workshop facilitator.',
      'Run a simulated dot-voting session.',
      'You have a set of 6–8 ideas generated for [persona].',
      'Assign a limited number of "votes" (e.g., 3 per participant) and show which ideas surface to the top.',
      'Deliverables: Ranked list of ideas with vote counts and a short summary of why each idea resonated.'
    ),
    tags: ['Prioritization', 'Workshop'],
    category: 'ideation'
  },

  // User Flows & Information Architecture Prompts
  // Navigation & IA
  {
    id: '401',
    title: 'Information Architecture',
    phase: 'Flows & IA',
    subcategory: 'navigation-ia',
    summary: 'Design a clear information architecture and navigation model.',
    content: createRTCCFContent(
      'You are an information architect.',
      'Propose a site/app IA with primary/secondary nav and labeled sections.',
      'You have a complex product used by [persona] with multiple modules and reports.',
      'Align to user mental models; minimize cognitive load; ensure findability and scalability.',
      'Deliverables: IA outline, top-nav/side-nav proposal, section descriptions, and cross-links.'
    ),
    tags: ['IA', 'Navigation'],
    category: 'flows'
  },
  {
    id: '402',
    title: 'Navigation Mapping',
    phase: 'Flows & IA',
    subcategory: 'navigation-ia',
    summary: 'Map navigation routes between key areas and expected entry points.',
    content: createRTCCFContent(
      'You are a UX designer.',
      'Create a navigation map showing primary routes and key entry points.',
      'You have modules frequently accessed by [persona] (e.g., Datasets, Reports, Compliance, Admin).',
      'Prioritize shortest viable paths; avoid dead ends; include breadcrumbs and back-path logic.',
      'Deliverables: Navigation map with labeled routes, entry/exit points, and guardrails.'
    ),
    tags: ['Navigation', 'Wayfinding'],
    category: 'flows'
  },
  {
    id: '403',
    title: 'Wayfinding Scenarios',
    phase: 'Flows & IA',
    subcategory: 'navigation-ia',
    summary: 'Stress-test wayfinding with realistic user goals.',
    content: createRTCCFContent(
      'You are a UX researcher.',
      'Define wayfinding scenarios and success paths.',
      'You need to validate how [persona] finds a target (e.g., "Find last quarter\'s audit report").',
      'Design scenarios that test labels, grouping, and recovery from wrong turns.',
      'Deliverables: 3–4 wayfinding scenarios with starting point, intended route, detours, and success criteria.'
    ),
    tags: ['Wayfinding', 'Validation'],
    category: 'flows'
  },

  // Task Flows
  {
    id: '404',
    title: 'Task Flow Generator',
    phase: 'Flows & IA',
    subcategory: 'task-flows',
    summary: 'Draft a step-by-step task flow for a core job.',
    content: createRTCCFContent(
      'You are a product designer.',
      'Generate a task flow for a critical job to be done.',
      'You have a goal for [persona] (e.g., "Create and share a quarterly compliance report").',
      'Capture system states, decisions, and handoffs; include preconditions/postconditions.',
      'Deliverables: Linear task flow with steps, decision diamonds, and system/user actions.'
    ),
    tags: ['Task Flow', 'JTBD'],
    category: 'flows'
  },
  {
    id: '405',
    title: 'Edge Case Flow Mapping',
    phase: 'Flows & IA',
    subcategory: 'task-flows',
    summary: 'Map failure paths and exception handling around a task.',
    content: createRTCCFContent(
      'You are a UX systems thinker.',
      'Extend a base task flow with edge cases and exceptions.',
      'You have a core flow used by [persona]; identify points of failure (permissions, missing data, timeouts).',
      'Ensure recoverability and clear messaging; propose guardrails and retries.',
      'Deliverables: Extended flow with alternate paths, error states, and recovery steps.'
    ),
    tags: ['Edge Cases', 'Resilience'],
    category: 'flows'
  },
  {
    id: '406',
    title: 'Alternate Pathways Exploration',
    phase: 'Flows & IA',
    subcategory: 'task-flows',
    summary: 'Propose alternative routes to complete the same task.',
    content: createRTCCFContent(
      'You are a UX strategist.',
      'Design 2–3 alternate pathways for the same outcome.',
      'You have a target outcome for [persona] (e.g., "Publish a dataset to a shared workspace").',
      'Offer variations for novice vs. expert users; minimize redundant steps.',
      'Deliverables: Comparative pathways with pros/cons and recommended default.'
    ),
    tags: ['Alternate Paths', 'Usability'],
    category: 'flows'
  },
  {
    id: '410',
    title: 'User Flow Setup',
    phase: 'Flows & IA',
    subcategory: 'task-flows',
    summary: 'Create a clear, step-by-step user flow for a specific task in your product.',
    content: createRTCCFContent(
      'You are a UX designer specializing in mapping user flows for complex enterprise SaaS applications.',
      'Design a clear user flow for a [persona] completing [specific task].',
      'The product is a government SaaS application where users interact with data and insights. Focus on a specific scenario such as report creation, approvals, or data entry.',
      'Ensure the flow minimizes friction, follows logical steps, and accounts for edge cases. Highlight where decision points or system feedback occur.',
      'Deliverables: Visual or text-based flow with steps, decision branches, annotations for pain points or opportunities.'
    ),
    tags: ['Flow Mapping', 'Process Design'],
    category: 'flows'
  },

  // Content Hierarchy
  {
    id: '407',
    title: 'Content Priority Mapping',
    phase: 'Flows & IA',
    subcategory: 'content-hierarchy',
    summary: 'Define content hierarchy for a key page or template.',
    content: createRTCCFContent(
      'You are a content-first designer.',
      'Prioritize content blocks and interactions.',
      'You have a page used by [persona] (e.g., Report Detail, Dataset Overview).',
      'Rank content by decision-making relevance; align labels to domain language.',
      'Deliverables: Ordered content list with purpose, example microcopy, and interaction notes.'
    ),
    tags: ['Content Strategy', 'Hierarchy'],
    category: 'flows'
  },
  {
    id: '408',
    title: 'Hierarchy Audit',
    phase: 'Flows & IA',
    subcategory: 'content-hierarchy',
    summary: 'Assess current pages for clarity and visual hierarchy.',
    content: createRTCCFContent(
      'You are a UX auditor.',
      'Audit existing page layouts for hierarchy and scannability.',
      'You have screenshots/links of pages used by [persona].',
      'Identify clutter, competing headers, unclear grouping; propose quick-win fixes.',
      'Deliverables: Audit findings with before/after hierarchy recommendations.'
    ),
    tags: ['Audit', 'Heuristics'],
    category: 'flows'
  },
  {
    id: '409',
    title: 'Card Sorting Simulation',
    phase: 'Flows & IA',
    subcategory: 'content-hierarchy',
    summary: 'Simulate an open/closed card sort to validate labeling and grouping.',
    content: createRTCCFContent(
      'You are a UX researcher.',
      'Run a simulated card sort on key labels/categories.',
      'You have a set of items [paste labels] to group for [persona].',
      'Suggest likely groupings, label candidates, and ambiguous items to test with users.',
      'Deliverables: Proposed groups, candidate labels, and a shortlist of items needing validation.'
    ),
    tags: ['Card Sorting', 'Labeling'],
    category: 'flows'
  },

  // Prototyping & Design Prompts
  // Wireframing
  {
    id: '501',
    title: 'Wireframe Layout Generator',
    phase: 'Prototyping',
    subcategory: 'wireframing',
    summary: 'Generate wireframe layouts for a key screen.',
    content: createRTCCFContent(
      'You are a UX designer creating early wireframes.',
      'Generate 2–3 wireframe layout options for a single screen.',
      'You have a workflow where [persona] needs to complete [task] in a government SaaS app.',
      'Focus on clarity, hierarchy, and logical grouping of actions and content. Do not add visual styling yet.',
      'Deliverables: 2–3 wireframe layout options described with sections, placement, and interaction notes.'
    ),
    tags: ['Wireframing', 'Layout'],
    category: 'prototyping'
  },
  {
    id: '502',
    title: 'Screen Comparison Variants',
    phase: 'Prototyping',
    subcategory: 'wireframing',
    summary: 'Compare different wireframe approaches for the same task.',
    content: createRTCCFContent(
      'You are a UX designer exploring alternatives.',
      'Propose 2 different wireframe variants for the same task flow.',
      'You have a screen where [persona] must complete [task].',
      'Each variant should highlight different navigation or layout strategies.',
      'Deliverables: Side-by-side descriptions of 2 wireframe options with pros/cons for each.'
    ),
    tags: ['Wireframing', 'Variants'],
    category: 'prototyping'
  },
  {
    id: '503',
    title: 'Content-to-Wireframe Mapping',
    phase: 'Prototyping',
    subcategory: 'wireframing',
    summary: 'Turn content requirements into wireframe sections.',
    content: createRTCCFContent(
      'You are a content-first UX designer.',
      'Translate a list of content items into a wireframe structure.',
      'You have content blocks (headings, tables, filters, charts) required for [persona].',
      'Prioritize content based on importance to user decisions; map each block to wireframe placement.',
      'Deliverables: Wireframe description with clear content hierarchy and rationale for ordering.'
    ),
    tags: ['Wireframing', 'Content Strategy'],
    category: 'prototyping'
  },

  // High Fidelity Design
  {
    id: '504',
    title: 'UI Exploration Prompts',
    phase: 'Prototyping',
    subcategory: 'high-fidelity-design',
    summary: 'Explore high fidelity UI design directions.',
    content: createRTCCFContent(
      'You are a product designer exploring UI visual styles.',
      'Generate 2–3 distinct high fidelity design directions for a single screen.',
      'You have a wireframe for [persona] completing [task].',
      'Each direction should use different color, typography, and layout emphasis but remain accessible and usable.',
      'Deliverables: 2–3 styled UI mockup descriptions highlighting differences in visual system and tone.'
    ),
    tags: ['High Fidelity', 'UI Variants'],
    category: 'prototyping'
  },
  {
    id: '505',
    title: 'Design System Application',
    phase: 'Prototyping',
    subcategory: 'high-fidelity-design',
    summary: 'Apply an existing design system to high fidelity prototypes.',
    content: createRTCCFContent(
      'You are a product designer working within a design system.',
      'Translate a wireframe into a high fidelity screen using defined components.',
      'You have wireframes for [persona] workflows that need consistency with the design system.',
      'Focus on applying the correct components, spacing, and styles from the system.',
      'Deliverables: High fidelity mockup descriptions with design system components mapped to each section.'
    ),
    tags: ['High Fidelity', 'Design System'],
    category: 'prototyping'
  },
  {
    id: '506',
    title: 'Accessibility-Focused Redesign',
    phase: 'Prototyping',
    subcategory: 'high-fidelity-design',
    summary: 'Redesign a screen with accessibility as the primary lens.',
    content: createRTCCFContent(
      'You are an accessibility-focused designer.',
      'Redesign a screen to improve accessibility and inclusivity.',
      'You have a high fidelity screen used by [persona].',
      'Ensure color contrast, keyboard navigation, text size, screen reader labels, and error messaging are optimized.',
      'Deliverables: Annotated redesign recommendations highlighting accessibility improvements.'
    ),
    tags: ['High Fidelity', 'Accessibility'],
    category: 'prototyping'
  },

  // Design Crit
  {
    id: '507',
    title: 'Screenshot Usability Review',
    phase: 'Prototyping',
    subcategory: 'design-crit',
    summary: 'Analyze a screenshot and suggest usability and design improvements.',
    content: createRTCCFContent(
      'You are a senior UX designer conducting a heuristic review.',
      'Evaluate the provided screenshot and propose actionable improvements.',
      'You have a high-fidelity screen used by [persona] for [task] in a government SaaS application.',
      'Focus feedback on clarity of hierarchy, navigation, accessibility, and consistency with design system best practices. Prioritize the top 3–5 changes with highest impact.',
      'Deliverables: List of prioritized improvement ideas with rationale, grouped under categories such as Layout, Interaction, Content, and Accessibility.'
    ),
    tags: ['Heuristic Review', 'Usability', 'Screenshot Input'],
    category: 'prototyping'
  },
  {
    id: '508',
    title: 'Before/After Comparison Crit',
    phase: 'Prototyping',
    subcategory: 'design-crit',
    summary: 'Compare two screenshots (current vs redesign) and provide structured feedback.',
    content: createRTCCFContent(
      'You are a senior UX reviewer.',
      'Analyze two screenshots (before and after) to highlight improvements and remaining issues.',
      'You have a current screen and a redesigned screen for [persona] completing [task].',
      'Compare hierarchy, clarity, accessibility, and adherence to design system standards. Highlight what improved, what regressed, and opportunities still open.',
      'Deliverables: Comparison table with columns for "Before," "After," and "Comments," plus top 3 recommendations for further improvement.'
    ),
    tags: ['Design Critique', 'Comparison', 'Screenshot Input'],
    category: 'prototyping'
  },
  {
    id: '509',
    title: 'Accessibility Audit Crit',
    phase: 'Prototyping',
    subcategory: 'design-crit',
    summary: 'Review a screenshot for accessibility issues and propose fixes.',
    content: createRTCCFContent(
      'You are an accessibility auditor.',
      'Evaluate the screenshot for accessibility barriers.',
      'You have a high-fidelity screen used by [persona] for [task].',
      'Check contrast ratios, font sizes, alt text affordances, keyboard focus states, and error handling. Recommend fixes aligned with WCAG 2.1 AA.',
      'Deliverables: List of top accessibility issues, their severity, and specific design or content changes to resolve them.'
    ),
    tags: ['Accessibility', 'Critique'],
    category: 'prototyping'
  },
  {
    id: '510',
    title: 'Design System Consistency Check',
    phase: 'Prototyping',
    subcategory: 'design-crit',
    summary: 'Evaluate whether a screen is consistent with the design system.',
    content: createRTCCFContent(
      'You are a design systems specialist.',
      'Review a screenshot for consistency with the design system.',
      'You have a high-fidelity screen meant to use standardized components.',
      'Identify where deviations occur (colors, spacing, components, typography) and whether they are justified.',
      'Deliverables: Annotated list of inconsistencies, recommended fixes, and note of any new components worth considering.'
    ),
    tags: ['Design System', 'Consistency', 'Critique'],
    category: 'prototyping'
  },
  {
    id: '511',
    title: 'Content Clarity Crit',
    phase: 'Prototyping',
    subcategory: 'design-crit',
    summary: 'Assess the clarity and readability of text within a design.',
    content: createRTCCFContent(
      'You are a UX writer and content strategist.',
      'Review all text and microcopy in the screenshot.',
      'You have a high-fidelity design for [persona] completing [task].',
      'Look for jargon, overly complex phrasing, missing labels, or unhelpful error messages. Propose clearer alternatives.',
      'Deliverables: Side-by-side copy audit with suggested rewrites and rationale for each.'
    ),
    tags: ['Content', 'Microcopy', 'Critique'],
    category: 'prototyping'
  },
  {
    id: '512',
    title: 'First Impression Crit',
    phase: 'Prototyping',
    subcategory: 'design-crit',
    summary: 'Assess what users notice first and whether it matches intended priorities.',
    content: createRTCCFContent(
      'You are a UX researcher simulating a first impression test.',
      'Evaluate what a new user\'s eyes and attention are likely drawn to first.',
      'You have a high-fidelity design meant for [persona] completing [task].',
      'Compare intended hierarchy (designer\'s goals) with likely user perception. Highlight mismatches and distractions.',
      'Deliverables: Ranked list of visual elements in order of attention grab, with notes on alignment or misalignment to priorities.'
    ),
    tags: ['Visual Hierarchy', 'Attention', 'Critique'],
    category: 'prototyping'
  }
];