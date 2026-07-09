import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Facility from './pages/Facility.jsx'
import Concierge from './pages/Concierge.jsx'
import Admin from './pages/Admin.jsx'
import GuidesIndex from './pages/GuidesIndex.jsx'
import Guide from './pages/Guide.jsx'
import { GUIDES } from './data/guides.js'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/search"        element={<Search />} />
          <Route path="/facility/:id"  element={<Facility />} />
          <Route path="/concierge"     element={<Concierge />} />
          <Route path="/admin"         element={<Admin />} />
          <Route path="/guides"        element={<GuidesIndex />} />
          {GUIDES.map(g => (
            <Route key={g.slug} path={`/guides/${g.slug}`} element={<Guide slug={g.slug} />} />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  )
}
