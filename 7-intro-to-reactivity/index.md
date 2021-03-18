Consider the following code snippet:

```js
let a = 3;
let b = a * 10;
console.log(b); // 30
a = 4;
console.log(b); // 30
```

If we want to keep `a` and `b` in sync, we have to write `b = a * 10` again:

```js
let a = 3;
let b = a * 10;
console.log(b); // 30
a = 4;
b = a * 10;
console.log(b); // 40
```

Odds are that we will forget to do the reassignment. It is more error-prone when we have a larger program where multiple developers work on.

Imagine we have a function called `onAChanged`:

```js
onAChanged(() => {
  b = a * 10;
});
```

The job of `onAChanged` is calling the callback function every time `a` is changed. If we can make sure the function is automatically re-executed at the appropriate time, we turn it into something declarative or reactive.

We can extend this idea a little further:

```html
<span class="cell b1"></span>
```

```js
onStateChanged(() => {
  document.querySelector('.cell.b1').textContent = state.a * 10;
});
```

Every time `state.a` is changed, the `textContent` of the `span` will also get updated. This is the essence of declarative rendering.

We can take this a bit further. Instead of writing the imperative DOM manipulation ourselves, we can let compiler do that for use and write the following code:

```js
<span class="cell b1">
  {{ state.a * 10 }}
</span>

onStateChanged(() => {
  view = render(state);
});
```

We can implement the `onStateChanged` function like below:

```js
let update, state;
const onStateChanged = (_update) => {
  update = _update;
};

const setState = (newState) => {
  state = newState;
  update();
};
```

How React conceptually works:

```js
onStateChanged(() => {
  view = render(state);
});

setState({ a: 5 });
```

Inside a React component, we need to manually call `setState` and it will then trigger the necessary updates. In Vue, we can write `state.a = 5`:

---

```js
onStateChanged(() => {
  console.log(state.count);
});
```

This is the basic form of the dependency tracking systems.

We can track dependencies for every single binding inside our template and update them individually, or we can track the whole template as a single side effect and then use a more efficient diffing algorithm to apply the changes.

### Vue 3 Reactivity API

```js
import { reactive, watchEffect } from 'vue';

const state = reactive({
  count: 0,
});

watchEffect(() => {
  console.log(state.count);
}); // 0

state.count++; // 1
```
