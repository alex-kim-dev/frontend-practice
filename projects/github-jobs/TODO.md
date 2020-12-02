# Plan

## Dependencies

- [x] css-in-js
- [x] router
- [ ] testing
- [ ] validation
- [ ] animation

## Components

- [x] Header
  - [x] Container
    - [x] Link
    - [x] Toggle, optional icon labels
- [x] routes `/`, `/?search=query&page=2`
  - [ ] Search
    - [ ] Container
      - [ ] TextField, optional icon
      - [ ] Checkbox, label
      - [x] Button, text/icon variants
      - [ ] Modal
  - [ ] Grid
    - [ ] Container
      - [ ] Card
        - [ ] Logo
        - [ ] Status
- [x] route `/:id`
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
