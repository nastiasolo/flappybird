# Code Plan

## How to move a bird

- it can move "on click" or by pressing "space" on keyboard
- at the same time it is also slowly moving down

## Functions

- `draw()` — draws bird, pipes
- `update()` — updates positions
  on every millisecond (frame, second ?) this function adds to Y -> bird moves down
- `onInput()` — makes the bird jump when user clicks
  on click/press subtract a little from bird Y -> bird moves up a bit
