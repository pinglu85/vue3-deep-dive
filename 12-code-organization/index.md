Composition API provides a better mechanism for code organization and reuse.

Component without using Composition API:

```js
export default {
  template: ``,
  props: [],

  data() {
    return {
      foo: 1, // feature A
      bar: 2, // feature B
      baz: 3, // feature C
    };
  },

  methods: {
    one() {}, // feature A
    two() {}, // feature B
    three() {}, // feature C
  },

  watch: {},

  computed: {
    plusOne() {
      return this.foo + 1;
    },
  },
};
```

Without Composition API, codes that work together for the same feature are split between different Options.

Component with Composition API:

```js
import { ref, computed, watchEffect } from 'vue';

export default {
  template: ``,
  props: [],
  setup(props) {
    // feature A
    const foo = ref(0);
    const plusOne = computed(() => foo.value + 1);
    // associated function
    function incrementFoo() {}
    watchEffect(() => {});

    // feature B

    // feature C

    return { foo, plusOne };
  },
};
```

Split big `setup` function into smaller functions:

```js
import { ref, computed, watchEffect } from 'vue';

function useFeatureA() {
  const foo = ref(0);
  const plusOne = computed(() => foo.value + 1);
  // associated function
  function incrementFoo() {}
  watchEffect(() => {});

  return {
    foo,
    plusOne,
  };
}

function useFeatureB() {}

function useFeatureC() {}

export default {
  template: ``,
  props: [],
  setup(props) {
    const { foo, plusOne } = useFeatureA();
    const { bar } = useFeatureB();
    const { baz } = useFeatureC();

    return { foo, plusOne, bar, baz };
  },
};
```
