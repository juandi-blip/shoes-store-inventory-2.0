import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Componente de formulario para crear o editar categorías.
 * 
 * Gestiona el formulario de categorías con campos:
 * - Nombre (obligatorio)
 * - Descripción (opcional)
 * 
 * Realiza validación de campos obligatorios antes de enviar
 * y peticiones POST (crear) o PUT (actualizar) al backend.
 * 
 * @param {Function} onSubmit - Callback ejecutado al enviar exitosamente
 * @param {Object|null} categoria - Categoría a editar (null para crear nueva)
 * @param {Function} onCancel - Callback para cancelar la operación
 */
function CategoriaForm({ onSubmit, categoria, onCancel }) {
  // Estado del formulario con valores por defecto vacíos
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  })

  // Estado para mensajes de error de validación
  const [error, setError] = useState('')

  /**
   * Efecto para cargar los datos de la categoría cuando se edita
   * Se ejecuta cuando cambia la prop 'categoria'
   */
  useEffect(() => {
    if (categoria) {
      setFormData({
        nombre: categoria.nombre || '',
        descripcion: categoria.descripcion || '',
      })
    }
  }, [categoria])

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
      setError('El nombre de la categoría es obligatorio')
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
      if (categoria && categoria.id) {
        // Actualizar categoría existente con PUT
        await api.put(`/categorias/${categoria.id}`, formData)
      } else {
        // Crear nueva categoría con POST
        await api.post('/categorias', formData)
      }

      onSubmit()
    } catch (err) {
      setError('Error al guardar la categoría. Verifique los datos.')
    }
  }

  return (
    <div className="form-container">
      <h3>{categoria ? 'Editar Categoría' : 'Nueva Categoría'}</h3>

      {/* Mensaje de error del formulario */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre de la categoría */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Deportivos, Formales, Casuales"
          />
        </div>

        {/* Campo: Descripción de la categoría */}
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la categoría"
            rows="3"
          />
        </div>

        {/* Botones de acción del formulario */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {categoria ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CategoriaForm
