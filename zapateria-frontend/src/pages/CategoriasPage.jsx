import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Página de gestión de categorías.
 * Permite listar, crear, editar y eliminar categorías de productos.
 * Se conecta con la API REST del backend Spring Boot.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function CategoriasPage() {
  // Estado para almacenar la lista de categorías obtenida del backend
  const [categorias, setCategorias] = useState([])
  // Estado para controlar la visualización del spinner de carga
  const [loading, setLoading] = useState(true)
  // Estado para almacenar mensajes de error
  const [error, setError] = useState(null)
  // Estado para controlar la visibilidad del modal de formulario
  const [showModal, setShowModal] = useState(false)
  // Estado para almacenar la categoría que se está editando (null = nueva)
  const [categoriaActual, setCategoriaActual] = useState(null)

  /**
   * Efecto que se ejecuta al montar el componente.
   * Carga las categorías desde el backend.
   */
  useEffect(() => {
    cargarCategorias()
  }, [])

  /**
   * Función para obtener todas las categorías desde la API.
   * Maneja estados de carga y error.
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
   * Función para eliminar una categoría por su ID.
   * Solicita confirmación antes de proceder con la eliminación.
   * @param {number} id - Identificador de la categoría a eliminar
   */
  const eliminarCategoria = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar esta categoría?')
    if (!confirmar) return

    try {
      await api.delete(`/categorias/${id}`)
      // Actualizar la lista de categorías después de eliminar
      setCategorias(categorias.filter(c => c.id !== id))
    } catch (err) {
      setError('Error al eliminar la categoría.')
      console.error('Error al eliminar categoría:', err)
    }
  }

  /**
   * Función para abrir el modal con los datos de una categoría existente.
   * @param {Object} categoria - Objeto categoría a editar
   */
  const abrirEditar = (categoria) => {
    setCategoriaActual(categoria)
    setShowModal(true)
  }

  /**
   * Función para abrir el modal vacío para crear una nueva categoría.
   */
  const abrirCrear = () => {
    setCategoriaActual(null)
    setShowModal(true)
  }

  /**
   * Función para guardar una categoría (crear o actualizar).
   * @param {Object} datosCategoria - Datos de la categoría a guardar
   */
  const guardarCategoria = async (datosCategoria) => {
    try {
      if (categoriaActual && categoriaActual.id) {
        // Actualizar categoría existente
        await api.put(`/categorias/${categoriaActual.id}`, datosCategoria)
      } else {
        // Crear nueva categoría
        await api.post('/categorias', datosCategoria)
      }
      // Recargar la lista de categorías
      await cargarCategorias()
      setShowModal(false)
      setCategoriaActual(null)
    } catch (err) {
      setError('Error al guardar la categoría.')
      console.error('Error al guardar categoría:', err)
    }
  }

  // Renderizado del componente
  return (
    <div>
      {/* Encabezado de la página con botón para agregar nueva categoría */}
      <div className="page-header">
        <h1 className="page-title">Categorías</h1>
        <button className="btn btn-primary" onClick={abrirCrear}>
          + Nueva Categoría
        </button>
      </div>

      {/* Mensaje de error si ocurre algún problema */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Indicador de carga */}
      {loading ? (
        <div className="loading">Cargando categorías...</div>
      ) : (
        /* Tabla de categorías */
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-message">
                    No hay categorías registradas.
                  </td>
                </tr>
              ) : (
                categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion || '—'}</td>
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
                          onClick={() => eliminarCategoria(categoria.id)}
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

      {/* Modal de formulario para crear/editar categorías */}
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
 * Componente de formulario para crear/editar categorías.
 * Se muestra como modal superpuesto a la página.
 */
function CategoriaForm({ categoria, onGuardar, onCancelar }) {
  // Estado local del formulario
  const [formulario, setFormulario] = useState({
    nombre: categoria?.nombre || '',
    descripcion: categoria?.descripcion || '',
  })

  /**
   * Función para manejar los cambios en los campos del formulario.
   * @param {Event} e - Evento del input
   */
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Función para manejar el envío del formulario.
   * @param {Event} e - Evento de submit
   */
  const manejarEnvio = (e) => {
    e.preventDefault()
    // Validación básica de campos requeridos
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
          <button className="modal-close" onClick={onCancelar}>
            ×
          </button>
        </div>

        <form onSubmit={manejarEnvio}>
          {/* Campo: Nombre de la categoría */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ingrese el nombre de la categoría"
              required
            />
          </div>

          {/* Campo: Descripción */}
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Ingrese la descripción de la categoría"
            />
          </div>

          {/* Botones de acción del formulario */}
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
