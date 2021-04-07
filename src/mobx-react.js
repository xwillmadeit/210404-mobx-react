import { Reaction } from './mobx'

function observer(WrappedComponent) {
  return class extends WrappedComponent {
    update = () => {
      this.forceUpdate()
    }

    render() {
      // 这里的实现类似于 autorun
      Reaction.start(this.update)
      const element = super.render()
      Reaction.end()
      return element
    }
  }
}

export { observer }
