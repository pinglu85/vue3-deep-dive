import { h } from 'vue';

const App = {
  render() {
    // v-if='ok'
    return this.ok
      ? h('div', { id: 'hello' }, [h('span', 'world')])
      : h('p', 'other branch');
  },
};
