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
  - [x] Search
    - [x] Container
      - [x] TextField, optional icon
      - [x] Checkbox, label
      - [x] Button, text/icon variants
      - [x] Modal
  - [x] Grid
    - [x] Container
      - [x] Card
        - [x] Logo
        - [x] Status
- [x] route `/:id`
  - [x] Heading/Company
    - [x] Container
      - [x] Button
  - [ ] Content/Position (style markdown elements)
    - [ ] Container
      - [ ] Status
      - [ ] Button
  - [x] Summary/Apply
    - [x] Container
  - [x] Cta
    - [x] Container
      - [x] Button

## Data

```js
const state = {
  theme: 'dark/light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
    isSModalOpen: false,
  },
  jobs: [false, null, null], // loading, error, data
};
```
