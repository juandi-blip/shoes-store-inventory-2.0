import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Página de gestión de proveedores de calzado.
 * Permite listar, crear, editar y eliminar proveedores.
 * Se conecta con la API REST del backend Spring Boot.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function ProveedoresPage() {
  // Lista de proveedores cargada desde el backend
  const [proveedores, setProveedores] = useState([])
  // Indicador de carga inicial
  const [loading, setLoading] = useState(true)
  // Mensaje de error si falla alguna operación
  const [error, setError] = useState(null)
  // Controla la visibilidad del modal de formulario
  const [showModal, setShowModal] = useState(false)
  // Proveedor en edición (null = nuevo)
  const [proveedorActual, setProveedorActual] = useState(null)

  /**
   * Carga todos los proveedores al montar el componente.
   */
  useEffect(() => {
    cargarProveedores()
  }, [])

  /**
   * Obtiene todos los proveedores desde la API REST.
   */
  const cargarProveedores = async () => {
    try {
      setLoading(true)
      const respuesta = await api.get('/proveedores')
      setProveedores(respuesta.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los proveedores. Verifique que el backend esté ejecutándose.')
      console.error('Error al obtener proveedores:', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Elimina un proveedor tras confirmación del usuario.
   * @param {number} id - ID del proveedor a eliminar
   */
  const eliminarProveedor = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar este proveedor?')
    if (!confirmar) return

    try {
      await api.delete(`/proveedores/${id}`)
      setProveedores(proveedores.filter(p => p.idProveedor !== id))
    } catch (err) {
      setError('Error al eliminar el proveedor.')
      console.error('Error al eliminar proveedor:', err)
    }
  }

  /** Abre el modal en modo edición. */
  const abrirEditar = (proveedor) => {
    setProveedorActual(proveedor)
    setShowModal(true)
  }

  /** Abre el modal en modo creación. */
  const abrirCrear = () => {
    setProveedorActual(null)
    setShowModal(true)
  }

  /**
   * Guarda un proveedor nuevo o actualiza uno existente.
   * @param {Object} datosProveedor - Datos del formulario
   */
  const guardarProveedor = async (datosProveedor) => {
    try {
      if (proveedorActual && proveedorActual.idProveedor) {
        await api.put(`/proveedores/${proveedorActual.idProveedor}`, datosProveedor)
      } else {
        await api.post('/proveedores', datosProveedor)
      }
      await cargarProveedores()
      setShowModal(false)
      setProveedorActual(null)
    } catch (err) {
      setError('Error al guardar el proveedor.')
      console.error('Error al guardar proveedor:', err)
    }
  }

  return (
    <div>
      {/* Encabezado con título y botón de acción */}
      <div className="page-header">
        <h1 className="page-title">Proveedores</h1>
        <button className="btn btn-primary" onClick={abrirCrear}>
          + Nuevo Proveedor
        </button>
      </div>

      {/* Alerta de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Tabla de proveedores o estado de carga */}
      {loading ? (
        <div className="loading">Cargando proveedores...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state-cell">
                    <p className="empty-state-text">No hay proveedores registrados.</p>
                    <button className="btn btn-secondary" onClick={abrirCrear}>
                      Agregar primer proveedor
                    </button>
                  </td>
                </tr>
              ) : (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.idProveedor}>
                    <td>{proveedor.idProveedor}</td>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.telefono || '—'}</td>
                    <td>{proveedor.direccion || '—'}</td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => abrirEditar(proveedor)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProveedor(proveedor.idProveedor)}
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

      {/* Modal de formulario para crear / editar proveedor */}
      {showModal && (
        <ProveedorForm
          proveedor={proveedorActual}
          onGuardar={guardarProveedor}
          onCancelar={() => {
            setShowModal(false)
            setProveedorActual(null)
          }}
        />
      )}
    </div>
  )
}

/**
 * Formulario modal para crear o editar un proveedor.
 * @param {Object}   proveedor  - Proveedor a editar (null si es nuevo)
 * @param {Function} onGuardar  - Callback al confirmar
 * @param {Function} onCancelar - Callback al cancelar
 */
function ProveedorForm({ proveedor, onGuardar, onCancelar }) {
  // Estado del formulario inicializado con los datos del proveedor (si existe)
  const [formulario, setFormulario] = useState({
    nombre:    proveedor?.nombre || '',
    telefono:  proveedor?.telefono || '',
    direccion: proveedor?.direccion || '',
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
      alert('El nombre del proveedor es obligatorio.')
      return
    }
    onGuardar(formulario)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}
          </h2>
          <button className="modal-close" onClick={onCancelar}>×</button>
        </div>

        <form onSubmit={manejarEnvio}>
          <div className="form-body">
            {/* Nombre del proveedor */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Ej. Nike, Adidas, Puma..."
                required
              />
            </div>

            {/* Teléfono de contacto */}
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formulario.telefono}
                onChange={manejarCambio}
                placeholder="Ej. 300 123 4567"
              />
            </div>

            {/* Dirección del proveedor */}
            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formulario.direccion}
                onChange={manejarCambio}
                placeholder="Dirección completa del proveedor"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {proveedor ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProveedoresPage
