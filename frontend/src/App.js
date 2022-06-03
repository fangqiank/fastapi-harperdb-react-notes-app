import './App.css'
import { NotesList } from './pages/NotesList'
import { NoteDetail } from './pages/NoteDetail'
import { NoteProvider } from './context/NoteContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'

function App() {
  return (
    <>
      <Header />

      <Router>
        <NoteProvider>
          <div className="container dark">
            <div className="app">
              <Routes>
                <Route path="/" element={<NotesList />} />
                <Route path="/notes/:id" element={<NoteDetail />} />
              </Routes>
            </div>
          </div>
        </NoteProvider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
