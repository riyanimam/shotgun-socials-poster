import './App.css'
import SocialPosterForm from './components/SocialPosterForm'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Shotgun Social Poster</h1>
        <p>Post to multiple social media platforms at once</p>
      </header>
      <main className="app-main">
        <SocialPosterForm />
      </main>
    </div>
  )
}

export default App
