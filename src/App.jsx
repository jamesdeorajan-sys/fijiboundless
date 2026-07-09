import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Facility from './pages/Facility.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/search"        element={<Search />} />
          <Route path="/facility/:id"  element={<Facility />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
