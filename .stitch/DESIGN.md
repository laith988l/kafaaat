# Design System Document: The Golden Bridge

## 1. Overview & Creative North Star: "The Golden Bridge"

This design system is engineered to represent the prestige of German academia through a lens of Middle Eastern luxury. Our Creative North Star is **"The Golden Bridge"**—a concept that moves away from the sterile, "app-like" feel of language platforms toward a high-end editorial experience. 

We reject the rigid, boxed-in layouts of traditional EdTech. Instead, we utilize **intentional asymmetry**, **overlapping glass layers**, and **tonal depth** to create a digital environment that feels like an exclusive private salon. By balancing the weight of `surface-container-lowest` (#000f1f) with the ethereal glow of `primary` (#f2ca50), we create a sense of intellectual enlightenment emerging from a sophisticated dark void.

---

## 2. Colors & Surface Philosophy

### The "No-Line" Rule
To maintain a premium aesthetic, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through background color shifts. Use `surface-container-low` (#0c1d2d) for main section blocks sitting atop the base `background` (#041424). This creates a "soft-edge" transition that feels organic rather than mechanical.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Hierarchy is established by "stepping" the surface tiers:
- **Base Level:** `surface` (#041424) for the global canvas.
- **Section Level:** `surface-container-low` (#0c1d2d) for large content areas.
- **Component Level:** `surface-container` (#102131) for cards or interactive modules.
- **Active/Elevated Level:** `surface-container-high` (#1b2b3c) for elements requiring immediate focus.

### The "Glass & Gold" Rule
For floating elements (modals, dropdowns, navigation bars), use **Glassmorphism**. Apply a semi-transparent `surface-variant` (#263647) with a `backdrop-filter: blur(12px)`. 
- **Signature Texture:** Use a linear gradient from `primary` (#f2ca50) to `primary-container` (#d4af37) at a 135-degree angle for CTA buttons. This provides a "metallic soul" that flat colors lack.

---

### 3. Typography: Editorial Authority

We use a dual-typeface system to bridge modern efficiency with classical elegance.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision. Use `display-lg` (3.5rem) with `-0.02em` letter spacing for hero sections to create a bold, authoritative "editorial" header.
*   **Body & Titles (Be Vietnam Pro):** A highly legible sans-serif that handles the complexities of German and Arabic scripts gracefully. 
*   **The Hierarchy Role:** Headlines should use `on-surface` (#d3e4fa). Secondary labels should use `on-surface-variant` (#d0c5af) to create a sophisticated, muted contrast that reduces eye strain in dark mode.

---

## 4. Elevation & Depth: Tonal Layering

### The Layering Principle
Avoid traditional drop shadows. Depth is achieved by "stacking" the surface-container tiers. For example, a student’s progress card (`surface-container-highest`) should sit inside a dashboard area (`surface-container-low`). This creates a soft, natural lift.

### Ambient Shadows & Ghost Borders
When a floating effect is required (e.g., a hover state on a glass card):
- **Ambient Shadow:** Use a blur of `24px` with a 6% opacity shadow colored `surface-tint` (#e9c349). This mimics the glow of gold light reflecting off a dark surface.
- **The Ghost Border:** For accessibility on cards, use the `outline-variant` (#4d4635) at **15% opacity**. Never use 100% opaque lines; they break the "The Golden Bridge" immersion.

---

## 5. Components

### Buttons (The "Glow" Interactions)
- **Primary:** Gradient (`primary` to `primary-container`). Roundedness: `full`. On hover, apply a `box-shadow` glow using `primary` at 20% opacity.
- **Secondary:** Transparent background with a `Ghost Border`. Text color: `primary`.
- **Tertiary:** No background. Text color: `on-surface-variant`. Subtle underline on hover.

### Glass Cards
Cards must use `xl` (1.5rem) roundedness. They should feature a subtle 1px "Ghost Border" at the top and left edges only to simulate a light source hitting the edge of a glass pane.

### Inputs & Search
- **Container:** `surface-container-highest` (#263647).
- **Active State:** The border transitions from transparent to a `primary` glow. 
- **Text:** Use `body-lg` for input text to ensure readability for Arabic/German scripts.

### Progress Indicators (The German Highlight)
Use the German flag colors subtly for feedback:
- **Success/German Gold:** `primary` (#f2ca50).
- **Error/German Red:** `tertiary-container` (#ff968c).
- **Neutral/German Black:** `surface-container-lowest` (#000f1f).

### Relevant Academy Components
- **The Lesson Timeline:** A vertical line-less list using `surface-container-low` chips to denote different modules.
- **Vocabulary "Flash" Sheets:** Large `display-sm` German words centered on a `surface-container-highest` glass card with high `backdrop-blur`.

---

## 6. Do’s and Don’ts

### Do:
- **Use White Space as a Divider:** Use the Spacing Scale `12` (4rem) or `16` (5.5rem) to separate major sections.
- **Animate with Intent:** Use Framer Motion `stiffness: 300, damping: 30` for "weighty" card entrances.
- **Respect the Script:** Ensure the layout accounts for Right-to-Left (RTL) Arabic text without breaking the asymmetrical balance.

### Don't:
- **Don't use pure black (#000000):** Use `surface-container-lowest` (#000f1f) for the deepest shadows to maintain the "Navy" brand soul.
- **Don't use sharp corners:** Every component must have a minimum roundedness of `md` (0.75rem).
- **Don't use high-contrast dividers:** If you feel the need for a line, increase the `spacing` instead. 
- **Don't over-use the Red highlight:** Use it only for critical errors or subtle "heritage" accents in the footer.
