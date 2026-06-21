import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Componente de formulario para crear o editar proveedores.
 * 
 * Gestiona el formulario de proveedores con campos:
 * - Nombre (obligatorio)
 * - Contacto (opcional)
 * - Teléfono (opcional)
 * - Email (opcional)
 * - Dirección (opcional)
 * 
 * Realiza validación de campos obligatorios antes de enviar
 * y peticiones POST (crear) o PUT (actualizar) al backend.
 * 
 * @param {Function} onSubmit - Callback ejecutado al enviar exitosamente
 * @param {Object|null} proveedor - Proveedor a editar (null para crear nuevo)
 * @param {Function} onCancel - Callback para cancelar la operación
 */
function ProveedorForm({ onSubmit, proveedor, onCancel }) {
  // Estado del formulario con valores por defecto vacíos
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: '',
  })

  // Estado para mensajes de error de validación
  const [error, setError] = useState('')

  /**
   * Efecto para cargar los datos del proveedor cuando se edita
   * Se ejecuta cuando cambia la prop 'proveedor'
   */
  useEffect(() => {
    if (proveedor) {
      setFormData({
        nombre: proveedor.nombre || '',
        contacto: proveedor.contacto || '',
        telefono: proveedor.telefono || '',
        email: proveedor.email || '',
        direccion: proveedor.direccion || '',
      })
    }
  }, [proveedor])

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado formData con el valor del campo modificado
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Valida que los campos obligatorios estén completos
   * @returns {boolean} true si la validación pasa
   */
  const validarCampos = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre del proveedor es obligatorio')
      return false
    }
    setError('')
    return true
  }

  /**
   * Maneja el envío del formulario
   * Realiza validación, envía datos al backend y notifica al componente padre
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validarCampos()) return

    try {
      if (proveedor && proveedor.id) {
        // Actualizar proveedor existente con PUT
        await api.put(`/proveedores/${proveedor.id}`, formData)
      } else {
        // Crear nuevo proveedor con POST
        await api.post('/proveedores', formData)
      }

      onSubmit()
    } catch (err) {
      setError('Error al guardar el proveedor. Verifique los datos.')
    }
  }

  return (
    <div className="form-container">
      <h3>{proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>

      {/* Mensaje de error del formulario */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre del proveedor */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Nike, Adidas, Reebok"
          />
        </div>

        {/* Campo: Persona de contacto */}
        <div className="form-group">
          <label htmlFor="contacto">Contacto</label>
          <input
            type="text"
            id="contacto"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            placeholder="Nombre de la persona de contacto"
          />
        </div>

        {/* Campo: Teléfono */}
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej: 300 123 4567"
          />
        </div>

        {/* Campo: Correo electrónico */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
        </div>

        {/* Campo: Dirección */}
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección del proveedor"
          />
        </div>

        {/* Botones de acción del formulario */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {proveedor ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProveedorForm
