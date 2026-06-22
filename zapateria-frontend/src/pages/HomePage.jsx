import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

/**
 * Página de inicio del sistema de gestión de zapatería.
 * Muestra un panel de bienvenida, estado de conexión al backend
 * y accesos rápidos a los módulos principales.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function HomePage() {
  // Estado del error de conexión con la base de datos
  const [errorConexion, setErrorConexion] = useState(null)
  // Estado para saber si la verificación de conexión terminó
  const [verificando, setVerificando] = useState(true)

  /**
   * Al montar el componente, intenta conectarse al backend
   * para detectar posibles errores de base de datos.
   */
  useEffect(() => {
    const verificar = async () => {
      try {
        await api.get('/categorias')
        setErrorConexion(null)
      } catch (err) {
        // Captura el mensaje de error del servidor si existe
        const detalle = err.response?.data?.message
          || err.message
          || 'No se pudo conectar con el servidor backend.'
        setErrorConexion(detalle)
      } finally {
        setVerificando(false)
      }
    }

    verificar()
  }, [])

  return (
    <div>
      {/* Sección hero con título y estado del sistema */}
      <div className="hero-section">
        <h1 className="hero-title">Gestión de Inventario</h1>
        <p className="hero-description">
          Plataforma interna para la administración de stock, control de
          proveedores y actualización del catálogo oficial de la zapatería.
        </p>

        {/* Bloque de error si el backend no está disponible */}
        {!verificando && errorConexion && (
          <div className="hero-error">
            <span className="hero-error-icon">⚠</span>
            <div>
              <div className="hero-error-title">
                Error en base de datos: No se pudo conectar al backend.
              </div>
              <div className="hero-error-detail">{errorConexion}</div>
            </div>
          </div>
        )}
      </div>

      {/* Tarjetas de acceso rápido a los módulos */}
      <div className="feature-grid">
        {/* Módulo de productos / inventario */}
        <Link to="/productos" className="feature-card">
          <span className="feature-card-icon">📋</span>
          <div className="feature-card-title">Ver Inventario</div>
          <p className="feature-card-desc">
            Consulte todos los productos en catálogo, actualice precios
            o elimine modelos agotados.
          </p>
        </Link>

        {/* Módulo de categorías */}
        <Link to="/categorias" className="feature-card">
          <span className="feature-card-icon">🏷</span>
          <div className="feature-card-title">Categorías</div>
          <p className="feature-card-desc">
            Administre las categorías del catálogo: zapatos, botas,
            sandalias, tenis y más.
          </p>
        </Link>

        {/* Módulo de proveedores */}
        <Link to="/proveedores" className="feature-card">
          <span className="feature-card-icon">🏭</span>
          <div className="feature-card-title">Proveedores</div>
          <p className="feature-card-desc">
            Gestione los proveedores que suministran el inventario
            de la tienda.
          </p>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
