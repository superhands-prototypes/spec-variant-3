import Header from './components/Header'
import SignupForm from './components/SignupForm'
import RecentlySoldTractors from './components/RecentlySoldTractors'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <RecentlySoldTractors />
        <div className="signup-layout">
          <SignupForm />
        </div>
      </main>
    </>
  )
}

export default App
