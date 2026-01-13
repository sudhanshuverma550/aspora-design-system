# Aspora Design System - Components

## Overview

React components implementing the Aspora design system. All components are built with TypeScript, use design tokens, and support multiple states and sizes.

**Source:** Figma Aspora Component Library
**Last Updated:** 18th November 2025

## Installation

```tsx
// Import individual components
import { Toggle, Checkbox, RadioButton } from 'aspora-design-system/components';

// Import types
import type { ToggleProps, CheckboxSize } from 'aspora-design-system/components';
```

## Components

### Toggle

A switch/toggle component for binary on/off states.

```tsx
import { Toggle } from 'aspora-design-system/components';

function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <Toggle
      checked={isOn}
      onChange={setIsOn}
      size="large"
      aria-label="Enable notifications"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the toggle is on |
| `size` | `'large' \| 'regular'` | `'large'` | Size variant |
| `disabled` | `boolean` | `false` | Disable interaction |
| `onChange` | `(checked: boolean) => void` | - | Change callback |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label |

#### States

- **Resting**: Default off state (gray track)
- **Active**: On state (purple track with checkmark)
- **Disabled**: Non-interactive off state
- **Disabled-On**: Non-interactive on state

---

### RadioButton

A radio button for single selection from a group.

```tsx
import { RadioButton } from 'aspora-design-system/components';

function Example() {
  const [selected, setSelected] = useState('option1');

  return (
    <div>
      <RadioButton
        checked={selected === 'option1'}
        value="option1"
        name="options"
        onChange={setSelected}
      />
      <RadioButton
        checked={selected === 'option2'}
        value="option2"
        name="options"
        onChange={setSelected}
      />
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether selected |
| `size` | `'large' \| 'regular' \| 'small'` | `'regular'` | Size variant |
| `disabled` | `boolean` | `false` | Disable interaction |
| `name` | `string` | - | Radio group name |
| `value` | `string` | `''` | Radio value |
| `onChange` | `(value: string) => void` | - | Change callback |

#### Sizes

| Size | Dimensions |
|------|------------|
| Large | 28x28px |
| Regular | 24x24px |
| Small | 20x20px |

---

### Checkbox

A checkbox for multiple selection with square or circular variants.

```tsx
import { Checkbox } from 'aspora-design-system/components';

function Example() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      checked={isChecked}
      onChange={setIsChecked}
      size="regular"
      variant="square"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether checked |
| `size` | `'large' \| 'regular' \| 'small'` | `'regular'` | Size variant |
| `variant` | `'square' \| 'circular'` | `'square'` | Shape variant |
| `disabled` | `boolean` | `false` | Disable interaction |
| `onChange` | `(checked: boolean) => void` | - | Change callback |

---

### InputField

A text input with validation states and messages.

```tsx
import { InputField } from 'aspora-design-system/components';

function Example() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (!value) setError('This field is required');
    else setError('');
  };

  return (
    <InputField
      value={value}
      onChange={setValue}
      onBlur={handleBlur}
      placeholder="Enter your name"
      errorMessage={error}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `'Placeholder'` | Placeholder text |
| `type` | `'text' \| 'email' \| 'password' \| ...` | `'text'` | Input type |
| `disabled` | `boolean` | `false` | Disable interaction |
| `errorMessage` | `string` | - | Error message to show |
| `successMessage` | `string` | - | Success message to show |
| `onChange` | `(value: string) => void` | - | Change callback |
| `onFocus` | `() => void` | - | Focus callback |
| `onBlur` | `() => void` | - | Blur callback |

#### States

| State | Description |
|-------|-------------|
| Rest | Default state, gray divider |
| Typing | Focused state, purple divider |
| Error | Error state, red divider with error message |
| Success | Success state, green divider with success message |
| Disabled | Non-interactive state |

---

### SearchBar

A search input with clear button.

```tsx
import { SearchBar } from 'aspora-design-system/components';

function Example() {
  const [query, setQuery] = useState('');

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      onSubmit={(value) => console.log('Search:', value)}
      placeholder="Search something"
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Search value |
| `placeholder` | `string` | `'Search something'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable interaction |
| `onChange` | `(value: string) => void` | - | Change callback |
| `onSubmit` | `(value: string) => void` | - | Submit callback |
| `onClear` | `() => void` | - | Clear button callback |

---

### Chip

A selectable chip/tag component.

```tsx
import { Chip } from 'aspora-design-system/components';

function Example() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (value: string) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip
        label="Investments"
        selected={selected.includes('investments')}
        onClick={() => toggleChip('investments')}
        variant="chip"
      />
      <Chip
        label="Savings"
        selected={selected.includes('savings')}
        onClick={() => toggleChip('savings')}
        variant="chip"
      />
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Chip label (required) |
| `selected` | `boolean` | `false` | Whether selected |
| `size` | `'large' \| 'medium' \| 'small'` | `'medium'` | Size variant |
| `variant` | `'chip' \| 'selector'` | `'chip'` | Style variant |
| `icon` | `React.ReactNode` | - | Custom icon |
| `disabled` | `boolean` | `false` | Disable interaction |
| `onClick` | `() => void` | - | Click callback |

#### Variants

| Variant | Description |
|---------|-------------|
| `chip` | With icon, used for categories/filters |
| `selector` | Text only, used for simple selections |

#### Sizes

| Size | Height | Font Size |
|------|--------|-----------|
| Large | 37px | 16px |
| Medium | 36px | 14px |
| Small | 33px | 13px |

---

## Design Token Integration

All components use the Aspora design tokens for consistent styling:

```tsx
// Colors
backgroundColor: 'var(--fills-primary-500, #5523B2)'
color: 'var(--text-base-600, #0E0F11)'

// Spacing
gap: 'var(--spacing-xs, 8px)'
padding: 'var(--spacing-m, 16px)'

// Typography
fontFamily: "'Inter', sans-serif"
```

## Accessibility

All components include:
- Proper ARIA roles and attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
