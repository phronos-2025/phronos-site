# Methods Article Schema

**Version:** 2.0.0  
**Date:** 2026-01-05  
**Status:** Active  
**Alignment:** ARCHITECTURE.md v1.3.0, BRAND.yaml v1.3.0

---

## Overview

Methods articles document the *how* of Phronos research—the analytical procedures, statistical techniques, and computational pipelines that produce findings. They are distinct from Dispatches, which present *findings and interpretations*.

This schema defines:
1. The two-tier hierarchy (Families and Studies)
2. Frontmatter specifications
3. Content structure requirements
4. Workflow for extracting methods from Jupyter notebooks
5. Guidelines for mathematical and narrative exposition

---

## 1. Hierarchical Structure

### 1.1 Two-Tier Model

```
Method Family (MTH-NNN)
├── Overview: Framework, assumptions, dataset, shared infrastructure
└── Studies (MTH-NNN.N)
    ├── MTH-NNN.1: First specific analysis
    ├── MTH-NNN.2: Second specific analysis
    └── MTH-NNN.N: Additional analyses
```

### 1.2 When to Create a New Family vs. Study

**Create a new Family (MTH-NNN) when:**
- Introducing a fundamentally new methodology or analytical framework
- Working with a new primary dataset
- Addressing a new research domain (e.g., conversational assessment vs. observational analysis)

**Create a new Study (MTH-NNN.N) when:**
- Applying an existing framework to a new question
- Extending analysis within the same dataset
- Developing a new metric or procedure within an established methodology

### 1.3 URL Structure

```
/methods/                                              # Listing page
/methods/[family-slug]/                                # Family overview
/methods/[family-slug]/[study-slug]/                   # Individual study
```

**Example:**
```
/methods/observational-chat-analysis/                  # MTH-001
/methods/observational-chat-analysis/engagement-prediction/   # MTH-001.1
/methods/observational-chat-analysis/semantic-exploration/    # MTH-001.2
/methods/observational-chat-analysis/model-upgrade-impact/    # MTH-001.3
/methods/observational-chat-analysis/concerning-sessions/     # MTH-001.4
```

### 1.4 ID Conventions

| Level | Format | Example | Stability |
|-------|--------|---------|-----------|
| Family | MTH-NNN | MTH-001 | Permanent |
| Study | MTH-NNN.N | MTH-001.3 | Permanent |
| Version | vX.Y | v1.2 | Increments |
| Section anchor | #kebab-case | #toxicity-analysis | Stable after publication |

**Citation format:** `MTH-001.3#toxicity-analysis v1.0`

---

## 2. Frontmatter Specifications

### 2.1 Method Family Frontmatter

```yaml
---
# === IDENTIFICATION ===
id: MTH-001
slug: observational-chat-analysis
type: family                          # Distinguishes from studies

# === CONTENT ===
title: "Observational Chat Analysis"
subtitle: "Framework for analyzing real-world human-AI conversations at scale"
abstract: |
  A methodology for analyzing naturalistic human-AI conversations to measure 
  engagement patterns, content dynamics, and user behavior. Developed using 
  the WildChat dataset (N=4.7M conversations, 2.4M users) with validated 
  classifiers and reproducible pipelines.

# === METADATA ===
date: 2025-12-29                      # Initial publication
updated: 2026-01-05                   # Most recent revision
version: "1.1"
status: published                     # published | researching | planned | archived

# === DATASET ===
dataset:
  name: "WildChat-4.8M"
  source: "Allen AI Institute"
  size: "4,743,336 conversations"
  collection_period: "April 2023 – July 2025"
  url: "https://huggingface.co/datasets/allenai/WildChat"

# === RELATIONSHIPS ===
related_instruments:
  - INS-001
studies:                              # Auto-populated or manually maintained
  - MTH-001.1
  - MTH-001.2
  - MTH-001.3
  - MTH-001.4

# === SEO/GEO ===
description: "Framework for analyzing real-world human-AI conversations at scale using the WildChat dataset. Includes validated classifiers, session analysis, and engagement metrics."
keywords:
  - human-AI interaction
  - conversational AI
  - WildChat
  - engagement analysis
  - observational methods

# === AUTHORSHIP ===
author: "Vishal Patel"
contributors: []                      # Optional: other contributors
---
```

### 2.2 Method Study Frontmatter

```yaml
---
# === IDENTIFICATION ===
id: MTH-001.4
slug: concerning-sessions
type: study                           # Distinguishes from families
family: MTH-001                       # Parent family ID
family_slug: observational-chat-analysis
order: 4                              # Position within family

# === CONTENT ===
title: "Characterizing Concerning Usage Sessions"
subtitle: "Disaggregating Extended Engagement Patterns to Identify Genuine Risk Signals"
abstract: |
  Analysis of 2,259 concerning sessions (0.36% of 622,589 total) reveals that 
  duration-based criteria conflate qualitatively different behaviors. The largest 
  segment (41.8%) represents benign extended use. Only 7.5% represent highest-concern 
  patterns combining problematic content with late-night timing.

# === METADATA ===
date: 2026-01-05                      # Initial publication
updated: null                         # Set on revision
version: "1.0"
status: published                     # published | researching | planned | archived

# === SECTIONS (for deep linking) ===
sections:
  - anchor: defining-concerning-sessions
    title: "Defining Concerning Sessions"
  - anchor: toxicity-analysis
    title: "Toxicity Analysis"
  - anchor: temporal-patterns
    title: "Temporal Patterns"
  - anchor: user-persistence
    title: "User Persistence"
  - anchor: emergence-timing
    title: "Emergence Timing"
  - anchor: segment-taxonomy
    title: "Segment Taxonomy"

# === LINEAGE ===
supersedes: null                      # Previous version ID if major revision
notebook: "12_ConcerningSessionsDeepDive.ipynb"

# === SEO/GEO ===
description: "MTH-001.4: Analysis of concerning usage sessions in conversational AI. Only 7.5% of flagged sessions represent highest-risk patterns; 41.8% are benign extended use."
keywords:
  - concerning sessions
  - user safety
  - session analysis
  - toxicity
  - extended engagement

# === AUTHORSHIP ===
author: "Vishal Patel"
---
```

---

## 3. Content Structure

### 3.1 Family Overview Structure

```markdown
# [Title]

## Abstract
[2-3 paragraph overview of the methodology framework]

## Assumptions
[Numbered list of foundational assumptions with caveats]

## Dataset
[Description of primary dataset, access, and known limitations]

## Shared Infrastructure
[Common tools, pipelines, or classifiers used across studies]

## Studies in This Family
[Auto-generated or curated list of child studies with abstracts]

## Limitations
[Framework-level limitations that apply to all studies]

## Changelog
[Version history table]
```

### 3.2 Study Structure

```markdown
# [Title]

## Executive Summary
[3-5 sentence overview: question, approach, key finding]

## 1. Motivation
### 1.1 [Context]
### 1.2 Research Questions
[Explicit enumeration of questions addressed]

## 2. Methods
### 2.1 [First methodological component]
### 2.2 [Second methodological component]
...

## 3. Metrics and Calculations
### 3.1 [First metric]
[Definition, formula, implementation]
### 3.2 [Second metric]
...

## 4. Validation
[How methods were validated: holdout tests, permutation tests, etc.]

## 5. Limitations
[Study-specific limitations]

## 6. Data Artifacts
[Table of outputs: notebooks, data files, figures]

## Appendix A: [Technical Details]
## Appendix B: [Additional Specifications]

## Changelog
[Version history table]
```

### 3.3 Section Anchors

All H2 and H3 headers should have explicit anchors for deep linking:

```markdown
## 3. Metrics and Calculations {#metrics-and-calculations}

### 3.3 Toxicity Analysis {#toxicity-analysis}
```

Use kebab-case. Keep anchors stable after publication—do not rename.

---

## 4. Extracting Methods from Jupyter Notebooks

### 4.1 The Methods/Results Separation Principle

**Methods articles document HOW; Dispatches document WHAT.**

| Belongs in Methods | Belongs in Dispatches |
|-------------------|----------------------|
| How metrics are calculated | What the metrics revealed |
| How classifiers are trained | What patterns classifiers found |
| How samples are selected | What the sample characteristics were |
| How statistical tests are configured | What the test results showed |
| Validation procedures | Interpretation of findings |
| Pipeline architecture | Narrative synthesis |
| Mathematical formulations | Implications and recommendations |

### 4.2 Notebook Review Workflow

#### Step 1: Export and Review HTML

```bash
jupyter nbconvert --to html notebook.ipynb
```

Open the HTML in a browser for structured review. The rendered output preserves cell order, outputs, and formatting.

#### Step 2: Identify Method Blocks

Scan the notebook for these patterns:

| Pattern | Indicates |
|---------|-----------|
| Function/class definitions | Reusable procedures → document |
| Parameter assignments | Configuration choices → document rationale |
| Pipeline steps | Data flow → document sequence |
| Statistical test setup | Analytical choices → document assumptions |
| Threshold selection | Decision points → document alternatives considered |
| Validation cells | Quality assurance → document procedure |

#### Step 3: Extract Method Components

For each method block, extract:

1. **Purpose**: What problem does this solve?
2. **Inputs**: What data/parameters does it require?
3. **Procedure**: What steps are performed?
4. **Outputs**: What does it produce?
5. **Assumptions**: What must be true for this to be valid?
6. **Alternatives**: What other approaches were considered?

#### Step 4: Leave Results Behind

Do NOT extract:

- Specific numerical results (e.g., "The mean was 11.3 hours")
- Interpretive commentary (e.g., "This suggests users are...")
- Visualizations of findings (figures go in Dispatches)
- Sample-specific statistics (e.g., "N=2,259 sessions")

**Exception**: Validation metrics (precision, recall, AUC) belong in Methods because they characterize the *tool*, not the *findings*.

### 4.3 Example Extraction

**Notebook cell:**
```python
# Define concerning session criteria
concerning = sessions[
    (sessions['span_hours'] > 6) &
    (sessions['turns_per_hour'] >= 2) &
    (sessions['max_gap_minutes'] < 60) &
    (sessions['total_turns'] >= 30)
]
print(f"Concerning sessions: {len(concerning)} ({len(concerning)/len(sessions)*100:.2f}%)")
# Output: Concerning sessions: 2259 (0.36%)
```

**Extracted to Methods:**
```markdown
### 2.1 Operational Criteria

A session was classified as potentially concerning if it met **all four** criteria:

| Criterion | Threshold | Rationale |
|-----------|-----------|-----------|
| Session span | > 6 hours | Extended duration |
| Turn density | ≥ 2 turns/hour | Active engagement (not idle) |
| Max internal gap | < 60 minutes | Sustained attention (not interrupted) |
| Total turns | ≥ 30 | Substantial interaction volume |

These criteria were designed to capture *sustained, active engagement* rather than 
sessions left open in background tabs or brief check-ins spread over time.
```

**NOT extracted** (goes in Dispatch): "2,259 sessions (0.36%) met these criteria."

---

## 5. Mathematical Exposition

### 5.1 When to Use Math

Use mathematical notation when:
- Defining metrics precisely (ambiguity would cause errors)
- Documenting statistical procedures (reproducibility requires precision)
- Explaining algorithms (prose alone would be unclear)

Avoid mathematical notation when:
- Prose is equally clear and more accessible
- The formula is trivial (e.g., mean = sum / count)
- The audience benefit doesn't justify the cognitive load

### 5.2 Notation Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | Lowercase italic | *x*, *t*, *n* |
| Functions | Named, parenthesized | *S(t)*, *P(y=1\|x)* |
| Sets | Uppercase | *N*, *C* |
| Summation | Explicit bounds | Σᵢ₌₁ⁿ |
| Probability | P() notation | P(turns ≥ t) |
| Estimates | Hat notation | *ŷ* |

### 5.3 Formula Presentation

**Inline math** for simple expressions:
```markdown
The uncertainty score is computed as |P(y=1|x) − 0.5|.
```

**Display math** for complex expressions:
```markdown
The survival function is defined as:

$$
S(t) = P(\text{turns} \geq t) = \frac{|\{c : n_{\text{turns}}(c) \geq t\}|}{N}
$$

Where:
- *c* = a conversation
- *n_turns(c)* = number of turns in conversation *c*
- *N* = total number of conversations in the group
- *t* = turn threshold
```

### 5.4 Code-Math Correspondence

When methods involve code, show the correspondence:

```markdown
### 4.2 Computational Implementation

The survival curve is computed empirically:

$$
S(t) = \frac{1}{N} \sum_{i=1}^{N} \mathbf{1}[n_i \geq t]
$$

```python
survival = np.array([np.mean(turns >= t) for t in range(1, max_turns + 1)])
```

The indicator function **1**[·] returns 1 if the condition is true, 0 otherwise.
`np.mean(turns >= t)` computes this by treating boolean True as 1.
```

### 5.5 Defining Terms

Always define terms immediately after introducing them:

```markdown
The F1 score balances precision and recall:

$$
F_1 = 2 \cdot \frac{P \cdot R}{P + R}
$$

Where:
- **Precision (P)**: Proportion of predicted positives that are correct
- **Recall (R)**: Proportion of actual positives that are detected
```

---

## 6. Narrative Development

### 6.1 Voice and Register

Methods articles use **academic-precise register** (per BRAND.yaml):
- Third person or passive voice for procedures
- First person plural ("we") for analytical choices
- Active voice for clarity where appropriate

**Do:**
> Sessions were classified using a four-criterion composite threshold.

> We selected the 0.4 threshold to maximize F1 score.

**Don't:**
> I decided to use four criteria because it seemed right.

> You should classify sessions this way.

### 6.2 Structuring Explanations

For each method component, follow this pattern:

1. **State the goal**: What are we trying to measure/detect/compute?
2. **Define the approach**: How do we operationalize this?
3. **Specify the procedure**: What are the exact steps?
4. **Justify choices**: Why this approach over alternatives?
5. **Acknowledge limitations**: Where might this fail?

### 6.3 Tables vs. Prose

**Use tables for:**
- Parameter specifications
- Threshold comparisons
- Metric definitions
- Category taxonomies

**Use prose for:**
- Rationale and justification
- Procedural narratives
- Connecting ideas across sections

### 6.4 Balancing Precision and Accessibility

Methods should be reproducible by a competent practitioner, but not impenetrable to an educated generalist.

**Techniques:**
- Lead with intuition, follow with precision
- Use analogies for unfamiliar concepts
- Provide "Where" glosses for formulas (see 5.5)
- Include code snippets for implementation clarity

---

## 7. Validation Documentation

### 7.1 Required Validation Elements

Every methods study should document:

| Element | Description |
|---------|-------------|
| **Ground truth** | How was "correct" determined? |
| **Test design** | Holdout split, cross-validation, permutation? |
| **Metrics** | Which metrics, why these? |
| **Results** | Performance numbers (these ARE appropriate for Methods) |
| **Failure modes** | Where does the method break down? |

### 7.2 Statistical Rigor Checklist

- [ ] Sample sizes reported
- [ ] Confidence intervals or standard errors provided
- [ ] Multiple comparison corrections applied (if applicable)
- [ ] Effect sizes reported (not just p-values)
- [ ] Assumptions of statistical tests stated
- [ ] Sensitivity analyses conducted

---

## 8. Cross-Referencing

### 8.1 Internal References

Reference other Phronos documents by ID:

```markdown
This study extends the session construction methodology defined in 
[MTH-001](/methods/observational-chat-analysis/) and applies the toxicity 
framework from [MTH-001.1#toxicity-classification](/methods/observational-chat-analysis/engagement-prediction/#toxicity-classification).
```

### 8.2 External References

For academic citations, use inline attribution:

```markdown
The survival analysis approach follows Kaplan-Meier estimation 
(Kaplan & Meier, 1958), adapted for discrete turn counts.
```

Full references go in an optional References section or are linked via the Library.

### 8.3 Dispatch Integration

Methods are referenced FROM Dispatches, not the reverse:

```yaml
# In dispatch frontmatter
references:
  methods:
    - MTH-001.4
    - MTH-001.4#emergence-timing
```

---

## 9. Revision Workflow

### 9.1 Minor Revisions (v1.0 → v1.1)

- Typo corrections
- Clarifications that don't change meaning
- Additional examples or explanations
- Bug fixes in code snippets

**Process:**
1. Make edits
2. Increment minor version
3. Add entry to Changelog
4. Same URL, same ID

### 9.2 Major Revisions (v1.x → v2.0)

- Changed methodology
- New analysis that alters conclusions
- Corrected errors that affect validity

**Process:**
1. Make edits
2. Increment major version
3. Add detailed Changelog entry explaining what changed and why
4. Same URL, same ID
5. Consider adding "Revision Note" callout at top

### 9.3 Supersession (MTH-001.4 → MTH-001.5)

When a study is fundamentally replaced:

1. Create new study with new ID
2. Set `supersedes: MTH-001.4` in new study frontmatter
3. Add deprecation notice to old study
4. Old URL redirects to new (optional) or shows deprecation banner

---

## 10. Quality Checklist

Before publishing a methods study:

### Content
- [ ] Abstract accurately summarizes the methodology
- [ ] All assumptions are explicitly stated
- [ ] Research questions are enumerated
- [ ] Every metric is formally defined
- [ ] Mathematical notation is consistent throughout
- [ ] Code snippets are syntactically correct
- [ ] Validation procedure is documented
- [ ] Limitations are honestly assessed

### Structure
- [ ] All H2/H3 headers have anchors
- [ ] Section anchors are listed in frontmatter
- [ ] Tables render correctly
- [ ] Math renders correctly (check LaTeX)
- [ ] No results/findings in methods (those go in Dispatches)

### Metadata
- [ ] ID follows convention (MTH-NNN.N)
- [ ] Slug is kebab-case and descriptive
- [ ] Family reference is correct
- [ ] Version is set appropriately
- [ ] Date reflects publication date
- [ ] Description is 150-160 characters
- [ ] Keywords are relevant

### Cross-References
- [ ] Family overview links to this study
- [ ] Related instruments are listed
- [ ] Internal links use correct paths
- [ ] Notebook source is documented in Data Artifacts

---

## 11. File Naming Convention

```
/src/content/
├── method-families/
│   ├── mth-001-observational-chat-analysis.mdx
│   ├── mth-002-conversational-assessment.mdx
│   └── mth-003-relationship-dynamics.mdx
│
└── method-studies/
    ├── mth-001-1-engagement-prediction.mdx
    ├── mth-001-2-semantic-exploration.mdx
    ├── mth-001-3-model-upgrade-impact.mdx
    ├── mth-001-4-concerning-sessions.mdx
    └── ...
```

**Pattern:** `[id]-[slug].mdx` with dots replaced by hyphens in filename.

---

## Appendix A: Complete Study Template

```markdown
---
id: MTH-001.N
slug: study-slug
type: study
family: MTH-001
family_slug: observational-chat-analysis
order: N
title: "Study Title"
subtitle: "Explanatory subtitle"
abstract: |
  One paragraph abstract describing the methodology and its purpose.
date: YYYY-MM-DD
updated: null
version: "1.0"
status: published
sections:
  - anchor: section-one
    title: "Section One"
  - anchor: section-two
    title: "Section Two"
supersedes: null
notebook: "NN_NotebookName.ipynb"
description: "SEO description under 160 characters."
keywords:
  - keyword-one
  - keyword-two
author: "Vishal Patel"
---

# Study Title

## Executive Summary

[3-5 sentences: question, approach, key methodological contribution]

---

## 1. Motivation

### 1.1 Context

[Why does this methodology matter? What problem does it solve?]

### 1.2 Research Questions

1. [First question]
2. [Second question]
3. [Third question]

---

## 2. Methods {#methods}

### 2.1 [First Component] {#first-component}

[Description, rationale, specification]

### 2.2 [Second Component] {#second-component}

[Description, rationale, specification]

---

## 3. Metrics and Calculations {#metrics-and-calculations}

### 3.1 [Metric Name] {#metric-name}

**Definition:** [Prose definition]

**Formula:**

$$
[LaTeX formula]
$$

**Where:**
- *term* = definition
- *term* = definition

**Implementation:**

```python
# Code snippet
```

---

## 4. Validation {#validation}

### 4.1 Validation Design

[Holdout strategy, test design]

### 4.2 Results

| Metric | Value |
|--------|-------|
| Metric 1 | Value |
| Metric 2 | Value |

---

## 5. Limitations {#limitations}

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| [Limitation 1] | [Impact] | [Mitigation] |
| [Limitation 2] | [Impact] | [Mitigation] |

---

## 6. Data Artifacts {#data-artifacts}

| Artifact | Location | Description |
|----------|----------|-------------|
| Notebook | `NN_Name.ipynb` | Full analysis |
| Data | `outputs/data/file.parquet` | Computed features |
| Figures | `outputs/figures/` | Visualizations |

---

## Appendix A: [Technical Detail] {#appendix-a}

[Extended technical content]

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | YYYY-MM-DD | Initial publication |
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-05 | Complete rewrite: two-tier hierarchy, notebook extraction workflow, narrative guidelines |
| 1.0.0 | 2025-12-29 | Initial schema (flat structure) |
