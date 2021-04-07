import { Component } from 'react'
import { observer } from './mobx-react'
import { observable } from './mobx'
import cls from 'classnames'

const data = observable({
  name: 'todo-list',
  todos: [
    { id: 1, name: 'homework', done: false },
    { id: 2, name: 'play', done: false },
  ],
})

window.data = data

class App extends Component {
  toggleDone = (id) => {
    const todo = data.todos.find((item) => item.id === id)
    todo.done = !todo.done
  }

  render() {
    const { name, todos } = data
    const doneWorks = todos.filter((item) => item.done)
    console.log('render...')

    return (
      <div className="App">
        <h1>
          {name}, {doneWorks.length} is done
        </h1>
        <div>
          {todos.map((item) => {
            const { id, name, done } = item
            return (
              <div key={id}>
                <span
                  style={{ textDecoration: done ? 'line-through' : 'none' }}
                >
                  {name}
                </span>
                <button
                  onClick={() => {
                    this.toggleDone(id)
                  }}
                >
                  toggle
                </button>
                {/* <button onClick={() => {}}>delete</button> */}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default observer(App)
