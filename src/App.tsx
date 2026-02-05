import { motion } from 'framer-motion'
import { HelpCircle, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import HelpModal from './components/HelpModal'
import SocialPosterForm from './components/SocialPosterForm'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚀 Shotgun Social Poster
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Post to multiple social media platforms at once
          </motion.p>
        </div>
        <div className="header-controls">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="icon-button"
            onClick={() => setShowHelp(true)}
            title="Help & Shortcuts"
          >
            <HelpCircle size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </header>
      <main className="app-main">
        <SocialPosterForm darkMode={darkMode} />
      </main>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} darkMode={darkMode} />
    </div>
  )
}
