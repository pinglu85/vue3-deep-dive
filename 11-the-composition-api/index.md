Composition API = Reactivity API + Lifecycle hooks

Example:

```js
import { reactive, watchEffect, onMounted } from 'vue';

export default {
  setup() {
    const state = reactive({ count: 0 });

    watchEffect(() => console.log(state.count));

    onMounted(() => console.log('mounted'));

    // Template Render Context.
    // Everything inside this object will be exposed to your template,
    // so you can use them in your template.
    return {
      state,
      increment: () => {
        state.count++;
      },
    };
  },
};
```

Fetch data on component creation and then refetch the data when a certain prop has changed:

```js
import { ref, watchEffect, onMounted } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    const fetchedData = ref(null);
    watchEffect(() => {
      fetch(`url${props.id}`)
        .then((res) => res.json())
        .then((data) => {
          fetchedData.value = data;
        });
    });

    onMounted(() => console.log('mounted'));

    return {
      // ...
    };
  },
};
```
