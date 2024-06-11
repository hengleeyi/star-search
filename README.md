# Vite Checkbox Tree 🌳

Vite Checkbox Tree is a faceted checkbox tree component built with React. It allows users to view and interact with a hierarchical structure of nested categories. By clicking on category titles, users can expand or collapse related subcategories.

The toolbar offers convenient functions for interacting with all categories. The first button is for selecting or deselecting all categories. Toggling this button will instantly check or uncheck all checkboxes. The second button shows or hides all subcategories, making it easy to expand or collapse the entire tree and quickly get an overview of each level.

The bottom section displays the currently selected categories, always syncing with the checkboxes in the tree. This feature helps users understand their current selection and decide on further actions with ease.

## Preview

[![Preview](https://github.com/hengleeyi/vite-check/blob/main/preview.png?raw=true)](http://github.com/hengleeyi/vite-check/)



## Quick Usage

```Typescript


function App() {
    const data = [
        { id: "1", parent: "0", name: "Men" },
        { id: "2", parent: "0", name: "Women" },
        { id: "3", parent: "1", name: "Shirt" },
    ];
    
    return <CheckboxTree defaultVal={data} />
}
```

## Website

https://vite-check-six.vercel.app/

## Stacks
- React 18.2
- Typescript 5.2
- Tailwind CSS
- Vite
- Vitest

## Installing Dependencies

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

## Running Test
```bash
npm run test
```

## Running Test Coverage
```bash
npm run coverage
```
