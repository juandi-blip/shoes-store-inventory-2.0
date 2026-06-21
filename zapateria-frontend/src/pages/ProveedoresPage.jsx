import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Página de gestión de proveedores.
 * Permite listar, crear, editar y eliminar proveedores del sistema.
 * Se conecta con la API REST del backend Spring Boot.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function ProveedoresPage() {
  // Estado para almacenar la lista de proveedores obtenida del backend
  const [proveedores, setProveedores] = useState([])
  // Estado para controlar la visualización del spinner de carga
  const [loading, setLoading] = useState(true)
  // Estado para almacenar mensajes de error
  const [error, setError] = useState(null)
  // Estado para controlar la visibilidad del modal de formulario
  const [showModal, setShowModal] = useState(false)
  // Estado para almacenar el proveedor que se está editando (null = nuevo)
  const [proveedorActual, setProveedorActual] = useState(null)

  /**
   * Efecto que se ejecuta al montar el componente.
   * Carga los proveedores desde el backend.
   */
  useEffect(() => {
    cargarProveedores()
  }, [])

  /**
   * Función para obtener todos los proveedores desde la API.
   * Maneja estados de carga y error.
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
   * Función para eliminar un proveedor por su ID.
   * Solicita confirmación antes de proceder con la eliminación.
   * @param {number} id - Identificador del proveedor a eliminar
   */
  const eliminarProveedor = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar este proveedor?')
    if (!confirmar) return

    try {
      await api.delete(`/proveedores/${id}`)
      // Actualizar la lista de proveedores después de eliminar
      setProveedores(proveedores.filter(p => p.id !== id))
    } catch (err) {
      setError('Error al eliminar el proveedor.')
      console.error('Error al eliminar proveedor:', err)
    }
  }

  /**
   * Función para abrir el modal con los datos de un proveedor existente.
   * @param {Object} proveedor - Objeto proveedor a editar
   */
  const abrirEditar = (proveedor) => {
    setProveedorActual(proveedor)
    setShowModal(true)
  }

  /**
   * Función para abrir el modal vacío para crear un nuevo proveedor.
   */
  const abrirCrear = () => {
    setProveedorActual(null)
    setShowModal(true)
  }

  /**
   * Función para guardar un proveedor (crear o actualizar).
   * @param {Object} datosProveedor - Datos del proveedor a guardar
   */
  const guardarProveedor = async (datosProveedor) => {
    try {
      if (proveedorActual && proveedorActual.id) {
        // Actualizar proveedor existente
        await api.put(`/proveedores/${proveedorActual.id}`, datosProveedor)
      } else {
        // Crear nuevo proveedor
        await api.post('/proveedores', datosProveedor)
      }
      // Recargar la lista de proveedores
      await cargarProveedores()
      setShowModal(false)
      setProveedorActual(null)
    } catch (err) {
      setError('Error al guardar el proveedor.')
      console.error('Error al guardar proveedor:', err)
    }
  }

  // Renderizado del componente
  return (
    <div>
      {/* Encabezado de la página con botón para agregar nuevo proveedor */}
      <div className="page-header">
        <h1 className="page-title">Proveedores</h1>
        <button className="btn btn-primary" onClick={abrirCrear}>
          + Nuevo Proveedor
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
        <div className="loading">Cargando proveedores...</div>
      ) : (
        /* Tabla de proveedores */
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-message">
                    No hay proveedores registrados.
                  </td>
                </tr>
              ) : (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.id}>
                    <td>{proveedor.id}</td>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.contacto || '—'}</td>
                    <td>{proveedor.telefono || '—'}</td>
                    <td>{proveedor.email || '—'}</td>
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
                          onClick={() => eliminarProveedor(proveedor.id)}
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

      {/* Modal de formulario para crear/editar proveedores */}
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
 * Componente de formulario para crear/editar proveedores.
 * Se muestra como modal superpuesto a la página.
 */
function ProveedorForm({ proveedor, onGuardar, onCancelar }) {
  // Estado local del formulario
  const [formulario, setFormulario] = useState({
    nombre: proveedor?.nombre || '',
    contacto: proveedor?.contacto || '',
    telefono: proveedor?.telefono || '',
    email: proveedor?.email || '',
    direccion: proveedor?.direccion || '',
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
          <button className="modal-close" onClick={onCancelar}>
            ×
          </button>
        </div>

        <form onSubmit={manejarEnvio}>
          {/* Campo: Nombre del proveedor */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ingrese el nombre del proveedor"
              required
            />
          </div>

          {/* Campo: Persona de contacto */}
          <div className="form-group">
            <label htmlFor="contacto">Contacto</label>
            <input
              type="text"
              id="contacto"
              name="contacto"
              value={formulario.contacto}
              onChange={manejarCambio}
              placeholder="Nombre de la persona de contacto"
            />
          </div>

          {/* Campos de teléfono y email en fila */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formulario.telefono}
                onChange={manejarCambio}
                placeholder="Ej: 300 123 4567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formulario.email}
                onChange={manejarCambio}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          {/* Campo: Dirección */}
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

          {/* Botones de acción del formulario */}
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
