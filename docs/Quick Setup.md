<p align="center"> 
<a href="https://dndkit.com/"><img src="https://dndkit.com/dnd-kit-logo.svg" alt="dnd logo" /></a>
</p>

# DND Kit

A lightweight, performant, accessible and
extensible drag & drop toolkit for React.

Website: https://dndkit.com/

Official Documentation: https://docs.dndkit.com/

npm: https://www.npmjs.com/package/@dnd-kit/core

## Installation

Single Dropable

```sh
npm install @dnd-kit/core @dnd-kit/modifiers @dnd-kit/utilities
```

Multi Dropable with Sortable Library

```sh
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers @dnd-kit/utilities
```

## Parent Component Stuff

### Overlay (Sortable Only) (Optional)

Create a hook to store currently dragging element. This element will be displayed by `DragOverlay` as a mirrored item.

```jsx
const [activeElm, setActiveElm] = useState(null)
const handleDragStart = (data) => {
  ...
  setActiveElm(element)
}

const handleDragEnd = (data) => {
  ...
  setActiveElm(null)
}

const handleDragCancel = () => setActiveElm(null)
```

```jsx
<DragOverlay
  adjustScale={true}
  modifiers={[restrictToWindowEdges]}
  zIndex={10}
  className="cursor-grabbing overflow-hidden bg-white shadow-md"
>
  {!!activeElm && (
    // forward ref if component
    // render active element
  )}
</DragOverlay>
```

### Setup Sensors

```jsx
const sensors useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
```

- Must use `touch-action: "none"` on draggable items/triggers

### Contexts and Container

<details>
<summary>imports</summary>

```jsx
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
```

</details>

```jsx
<DndContext
  sensors={sensors}
  // Each event passes an object to the callback fn
  // {active, over} is what we mostly need
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onDragCancel={handleDragCancel}
  collisionDetection={closestCenter}
  // if items are sorted or removed manually without dragging
  measuring={{
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }}
>
  // strategy directly impacts "Transform" object returned from useSorting hook
  // pass {() => null} to the strategy callbackfn if items are sorted onDragOver
  instead of onDragEnd or if transformation is done manually
  <SortableContext items={array} strategy={rectSortingStrategy}>
    <Container>
      {array.map((item) => (
        <DraggableItem />
      ))}
    </Container>
  </SortableContext>
</DndContext>
```

## Child Component stuff

### Draggable component

<details>
<summary>imports</summary>

```jsx
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
```

</details>

```jsx
// If items are sorted/removed manually without dragging
const animateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({
    ...args,
    wasDragging: true,
  })

const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
  useSortable({
    id: element.id,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    animateLayoutChanges,
  })

// transform is an object. Use CSS library from dnd to parse it
const style = {
  transform: CSS.Transform.toString(transform),
  transition: transition,
  transformOrigin: "0 0",
  touchAction: "none",
}

return (
  <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
    {children}
  </div>
)
```
