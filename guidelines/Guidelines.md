**Add your own guidelines here**

# Prompt Library – Guidelines

## 1. Purpose

A central, minimal, and polished prompt library for product designers, integrated into Figma for quick access during all phases of the design process.  
This library follows **RTCCF** (Role, Task, Context, Constraints, Format) to ensure every prompt is actionable and unambiguous.

---

## 2. Structure in Figma

### **Main Page Sections**

- **Header / Filters**

  - Search bar (mocked for visual reference)
  - Phase filter: Research, IA, Ideation, Prototyping, Stakeholder, Dev Handoff
  - Tag filter: Persona, Quick Win, Deep Dive, Accessibility, Visual Output, Copywriting

- **Prompt Cards (Grid View)**

  - Title (2–3 words max)
  - Phase Tag
  - Impact Badge: 🔥 High Impact, ⚡ Quick Win, ⏱ 5-min Setup
  - Short one-line summary
  - “Open Prompt” button

- **Side Panel (on click)**
  - Full RTCCF prompt
  - Example Output preview toggle
  - “Copy to Clipboard” button
  - “Save as Custom” option

---

## 3. Prompt Card Layout

**Card Components:**

- **Title** → Short and action-oriented
- **Phase Tag** → Top-left, color-coded (consistent across library)
- **Impact Badge** → Top-right (emoji + label)
- **Summary** → One sentence describing value
- **Action Button** → Opens side panel

**Example Card:**
--- [Title] Research Synthesis
Phase: Research | Badge: 🔥 High impact

Turns raw interview notes into patterns, insights, and HMWs.

[View prompt] [ Copy Prompt ]

## 4. Side Panel Layout

**Content Order:**

1. **Prompt Title**
2. **RTCCF Sections**
   - **Role**
   - **Task**
   - **Context**
   - **Constraints**
   - **Format**
3. **Placeholders**: [insert persona], [insert goal], etc.
4. **Example Output**: Optional, toggle to show/hide.
5. **Buttons**:
   - “Copy Prompt”
   - “Save as Custom”

---

## 5. UI Design Rules

- **Color Palette:** White / Light grey background, 1 primary accent color (cobalt blue or emerald green).
- **Typography:** Clean sans-serif (Inter, IBM Plex Sans, SF Pro).
- **Spacing:** 24px card padding, 16px internal element spacing.
- **Icons:** Minimal outline icons for tags, copy, save, search.
- **Interactions:**
  - Hover: Soft shadow
  - Active: Accent border
  - Side panel: Smooth slide-in from right
  - Delightful feedback animations and smooth transitions

---

## 6. Content Formatting Rules (RTCCF)

- **Role**: Always start with “You are…” statement for AI clarity.
- **Task**: Specific action, one sentence.
- **Context**: Product, audience, and relevant constraints.
- **Constraints**: Limitations, rules, or output scope.
- **Format**: Explicit output structure (tables, bullet points, etc.).

**Example:**

--- Role: You are a senior UX researcher.
Task: Cluster qualitative interview notes into patterns and surface insights.
Context: You have [X] user interview transcripts about [product/feature].
Constraints: At least 3 patterns, each with 2+ verbatim quotes, link to HMW.
Format: Table with columns: Pattern, Insight, Evidence, HMW.

## 7. Tagging Rules

**Primary Tags (Phase):**

- Research
- IA
- Ideation
- Prototyping
- Stakeholder
- Dev Handoff

**Secondary Tags:**

- Persona-based
- Quick Win
- Deep Dive
- Accessible Design
- Visual Output
- Copywriting
- Competitive Analysis

---

## 8. Usage Tips for Designers

- **Search First:** Use filters and search to avoid scrolling through irrelevant prompts.
- **Edit Placeholders:** Replace `[ ]` values before sending to AI.
- **Preview Output:** Use example previews to confirm format.
- **Save Variants:** Store personalized prompts back into the library for future use.
- **Link to Assets:** If prompt relates to a Figma file or FigJam board, attach link in “Context” section.

---

## 9. Maintenance Rules

- Quarterly review: Remove unused prompts, add new ones from team learnings.
- Keep all prompts RTCCF-compliant.
- Maintain consistent tone and formatting across library.

---

## 10. Accessibility

- Ensure text contrast meets WCAG AA.
- Make sure all prompts are screen-reader friendly.
- Avoid relying solely on emoji for status/impact indicators.

---