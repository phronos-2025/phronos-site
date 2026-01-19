# Scoring Algorithms for Semantic Association Instruments

This document explains four algorithms used to evaluate the quality of clue sets in semantic association tasks, where participants generate words that "bridge" an anchor-target pair.

---

## Summary: Alternative Relevance Metrics Evaluation for INS-001.2

### The Problem

We needed a **relevance metric** that measures whether clues are "on task" (genuinely bridging anchor and target) while being **independent of divergence** (semantic spread). The original relevance metric was correlated with divergence, confounding our ability to measure these as separate cognitive dimensions.

### Success Criteria

| Criterion | Target | Rationale |
|-----------|--------|-----------|
| Divergence correlation | \|r\| < 0.30 | Independence from spread |
| A-T distance correlation | \|r\| < 0.50 | Not purely driven by pair difficulty |
| Standard deviation | SD > 0.05 | Meaningful individual differences |
| Distribution | Not degenerate | Discriminates across trials |

### Key Findings by Approach

**Discriminative Relevance**
- Both metrics passed all criteria
- Percentile rank: r = −0.113 with divergence ✓
- Discrimination score: r = −0.126 with divergence ✓
- Moderate correlation with current relevance (r ≈ 0.31–0.36), suggesting it measures a related but distinct construct

**Joint Constraint Score**
- All three metrics passed all criteria
- Joint score: r = +0.055 with divergence ✓ (nearly zero!)
- Coverage: r = −0.068 with divergence ✓
- Efficiency: r = +0.130 with divergence ✓
- Joint score also showed near-zero correlation with A-T distance (r = 0.022), meaning it's not confounded by pair difficulty

**Balance Score**
- Mixed results: 1 of 2 metrics passed
- Continuous balance: Failed variance criterion (SD = 0.048 < 0.05) — too compressed
- Count balance: Passed, but higher divergence correlation (r = −0.239)
- Balance also showed significant variation across divergence terciles (ANOVA p = 0.0015), suggesting it's not truly independent

### Final Ranking

| Rank | Metric | Combined Score |
|------|--------|----------------|
| 1 | **constraint_joint_score** | 7.48 |
| 2 | disc_discrimination_score | 7.11 |
| 3 | disc_percentile_rank | 6.09 |

### Why Joint Constraint Score Was Selected

1. **Lowest divergence correlation** (r = 0.055) — essentially independent of semantic spread
2. **Lowest A-T distance correlation** (r = 0.022) — not confounded by pair difficulty
3. **Good variance** (SD = 0.127) — discriminates meaningfully across participants
4. **Conceptually clean**: Coverage × Efficiency captures both "did clues eliminate alternatives?" and "did they do so non-redundantly?"
5. **Stable across divergence levels**: ANOVA showed no significant differences across divergence terciles (p = 0.94)

### Comparative Analysis of Approaches

**Discriminative Relevance** met all specified criteria, with both metrics demonstrating acceptable correlations with divergence (r ≈ −0.11 to −0.13). This approach directly operationalizes task validity by testing whether clues contain information specific to the true anchor-target pair rather than fitting arbitrary word pairs. However, the percentile rank metric exhibited a moderate correlation with A-T distance (r = −0.25), indicating partial confounding with pair difficulty: pairs with closer endpoints tend to yield higher discriminative scores. The discrimination z-score attenuates this effect (r = −0.03) through standardization, though this transformation reduces direct interpretability. Both metrics showed moderate correlation with the original relevance measure (r ≈ 0.31–0.36), suggesting they capture related but non-identical constructs.

**Joint Constraint Score** demonstrated the strongest independence from potential confounds, achieving near-zero correlations with both divergence (r = 0.055) and A-T distance (r = 0.022). Its decomposition into coverage and efficiency components provides interpretive granularity: coverage quantifies the proportion of alternatives eliminated by the clue set, while efficiency measures the degree of non-redundancy across clues. The composite score maintained stable means across divergence terciles (ANOVA p = 0.94), providing additional evidence of independence. **Balance Score** showed the most limited utility among the three approaches. The continuous balance metric failed the variance criterion (SD = 0.048), with values concentrated near the upper bound, limiting its capacity to discriminate across participants. Additionally, balance exhibited significant variation across divergence terciles (ANOVA p = 0.0015), suggesting this metric is not fully independent of semantic spread. Count-based balance satisfied the statistical criteria but provides less granular information than the constraint-based approaches. A further limitation is that balance measures attentional allocation between endpoints without assessing whether that allocation produces task-relevant clues—a participant may achieve high balance while generating semantically irrelevant associations, a failure mode that discriminative and constraint-based approaches are designed to detect.

### Practical Implication

Using **joint constraint score** as our relevance metric allows us to treat **relevance** and **divergence** as independent dimensions of cognitive performance:

- **Relevance** (joint constraint): Are the clues doing their job of narrowing down to the true pair?
- **Divergence**: Are the clues exploring diverse semantic territory?

A participant can now score high on one, both, or neither—capturing four distinct cognitive profiles rather than conflating them.

---

## 1. Discriminative Relevance

### Narrative Overview

This algorithm measures how well a participant's **clues** (word associations) specifically identify the true **anchor-target pair** they were responding to, as opposed to fitting arbitrary word pairs equally well.

The core intuition: if someone gives clues that could plausibly connect *any* two random words, those clues aren't very informative. But if the clues specifically "bridge" the true anchor and target—and fail to bridge random foil pairs—then the participant demonstrated precise semantic targeting.

### Mathematical Formalization

#### Setup

Let:
- $\mathbf{c}_1, \mathbf{c}_2, \ldots, \mathbf{c}_n$ be the embedding vectors for $n$ clues
- $\mathbf{a}$ be the anchor embedding
- $\mathbf{t}$ be the target embedding
- $\{(\mathbf{a}'_i, \mathbf{t}'_i)\}_{i=1}^{m}$ be $m$ foil pairs

#### Pair Fit Function

For any anchor-target pair $(\mathbf{a}, \mathbf{t})$, the **pair fit** measures how well the clues "bridge" both endpoints:

$$F(\mathbf{c}_{1:n}, \mathbf{a}, \mathbf{t}) = \frac{1}{n} \sum_{j=1}^{n} \min\bigl(\text{sim}(\mathbf{c}_j, \mathbf{a}),\; \text{sim}(\mathbf{c}_j, \mathbf{t})\bigr)$$

where $\text{sim}(\cdot, \cdot)$ is cosine similarity.

The **min** operation is crucial: a clue scores high only if it's close to *both* endpoints. A clue near the anchor but far from the target (or vice versa) contributes little. This captures the "bridging" quality—good clues must semantically connect both words.

#### Percentile Rank

Compute the fit for the true pair and all foils:

$$f_{\text{true}} = F(\mathbf{c}_{1:n}, \mathbf{a}, \mathbf{t})$$

$$f_i = F(\mathbf{c}_{1:n}, \mathbf{a}'_i, \mathbf{t}'_i) \quad \text{for } i = 1, \ldots, m$$

The percentile rank is:

$$R = \frac{1}{m} \sum_{i=1}^{m} \mathbf{1}[f_{\text{true}} > f_i]$$

This tells you: *what fraction of foil pairs did the true pair beat?* A value of 0.95 means the clues fit the true pair better than 95% of random pairs.

#### Discrimination Score (Z-Score)

$$D = \frac{f_{\text{true}} - \mu_{\text{foil}}}{\sigma_{\text{foil}}}$$

where $\mu_{\text{foil}} = \frac{1}{m}\sum_i f_i$ and $\sigma_{\text{foil}} = \sqrt{\frac{1}{m}\sum_i (f_i - \mu_{\text{foil}})^2}$

This standardized score tells you how many standard deviations above the foil distribution the true pair sits.

### Interpretation

| Metric | Meaning |
|--------|---------|
| **Percentile Rank → 1.0** | Clues are highly specific to the true pair |
| **Percentile Rank → 0.5** | Clues fit the true pair no better than chance |
| **Discrimination Score > 2** | True pair is 2+ standard deviations above foils (strong signal) |

### Cognitive Interpretation

This approach essentially asks: *"Could a decoder, given only these clues, identify which word pair the participant was responding to?"*

---

## 2. Joint Constraint Score

### Narrative Overview

This algorithm evaluates clue quality through the lens of **constraint satisfaction**: how effectively does a set of clues narrow down the solution space to the true anchor and target, eliminating plausible alternatives?

The key insight is that good clue sets should work *together* like a set of constraints in a puzzle. Each clue should "rule out" some incorrect possibilities, and ideally, different clues should rule out *different* foils (non-redundancy). A clue set where every clue eliminates the same foils is wasteful; a clue set where clues complement each other is efficient.

### Mathematical Formalization

#### Setup

Let:
- $\mathbf{c}_1, \ldots, \mathbf{c}_n$ be the $n$ clue embeddings
- $\mathbf{a}$ be the true anchor, $\mathbf{t}$ be the true target
- $\{\mathbf{a}'_1, \ldots, \mathbf{a}'_m\}$ be foil anchors (plausible alternatives to $\mathbf{a}$)
- $\{\mathbf{t}'_1, \ldots, \mathbf{t}'_m\}$ be foil targets (plausible alternatives to $\mathbf{t}$)

#### Elimination Sets

A clue $\mathbf{c}_j$ **eliminates** foil $\mathbf{a}'_i$ if the clue is closer to the true anchor than to that foil:

$$E_j^{(a)} = \bigl\{ i : \text{sim}(\mathbf{c}_j, \mathbf{a}) > \text{sim}(\mathbf{c}_j, \mathbf{a}'_i) \bigr\}$$

Similarly for targets:

$$E_j^{(t)} = \bigl\{ i : \text{sim}(\mathbf{c}_j, \mathbf{t}) > \text{sim}(\mathbf{c}_j, \mathbf{t}'_i) \bigr\}$$

The intuition: if your clue "dog" is more similar to the true anchor "pet" than to the foil "vehicle," then "dog" successfully rules out "vehicle" as a candidate.

#### Coverage

Coverage measures the fraction of foils eliminated by the clue set collectively:

$$\text{Coverage}^{(a)} = \frac{\left| \bigcup_{j=1}^{n} E_j^{(a)} \right|}{m}$$

$$\text{Coverage}^{(t)} = \frac{\left| \bigcup_{j=1}^{n} E_j^{(t)} \right|}{m}$$

A coverage of 1.0 means every single foil was ruled out by at least one clue.

#### Efficiency

Efficiency measures how *non-redundant* the clues are—do they divide the labor of eliminating foils?

$$\text{Efficiency} = 1 - \frac{\left| \bigcap_{j=1}^{n} E_j \right|}{\left| \bigcup_{j=1}^{n} E_j \right|}$$

This is $1 - \text{redundancy}$, where redundancy is the Jaccard-like ratio of intersection to union.

| Scenario | Efficiency |
|----------|------------|
| Every clue eliminates completely different foils | → 1.0 (no overlap) |
| Every clue eliminates exactly the same foils | → 0.0 (total redundancy) |

#### Joint Score

The final metric multiplies coverage and efficiency:

$$J = \text{Coverage} \times \text{Efficiency}$$

where both terms are averaged across anchor and target sides.

### Interpretation

| Metric | High Value Means |
|--------|------------------|
| **Coverage → 1.0** | Clues collectively rule out all alternatives |
| **Efficiency → 1.0** | Clues are complementary, not redundant |
| **Joint Score → 1.0** | Clues form a tight, efficient constraint set |

### Cognitive Interpretation

This metric captures something like **strategic diversity** in word association. A participant who gives varied clues—each attacking the problem from a different angle—will score high on efficiency. A participant who gives synonymous or repetitive clues will have high redundancy (low efficiency), even if coverage is decent.

---

## 3. Balance Score

### Narrative Overview

This algorithm measures whether a participant's clues are **evenly distributed** between the anchor and target, or whether they cluster toward one endpoint.

The intuition: when bridging two concepts, a balanced strategy would give some clues that "lean toward" the anchor and others that "lean toward" the target. If all your clues hover near just one endpoint, you're only doing half the job—you're describing one word well but neglecting the other.

Think of it like building a bridge from both sides of a river. A balanced approach has workers on both banks; an unbalanced approach builds only from one side and hopes to reach the other.

### Mathematical Formalization

#### Setup

Let:
- $\mathbf{c}_1, \ldots, \mathbf{c}_n$ be the $n$ clue embeddings
- $\mathbf{a}$ be the anchor embedding
- $\mathbf{t}$ be the target embedding

#### Per-Clue Bias

For each clue, compute its **bias**—which endpoint it leans toward:

$$b_j = \text{sim}(\mathbf{c}_j, \mathbf{a}) - \text{sim}(\mathbf{c}_j, \mathbf{t})$$

| Bias Value | Interpretation |
|------------|----------------|
| $b_j > 0$ | Clue is closer to anchor |
| $b_j < 0$ | Clue is closer to target |
| $b_j \approx 0$ | Clue is equidistant (a true "bridge" word) |

#### Balance Score (Continuous)

The **mean bias** captures overall lean:

$$\bar{b} = \frac{1}{n} \sum_{j=1}^{n} b_j$$

The balance score penalizes deviation from zero:

$$\text{Balance} = 1 - |\bar{b}|$$

| Mean Bias | Balance Score |
|-----------|---------------|
| $\bar{b} = 0$ | 1.0 (perfect balance) |
| $\bar{b} = +0.3$ | 0.7 (leans toward anchor) |
| $\bar{b} = -0.5$ | 0.5 (leans toward target) |

#### Count-Based Balance (Discrete)

An alternative formulation counts how many clues lean each direction:

$$n_a = \sum_{j=1}^{n} \mathbf{1}[b_j > 0] \quad \text{(anchor-leaning clues)}$$

$$n_t = \sum_{j=1}^{n} \mathbf{1}[b_j < 0] \quad \text{(target-leaning clues)}$$

$$\text{CountBalance} = 1 - \frac{|n_a - n_t|}{n}$$

This version treats all leans equally regardless of magnitude—a clue barely favoring anchor counts the same as one strongly favoring it.

#### Floor Attention (Auxiliary Metric)

The algorithm also computes **floor attention**:

$$\text{FloorAttention} = \frac{1}{n} \sum_{j=1}^{n} \min\bigl(\text{sim}(\mathbf{c}_j, \mathbf{a}), \text{sim}(\mathbf{c}_j, \mathbf{t})\bigr)$$

This captures overall bridging quality independent of balance—are the clues close to *both* endpoints, or far from one?

### Interpretation

| Metric | Meaning |
|--------|---------|
| **Balance → 1.0** | Clues evenly distributed between endpoints |
| **Balance → 0.0** | All clues cluster at one endpoint |
| **Bias Std (high)** | Clues vary in which endpoint they favor (strategic diversity) |
| **Bias Std (low)** | All clues have similar lean (homogeneous strategy) |
| **Floor Attention (high)** | Clues stay close to both endpoints |

### Cognitive Interpretation

Balance captures something like **attentional allocation**. A participant who attends only to the anchor (perhaps because it's more familiar or salient) will produce anchor-biased clues. Balanced attention—considering both endpoints when generating associations—yields a balanced clue set.

Note that high balance doesn't guarantee *good* clues. You could have perfectly balanced clues that are all irrelevant to both words. That's why this metric complements (rather than replaces) the other scores.

---

## 4. Relevance & Divergence

### Narrative Overview

This algorithm computes two complementary metrics that together characterize a clue set's quality:

1. **Relevance**: Do the clues semantically connect to *both* the anchor and target? (Are they on-topic?)
2. **Divergence**: How spread out are all the words in semantic space? (Are they varied?)

These capture a fundamental tension in creative association: you want clues that are *relevant* (staying connected to the task) but also *divergent* (exploring different semantic territory rather than repeating the same idea).

### Mathematical Formalization

#### Setup

Let:
- $\mathbf{c}_1, \ldots, \mathbf{c}_n$ be the $n$ clue embeddings
- $\mathbf{a}$ be the anchor embedding
- $\mathbf{t}$ be the target embedding

#### Relevance (Bridging Quality)

For each clue, relevance is the **minimum** of its similarities to anchor and target:

$$r_j = \min\bigl(\text{sim}(\mathbf{c}_j, \mathbf{a}),\; \text{sim}(\mathbf{c}_j, \mathbf{t})\bigr)$$

Overall relevance is the mean:

$$\text{Relevance} = \frac{1}{n} \sum_{j=1}^{n} r_j$$

##### Why the minimum?

The min operation enforces that a clue must be close to **both** endpoints to score well. Consider:

| Clue | sim(clue, anchor) | sim(clue, target) | min |
|------|-------------------|-------------------|-----|
| A | 0.8 | 0.7 | 0.7 ✓ |
| B | 0.9 | 0.2 | 0.2 ✗ |
| C | 0.3 | 0.85 | 0.3 ✗ |

Clue A genuinely bridges both words. Clues B and C are close to only one endpoint—they describe one word but fail to connect to the other. The min operation catches this failure.

#### Divergence (Semantic Spread)

Divergence measures the average pairwise distance across **all** words (anchor, target, and clues):

$$\mathcal{E} = \{\mathbf{a}, \mathbf{t}, \mathbf{c}_1, \ldots, \mathbf{c}_n\}$$

$$\text{Divergence} = \frac{100}{\binom{|\mathcal{E}|}{2}} \sum_{i < j} \bigl(1 - \text{sim}(\mathbf{e}_i, \mathbf{e}_j)\bigr)$$

The factor of 100 scales the result to a more interpretable range (0–100 rather than 0–1).

| Divergence | Meaning |
|------------|---------|
| High (~30+) | Words are spread across semantic space; diverse associations |
| Low (~10) | Words cluster tightly; repetitive or synonymous clues |

Including anchor and target in the calculation means divergence partly reflects the inherent difficulty of the pair (distant anchor-target pairs inflate baseline divergence).

#### Validity Check

A trial is marked **valid** if:

$$\text{Valid} = (\text{Relevance} \geq 0.05) \;\land\; (n \geq 3)$$

This filters out:
- Off-topic responses (relevance too low)
- Incomplete responses (fewer than 3 clues)

### Interpretation

| Pattern | Relevance | Divergence | Interpretation |
|---------|-----------|------------|----------------|
| Focused bridger | High | Low | Finds the semantic "sweet spot" but stays there |
| Exploratory bridger | High | High | Finds multiple distinct paths between concepts |
| Scattered thinker | Low | High | Generates varied words but loses the thread |
| Stuck | Low | Low | Repetitive and off-topic |

### Cognitive Interpretation

The "exploratory bridger" profile—high on both metrics—suggests flexible, creative cognition that can maintain task relevance while exploring diverse semantic territory.
