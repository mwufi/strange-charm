# Sidebar Plan - Grok Style Updates

## Key Differences Observed

### 1. Spacing and Sizing Variables
**Current:**
- `SIDEBAR_WIDTH = "16rem"`
- `SIDEBAR_WIDTH_ICON = "3rem"`
- Default padding: `p-2` (0.5rem)
- Menu item height: `h-8` (2rem)
- Gap between items: `gap-1` (0.25rem)

**Grok:**
- More generous padding: `px-1.5` (0.375rem) for groups, `py-[2px]` spacing
- Menu item height: `h-[36px]` (2.25rem)
- Rounded corners: `rounded-xl` instead of `rounded-md`
- Larger gaps between sections
- Search bar with border: `border border-border-l1`
- Subheader height: `h-subheader-height`

### 2. Structure Changes Needed
- **Search Bar**: Add a prominent search button/input at the top
- **Section Divisions**: Clear visual separation between groups
- **Menu Items**: 
  - Larger touch targets (36px vs 32px)
  - More padding internally `p-[0.375rem]`
  - Rounded corners `rounded-xl`
  - Icons are 18x18 with size-6 container (24x24)

### 3. Collapsed State
- Grok shows only icons when collapsed
- Smooth width transition
- Icons remain centered
- Tooltips on hover in collapsed state

### 4. Visual Style Updates
- Background colors: `bg-surface-base`, `bg-surface-l1` for search
- Border styles: `border-border-l1`
- Hover states: `hover:bg-button-ghost-hover`
- Active states: `bg-button-ghost-active`
- Text colors maintain hierarchy with opacity

### 5. New Components Needed
- Search bar component at the top
- Better visual grouping system
- Improved hover/active states
- Add action buttons (+ icons) that appear on hover

## Implementation Steps
1. Update CSS variables for spacing
2. Modify SidebarMenuButton to use new sizing
3. Add search component to SidebarHeader
4. Update group spacing and visual separation
5. Implement improved collapsed state behavior
6. Add hover action buttons for menu items