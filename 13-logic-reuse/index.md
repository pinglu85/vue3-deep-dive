## Logic reuse with Composition API

Before Composition API we can use **Mixin** to make logic reusable:

```js
const { createApp } = Vue;

const MouseMixin = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    update(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.update);
  },
  unmounted() {
    window.removeEventListener('mousemove', this.update);
  },
};

const App = {
  mixins: [MouseMixin],
  template: `{{ x }} {{ y }}`,
};

createApp(App).mount('#app');
```

The problem with mixin is that, if you have multiple mixins and each injects different properties, you will get confused as to which property is injected by which mixin. With mixin we also have namespace collision problem.

Another option is **Higher-Order Component**:

```js
const { createApp, h } = Vue;

function withMouse(Inner) {
  return {
    data() {
      return {
        x: 0,
        y: 0,
      };
    },
    methods: {
      update(e) {
        this.x = e.pageX;
        this.y = e.pageY;
      },
    },
    mounted() {
      window.addEventListener('mousemove', this.update);
    },
    unmounted() {
      window.removeEventListener('mousemove', this.update);
    },
    render() {
      return h(Inner, {
        x: this.x,
        y: this.y,
      });
    },
  };
}

const App = withMouse({
  props: ['x', 'y'],
  template: `{{ x }} {{ y }}`,
});

createApp(App).mount('#app');
```

With HOC it is still very easy to lose track of which property comes from which HOC once we have multiple HOCs. It also doesn't get rid of the namespace collision problem in `App` component.

The third option is **Slots Scope**, which is a close equivalent to **Render Props** in React:

```js
const { createApp } = Vue;

const Mouse = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    update(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.update);
  },
  unmounted() {
    window.removeEventListener('mousemove', this.update);
  },
  render() {
    return (
      this.$slots.default &&
      this.$slots.default({
        x: this.x,
        y: this.y,
      })
    );
  },
};

const App = {
  components: { Mouse },
  template: `
    <Mouse v-slot="{ x, y }">
      <Foo v-slot="{ x: foo }">
        {{ x }} {{ y }} {{ foo }}
      </Foo>
    </Mouse>
  `,
};

createApp(App).mount('#app');
```

With Slots Scope we solve the unclear source of injection and namespace collision. The downside of this approach is that we are creating multiple component instances for the sake of logic extraction and reuse.

With Composition API:

```js
const { createApp, ref, onMounted, onUnmounted } = Vue;

function useMouse() {
  const x = ref(0);
  const y = ref(0);

  const update = (e) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return { x, y };
}

const App = {
  setup() {
    const { x, y } = useMouse();
    const { x: z } = useOtherFeature();
    return { x, y, z };
  }
  template: ` {{ x }} {{ y }}`,
};

createApp(App).mount('#app');
```
