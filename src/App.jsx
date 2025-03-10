
import './App.css'
import Timer from './components/Timer'

function App() {

  return (
    <>
      <div>
        <Timer countDown={true}/>
        <Timer countDown={false}/>
      </div>
    </>
  )
}

export default App
