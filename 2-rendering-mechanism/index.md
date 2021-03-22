### Virtual DOM:

- Decouples rendering logic from the actual DOM - makes it straightforward to reuse it in non-browser environments, e.g. rendering to a string (SSR), rendering to canvas/WebGL. or native mobile rendering.
- Provides the ability to programmatically construct, inspect, clone and create derivative structures using the full power of JavaScript.

Render function in Vue 2:

```js
render(h) {
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.onClick
    }
  }, 'hello');
}
```

Render function in Vue 3:

- Flat props structure
- Globally imported `h` helper

```js
import { h } from 'vue';

render() {
  return h('div', {
    id: 'foo',
    onClick: this.onClick,
  }, 'hello');
}
```
