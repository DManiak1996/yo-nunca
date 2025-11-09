---
name: react
description: React framework for building user interfaces. Use for React components, hooks, state management, JSX, and modern frontend development.
---

# React Skill

Comprehensive assistance with React development, generated from official React documentation.

## When to Use This Skill

This skill should be triggered when:
- **Building or debugging React components** - Creating function/class components, JSX syntax
- **Working with React hooks** - useState, useEffect, useRef, useContext, useCallback, useMemo, etc.
- **Implementing state management** - Managing component state, lifting state up, Context API
- **Creating forms** - Controlled/uncontrolled inputs, form submission, validation
- **Managing component lifecycle** - Side effects, cleanup, dependencies
- **Working with refs** - DOM manipulation, focusing inputs, accessing elements
- **Optimizing performance** - Memoization, lazy loading, code splitting
- **Using React 19 features** - Activity component, Server Components, Suspense
- **Debugging React code** - Understanding re-renders, stale closures, infinite loops

## Key Concepts

### Components
React apps are built from components - reusable UI pieces that return JSX (JavaScript XML). Components can be functions or classes, with function components being the modern standard.

### State
State is data that changes over time in your component. Use `useState` for simple state, or `useReducer` for complex state logic. State updates trigger re-renders.

### Props
Props (properties) are how you pass data from parent components to child components. Props are read-only and flow down the component tree.

### Hooks
Hooks are functions that let you "hook into" React features like state and lifecycle. They must be called at the top level of your component (not in loops, conditions, or nested functions).

### JSX
JSX is a syntax extension that looks like HTML but is actually JavaScript. It gets compiled to `React.createElement()` calls.

### Refs
Refs provide a way to access DOM nodes or React elements created in the render method. Use refs for imperative operations like focusing inputs or measuring elements.

## Quick Reference

### 1. Controlled Input with State

```javascript
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('20');
  const ageAsNumber = Number(age);

  return (
    <>
      <label>
        First name:
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
        />
        <button onClick={() => setAge(ageAsNumber + 10)}>
          Add 10 years
        </button>
      </label>
      {firstName !== '' && <p>Your name is {firstName}.</p>}
      {ageAsNumber > 0 && <p>Your age is {ageAsNumber}.</p>}
    </>
  );
}
```

**What it does:** Controlled inputs where React manages the input's value through state. Every keystroke updates state and triggers re-render.

### 2. Form Submission with FormData

```javascript
export default function MyForm() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Text input: <input name="myInput" defaultValue="Some initial value" />
      </label>
      <hr />
      <label>
        Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true} />
      </label>
      <hr />
      <button type="submit">Submit form</button>
    </form>
  );
}
```

**What it does:** Handles form submission with uncontrolled inputs using FormData. No state needed for every input - just read values on submit.

### 3. Using useRef to Focus an Input

```javascript
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

**What it does:** Creates a ref to access DOM elements. The ref's `.current` property holds the actual DOM node, letting you call browser APIs like `focus()`.

### 4. Scrolling to an Element with Multiple Refs

```javascript
import { useRef } from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>Neo</button>
        {/* More buttons... */}
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="Millie"
              ref={secondCatRef}
            />
          </li>
          {/* More items... */}
        </ul>
      </div>
    </>
  );
}
```

**What it does:** Uses multiple refs to control scroll position. Demonstrates how to manage a list of refs for carousel-like behavior.

### 5. Managing a List of Refs with Ref Callbacks

```javascript
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);
                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat.imageUrl} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList[i] = {
      id: i,
      imageUrl: "https://placecats.com/neo/320/240"
    };
  }
  return catList;
}
```

**What it does:** Uses ref callbacks to manage dynamic lists of refs. The ref callback receives the DOM node and can store it in a Map, allowing you to access any item by its data.

### 6. State Structure - Avoid Duplication

```javascript
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => handleItemChange(item.id, e)}
            />
            {' '}
            <button onClick={() => setSelectedId(item.id)}>
              Choose
            </button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

**What it does:** Demonstrates proper state structure - store only the selected ID, not the entire object. This avoids duplication and keeps state in sync when items change.

### 7. Activity Component for Hiding UI

```javascript
import { Activity, useState } from 'react';
import Sidebar from './Sidebar.js';

export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  return (
    <>
      <Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>
        <Sidebar />
      </Activity>
      <main>
        <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
          Toggle sidebar
        </button>
        <h1>Main content</h1>
      </main>
    </>
  );
}
```

**What it does:** Uses the Activity component to hide/show UI while preserving internal state. The sidebar's state is maintained even when hidden, unlike conditional rendering which destroys state.

### 8. Pre-rendering with Hidden Activity

```javascript
import { Activity, useState, Suspense } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <button onClick={() => setActiveTab('home')}>Home</button>
      <button onClick={() => setActiveTab('posts')}>Posts</button>
      <hr />
      <Suspense fallback={<h1>🌀 Loading...</h1>}>
        <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
          <Home />
        </Activity>
        <Activity mode={activeTab === 'posts' ? 'visible' : 'hidden'}>
          <Posts />
        </Activity>
      </Suspense>
    </>
  );
}
```

**What it does:** Pre-renders hidden content to reduce loading times. The Posts component fetches data even when hidden, so it appears instantly when the tab becomes active.

### 9. Group Related State

```javascript
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

**What it does:** Groups related state (x and y coordinates) into a single object. If two values always change together, store them together.

### 10. Children.map for Transforming Children

```javascript
import { Children } from 'react';

export default function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}

// Usage:
// <RowList>
//   <p>This is the first item.</p>
//   <p>This is the second item.</p>
//   <p>This is the third item.</p>
// </RowList>
```

**What it does:** Uses the Children API to wrap each child in a container. Children.map handles the opaque children prop structure and maintains keys properly.

## Reference Files

This skill includes comprehensive documentation organized by topic:

### Core Documentation

- **getting_started.md** (9 pages) - Quick start tutorial, tic-tac-toe game, thinking in React. Start here if you're new to React.

- **components.md** (29 pages) - Built-in components including:
  - `<Suspense>` - Loading states and code splitting
  - `<Activity>` - Hide/show UI while preserving state (React 19)
  - `<input>`, `<form>`, `<option>`, `<select>` - Form components
  - Fragments - Group elements without extra DOM nodes

- **hooks.md** (52 pages) - All React hooks with detailed examples:
  - State hooks: `useState`, `useReducer`
  - Effect hooks: `useEffect`, `useLayoutEffect`
  - Ref hooks: `useRef`, `useImperativeHandle`
  - Context: `useContext`
  - Performance: `useMemo`, `useCallback`, `useDeferredValue`
  - Other: `useId`, `useTransition`, `use`

- **state.md** (32 pages) - State management patterns:
  - Structuring state effectively
  - Avoiding duplication and redundancy
  - Lifting state up
  - Preserving and resetting state
  - Extracting state logic into reducers

- **api.md** (66 pages) - Complete React API reference:
  - Components: `memo`, `lazy`, `StrictMode`, `Profiler`
  - React Server Components
  - Compiler directives
  - Legacy APIs (for older codebases)

- **other.md** (7 pages) - Additional topics:
  - React DOM APIs (createRoot, hydrateRoot)
  - Testing libraries integration
  - TypeScript with React

## Working with This Skill

### For Beginners

**Start here:**
1. Read `references/getting_started.md` for the official React tutorial
2. Practice with Quick Reference examples 1-3 (basic components, state, forms)
3. Build the tic-tac-toe game to understand state and interactivity

**Key concepts to master:**
- JSX syntax and embedding expressions
- Function components and props
- useState for managing state
- Event handlers (onClick, onChange)

### For Component Development

**Use these resources:**
- `references/components.md` - API reference for built-in components
- `references/hooks.md` - Detailed hook documentation
- Quick Reference section - Common patterns you'll use daily

**Focus on:**
- Controlled vs uncontrolled components
- When to use refs vs state
- Component composition patterns
- Proper key usage in lists

### For State Management

**Check these sections:**
- `references/state.md` - State structure and best practices
- Quick Reference examples 6, 9 - State patterns
- Context API in Quick Reference 10

**Learn to:**
- Structure state to avoid duplication
- Lift state to common ancestors
- Use Context API to avoid prop drilling
- Choose between useState and useReducer

### For Forms and Input

**Review:**
- Quick Reference examples 1, 2 - Controlled inputs and FormData
- `references/components.md` - Form component details
- `references/hooks.md` - useState patterns

**Master:**
- Controlled inputs (React manages value)
- Uncontrolled inputs (DOM manages value)
- FormData for multi-field forms
- Form validation patterns

### For Refs and DOM Manipulation

**Study:**
- Quick Reference examples 3, 4, 5 - Various ref patterns
- `references/hooks.md` - useRef and useImperativeHandle
- `references/components.md` - Passing refs to child components

**Use cases:**
- Focusing inputs
- Scrolling to elements
- Measuring element dimensions
- Integrating with non-React libraries

### For Performance Optimization

**Resources:**
- `references/hooks.md` - useMemo, useCallback, useDeferredValue
- `references/components.md` - React.memo, Suspense, lazy
- `references/api.md` - React Compiler

**Techniques:**
- Memoize expensive calculations with useMemo
- Prevent unnecessary re-renders with React.memo
- Optimize callbacks with useCallback
- Use Suspense for code splitting
- Pre-render with Activity boundaries

### For React 19 Features

**Explore:**
- Quick Reference examples 7, 8 - Activity component
- `references/components.md` - Activity, Suspense
- `references/api.md` - Server Components

**New in React 19:**
- Activity component for hiding UI with state preservation
- Pre-rendering hidden content for faster interactions
- Improved Suspense integration
- React Server Components

## Common Patterns

### Lifting State Up

When multiple components need to share state, move it to their closest common ancestor:

```javascript
function Parent() {
  const [value, setValue] = useState('');

  return (
    <>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} />
    </>
  );
}
```

### Passing Refs to Child Components

```javascript
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

### Compound Components

Components that work together to form a cohesive UI:

```javascript
<Select value={selected} onChange={setSelected}>
  <Option value="a">Option A</Option>
  <Option value="b">Option B</Option>
</Select>
```

### Render Props

Pass a function as a prop to customize rendering:

```javascript
<TabSwitcher
  tabIds={['first', 'second', 'third']}
  getHeader={tabId => tabId[0].toUpperCase() + tabId.slice(1)}
  renderContent={tabId => <p>This is the {tabId} item.</p>}
/>
```

### Custom Hooks for Reusable Logic

```javascript
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Usage
function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}px</div>;
}
```

## Best Practices

### State Management
1. **Keep state minimal** - Only store what you can't compute from props or other state
2. **Avoid duplication** - Store IDs instead of full objects when possible
3. **Group related state** - If two values always change together, store them together
4. **Lift state up** - Move shared state to the closest common ancestor
5. **Use Context for deep prop passing** - Avoid prop drilling through many levels

### Components
6. **Keep components small and focused** - Each component should do one thing well
7. **Use meaningful names** - Component names should clearly describe what they render
8. **Prefer composition** - Build complex UIs from simple components
9. **Use keys in lists** - Always provide unique, stable keys when rendering arrays

### Hooks
10. **Call hooks at the top level** - Never call hooks inside loops, conditions, or nested functions
11. **Keep effects minimal** - Each useEffect should handle one concern
12. **Clean up effects** - Return cleanup functions from useEffect for subscriptions
13. **List all dependencies** - Include every value from component scope that effect uses
14. **Use refs for non-rendering values** - Don't put values in state if they don't affect the UI

### Forms
15. **Prefer controlled components** - Manage form inputs with React state for consistency
16. **Use FormData for multi-field forms** - Avoid managing state for every input
17. **Validate on submit** - Don't annoy users with validation on every keystroke

### Performance
18. **Measure before optimizing** - Use React DevTools Profiler to find slow components
19. **Memoize expensive calculations** - Use useMemo for computationally heavy operations
20. **Prevent unnecessary re-renders** - Use React.memo for components that render often with same props

## Troubleshooting

### Component Not Re-rendering

**Symptoms:** State updates but UI doesn't change

**Causes & Solutions:**
- **Mutating state directly** - Always use setState functions, never modify state objects directly
  ```javascript
  // ❌ Wrong
  state.items.push(newItem);

  // ✅ Correct
  setItems([...items, newItem]);
  ```
- **Missing dependencies** - Include all values your effect uses in the dependency array
- **Unstable keys** - Use stable, unique keys in lists (not array index)

### Infinite Loops

**Symptoms:** Component re-renders continuously, browser freezes

**Causes & Solutions:**
- **Missing effect dependencies** - Effect updates state that triggers the effect again
  ```javascript
  // ❌ Wrong - missing dependency
  useEffect(() => {
    setCount(count + 1);
  }, []); // Should include 'count' or use function form

  // ✅ Correct
  useEffect(() => {
    setCount(c => c + 1);
  }, []); // Function form doesn't need 'count' in dependencies
  ```
- **Creating objects in render** - New object created every render
  ```javascript
  // ❌ Wrong
  <Child config={{ theme: 'dark' }} />

  // ✅ Correct
  const config = useMemo(() => ({ theme: 'dark' }), []);
  <Child config={config} />
  ```

### Stale Closures

**Symptoms:** Effect or callback uses old value instead of current state

**Causes & Solutions:**
- **Missing dependencies** - Include all used values in dependency array
- **Use function form of setState** - Access current state without closure
  ```javascript
  // ❌ Wrong - stale count
  const increment = () => setCount(count + 1);

  // ✅ Correct - always current
  const increment = () => setCount(c => c + 1);
  ```

### Input Doesn't Update When Typing

**Symptoms:** Controlled input appears frozen

**Causes & Solutions:**
- **Missing onChange handler** - Controlled inputs need onChange
  ```javascript
  // ❌ Wrong
  <input value={name} />

  // ✅ Correct
  <input value={name} onChange={e => setName(e.target.value)} />
  ```
- **Not using e.target.value** - Reading wrong property
  ```javascript
  // ❌ Wrong for text input
  <input checked={value} onChange={e => setValue(e.target.checked)} />

  // ✅ Correct
  <input value={value} onChange={e => setValue(e.target.value)} />
  ```

### Ref is Null in Effect

**Symptoms:** `ref.current` is null when trying to use it

**Causes & Solutions:**
- **Using useEffect instead of useLayoutEffect** - DOM not ready yet
  ```javascript
  // ❌ Wrong - ref might be null
  useEffect(() => {
    ref.current.focus();
  }, []);

  // ✅ Correct - runs after DOM update
  useLayoutEffect(() => {
    ref.current.focus();
  }, []);
  ```

### Performance Issues

**Symptoms:** Sluggish UI, slow rendering, laggy interactions

**Diagnosis & Solutions:**
1. **Use React DevTools Profiler** - Identify which components are slow
2. **Check for unnecessary re-renders** - Use React.memo for components that render often
3. **Memoize expensive calculations** - Use useMemo for heavy computations
4. **Optimize callbacks** - Use useCallback to prevent passing new functions
5. **Code split with lazy()** - Don't load everything upfront
6. **Use keys properly** - Helps React identify which items changed in lists

## Resources

### Official Documentation
- [React.dev](https://react.dev) - Official React documentation
- [React Reference](https://react.dev/reference/react) - Complete API reference
- [React Hooks](https://react.dev/reference/react/hooks) - All hooks documentation

### Learning Resources
- Check `references/getting_started.md` for the official tutorial
- Review Quick Reference examples above for common patterns
- Explore `references/hooks.md` for deep dives into each hook

## Notes

- This skill was automatically generated from official React documentation
- All examples are taken from React.dev and use modern React practices
- Reference files preserve the structure and examples from official docs
- Code examples include proper language detection for syntax highlighting
- Quick reference patterns focus on practical, real-world usage
- Focus on function components and hooks (class components are legacy)

## Updating

To refresh this skill with updated documentation:
1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information from React.dev
