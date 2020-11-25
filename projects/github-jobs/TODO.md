# Plan

## Dependencies

- [ ] css-in-js
- [ ] router
- [ ] testing
- [ ] validation
- [ ] animation

## Components

- [ ] Header
  - [ ] Container
    - [ ] Link
    - [ ] Toggle, optional icon labels
- [ ] route `/` or `/positions` or `/positions?search=query`
  - [ ] Search
    - [ ] Container
      - [ ] TextField, optional icon
      - [ ] Checkbox, label
      - [ ] Button, text/icon variants
      - [ ] Modal
  - [ ] Grid
    - [ ] Container
      - [ ] Card
        - [ ] Logo
        - [ ] Status
- [ ] route `/positions/:id`
  - [ ] Heading/Company
    - [ ] Container
      - [ ] Button
  - [ ] Content/Position (style markdown elements)
    - [ ] Container
      - [ ] Status
      - [ ] Button
  - [ ] Summary/Apply
    - [ ] Container
  - [ ] Cta
    - [ ] Container
      - [ ] Button

## Data

```js
const state = {
  theme: 'dark/light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
  },
  isSearchModalOpen: false,
};
```
