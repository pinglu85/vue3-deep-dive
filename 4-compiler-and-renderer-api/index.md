In Vue, the compiler generates 'hints' to help runtime be more efficient.

---

`createVNode` vs. `createBlock`

Every block will have an additional array tracking only the dynamic nodes inside of it.

Consider the following template:

```
<div>
  <div></div>
  <div></div>
  <div>
    <span>{{ msg }}</span>
  </div>
</div>
```

The Vue 3 template compiler compiles the template into the following render function:

```js
import {
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createBlock as _createBlock,
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createVNode(
  'div',
  null,
  null,
  -1 /* HOISTED */
);
const _hoisted_2 = /*#__PURE__*/ _createVNode(
  'div',
  null,
  null,
  -1 /* HOISTED */
);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock('div', null, [
      _hoisted_1,
      _hoisted_2,
      _createVNode('div', null, [
        _createVNode('span', null, _toDisplayString(_ctx.msg), 1 /* TEXT */),
      ]),
    ])
  );
}

// Check the console for the AST
```

The root `div` is turned into a `block`. `1 /* Text */` is a patch flag, which is a indication that the node `span` is dynamic and should be tracked. Therefore, the node `span` will be added into `openBlock` as a dynamic node. After the whole call, the root `div` will have an extra property called `dynamic children` which contains only the `span` node.
