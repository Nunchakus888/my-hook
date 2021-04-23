import React, {Fragment, useReducer} from 'react'
import ReactDOM from 'react-dom'
import './App.css'

/**
 * useState 简易实现
 * 核心作用是给函数组件增加了一个保持状态的功能
 */
// 声明 memoizedState
let memoizedState = [];
// 标记 state 索引，多个state 在 memoizedState 中的索引
let index = 0;

function useState(state) {
  memoizedState[index] = memoizedState[index] || state;

  let currIndex = index;
  const setState = (s) => {
    memoizedState[currIndex] = s;
    render();
  }

  return [memoizedState[index++], setState];
}

/**
 * useEffect 简易实现
 * 第二个参数为依赖项，即当依赖项改变时，才会触发回调
 * @returns {*}
 * @constructor
 */

// 记录最后依赖项
let lastDependencies;
function useEffect(callback, dependencies) {
  // 如果依赖项没有传值，则直接调用callback
  if (!dependencies) {
    // 保证索引对应
    index++;
    return callback();
  }
  // 从memoizedState取最后一个依赖项
  let lastDependencies = memoizedState[index];

  /**
   * 1、首次渲染isChange为true，把初始的依赖项赋给lastDependencies
   * 2、再次渲染时候，把lastDependencies和dependencies做对比，当不完全相等时，才触发回调
   * @type {boolean}
   */
  let isChange = lastDependencies ? !dependencies.every((item, index) => item === lastDependencies[index]) : true;
  if (isChange) {
    callback();
    // 往memoizedState存依赖项
    memoizedState[index] = dependencies;
  }
  // 索引递增
  index++
}

function App() {
  const [name, setName] = useState(4)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('----name', name);
  }, [name]);


  return (
    <Fragment>
      <p className="App">count：{count}</p>
      <p className="App" onClick={() => setCount(count + 1)}>click me</p>

      <p className="App">name：{name}</p>
      <p className="App" onClick={() => setName(name * 2)}>click change name</p>
    </Fragment>
  )
}

function render() {
  index = 0;
  ReactDOM.render(<App/>, document.getElementById('root'))
}

render();
