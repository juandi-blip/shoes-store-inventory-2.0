import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Sistema de Gestión - Zapatería</h1>
        <Routes>
          <Route path="/" element={<h2>Inicio</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
