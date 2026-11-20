import { Provider } from "react-redux"
import { store } from './store/store.js'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { ToysIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"

function App() {
  return (

    <Provider store={store}>
      <Router>
        <section className="app-main-layout">
          <Routes>
            <Route path="toys/" element={<ToysIndex />} />
            <Route path="toys/:toyId" element={<ToyDetails />} />
            <Route path="toys/edit/:toyId" element={<ToyEdit />} />
            <Route path="toys/edit" element={<ToyEdit />} />
          </Routes>

        </section>
      </Router>
    </Provider >
  )
}

export default App
