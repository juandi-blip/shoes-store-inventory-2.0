import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Página de gestión de categorías de calzado.
 * Permite listar, crear, editar y eliminar categorías.
 * Se conecta con la API REST del backend Spring Boot.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function CategoriasPage() {
  // Lista de categorías cargada desde el backend
  const [categorias, setCategorias] = useState([])
  // Indicador de carga inicial
  const [loading, setLoading] = useState(true)
  // Mensaje de error si falla alguna operación
  const [error, setError] = useState(null)
  // Controla la visibilidad del modal de formulario
  const [showModal, setShowModal] = useState(false)
  // Categoría en edición (null = nueva)
  const [categoriaActual, setCategoriaActual] = useState(null)

  /**
   * Carga todas las categorías al montar el componente.
   */
  useEffect(() => {
    cargarCategorias()
  }, [])

  /**
   * Obtiene todas las categorías desde la API REST.
   */
  const cargarCategorias = async () => {
    try {
      setLoading(true)
      const respuesta = await api.get('/categorias')
      setCategorias(respuesta.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar las categorías. Verifique que el backend esté ejecutándose.')
      console.error('Error al obtener categorías:', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Elimina una categoría tras confirmación del usuario.
   * @param {number} id - ID de la categoría a eliminar
   */
  const eliminarCategoria = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar esta categoría?')
    if (!confirmar) return

    try {
      await api.delete(`/categorias/${id}`)
      setCategorias(categorias.filter(c => c.idCategoria !== id))
    } catch (err) {
      setError('Error al eliminar la categoría.')
      console.error('Error al eliminar categoría:', err)
    }
  }

  /** Abre el modal en modo edición. */
  const abrirEditar = (categoria) => {
    setCategoriaActual(categoria)
    setShowModal(true)
  }

  /** Abre el modal en modo creación. */
  const abrirCrear = () => {
    setCategoriaActual(null)
    setShowModal(true)
  }

  /**
   * Guarda una categoría nueva o actualiza una existente.
   * @param {Object} datosCategoria - Datos del formulario
   */
  const guardarCategoria = async (datosCategoria) => {
    try {
      if (categoriaActual && categoriaActual.idCategoria) {
        await api.put(`/categorias/${categoriaActual.idCategoria}`, datosCategoria)
      } else {
        await api.post('/categorias', datosCategoria)
      }
      await cargarCategorias()
      setShowModal(false)
      setCategoriaActual(null)
    } catch (err) {
      setError('Error al guardar la categoría.')
      console.error('Error al guardar categoría:', err)
    }
  }

  return (
    <div>
      {/* Encabezado con título y botón de acción */}
      <div className="page-header">
        <h1 className="page-title">Categorías</h1>
        <button className="btn btn-primary" onClick={abrirCrear}>
          + Nueva Categoría
        </button>
      </div>

      {/* Alerta de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Tabla de categorías o estado de carga */}
      {loading ? (
        <div className="loading">Cargando categorías...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-state-cell">
                    <p className="empty-state-text">No hay categorías registradas.</p>
                    <button className="btn btn-secondary" onClick={abrirCrear}>
                      Agregar primera categoría
                    </button>
                  </td>
                </tr>
              ) : (
                categorias.map((categoria) => (
                  <tr key={categoria.idCategoria}>
                    <td>{categoria.idCategoria}</td>
                    <td>{categoria.nombre}</td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => abrirEditar(categoria)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarCategoria(categoria.idCategoria)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de formulario para crear / editar categoría */}
      {showModal && (
        <CategoriaForm
          categoria={categoriaActual}
          onGuardar={guardarCategoria}
          onCancelar={() => {
            setShowModal(false)
            setCategoriaActual(null)
          }}
        />
      )}
    </div>
  )
}

/**
 * Formulario modal para crear o editar una categoría.
 * @param {Object}   categoria  - Categoría a editar (null si es nueva)
 * @param {Function} onGuardar  - Callback al confirmar
 * @param {Function} onCancelar - Callback al cancelar
 */
function CategoriaForm({ categoria, onGuardar, onCancelar }) {
  // Estado del formulario
  const [formulario, setFormulario] = useState({
    nombre: categoria?.nombre || '',
  })

  /** Actualiza el campo del formulario. */
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario(prev => ({ ...prev, [name]: value }))
  }

  /** Valida y envía el formulario. */
  const manejarEnvio = (e) => {
    e.preventDefault()
    if (!formulario.nombre.trim()) {
      alert('El nombre de la categoría es obligatorio.')
      return
    }
    onGuardar(formulario)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {categoria ? 'Editar Categoría' : 'Nueva Categoría'}
          </h2>
          <button className="modal-close" onClick={onCancelar}>×</button>
        </div>

        <form onSubmit={manejarEnvio}>
          <div className="form-body">
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Ej. Botas, Sandalias, Tenis..."
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {categoria ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoriasPage
