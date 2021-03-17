Vue has three core modules: **Reactivity Module**, **Compiler Module** and **Renderer Module**.

Consider a simple component with a template which uses a reactive object, when Vue loads up:

1. The **Compiler Module** changes HTML into a render function,
2. The reactive objects are initialized by the **Reactivity Module**.
3. The **Renderer Module Render Phase** invokes the render function which creates a Virtual DOM node. Since our render function references a reactive object, we track the render function to be run again if the reactive object changes.
4. In the **Mounting Phase** the **mount** function is called. It uses the Virtual DOM node to create the webpage.
5. When the reactive object is changed, the **Patch Phase** invokes the render function again, creating a new Virtual DOM node. The **patch** function compares the new Virtual DOM node with the old one and updates only the parts of the page that have changed.