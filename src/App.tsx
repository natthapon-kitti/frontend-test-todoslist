
import './App.css'
import Todos from './todos'
import ApiProvider from './apiContext.tsx'

function App() {

  return (
    <ApiProvider>
      <div className="bg-white absolute min-h-screen min-w-screen left-0 top-0 p-10">
        <Todos />
      </div>
    </ApiProvider>

  )
}

export default App
