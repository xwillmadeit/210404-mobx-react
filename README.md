## 实现 mobx-react

`mobx` 的简单实现[参考](https://github.com/xwillmadeit/210403-mobx)。

实现思路：

1. `mobx-react` 的 `observer` 高阶组件使 react 组件具备响应 `mobx observable` 变化而重新渲染的能力。

2. 在 `observer` 高阶组件中继承原组件，拿到原组件的 `render` 函数。

3. 原组件的 `render` 函数执行后，`mobx` 就会收集组件和 `observable` 的关联关系。

4. `observable` 变化时，相关的组件进行响应，这里使用 `forceUpdate` 强制重新渲染。

`observer` 核心代码：

```js
import { Reaction } from './mobx'

function observer(WrappedComponent) {
  // 这里使用继承，目的是拿到被包裹组件的 render 方法
  return class extends WrappedComponent {
    update = () => {
      this.forceUpdate()
    }

    /**
     * 这个 render 执行后，被包裹组件正常执行
     * 同时建立了 observable 和组件的关联关系
     */
    render() {
      // 下面这几行实现类似于 autorun
      Reaction.start(this.update)
      // 调用被包裹组件的 render 方法就可以开始依赖收集
      const element = super.render()
      Reaction.end()
      return element
    }
  }
}

export { observer }
```

## 其他资料

[Build your own MobX-like state management library in 40 lines of code](https://czaplinski.io/blog/make-your-own-mobx/)

[Build your own MobX (Hebrew)](https://www.youtube.com/watch?v=hMD9wKOJ4x8)
