import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Componente de formulario para crear o editar productos.
 * 
 * Gestiona el formulario completo de productos incluyendo:
 * - Campos básicos del producto (nombre, precio, stock, etc.)
 * - Selección de categoría y proveedor mediante desplegables
 * - Validación de campos obligatorios
 * - Peticiones POST (crear) y PUT (actualizar) al backend
 * 
 * @param {Function} onSubmit - Callback ejecutado al enviar exitosamente el formulario
 * @param {Object|null} producto - Producto a editar (null para crear nuevo)
 * @param {Function} onCancel - Callback para cancelar la operación
 */
function ProductoForm({ onSubmit, producto, onCancel }) {
  // Estado del formulario con valores por defecto
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    talla: '',
    color: '',
    imagenUrl: '',
    categoriaId: '',
    proveedorId: '',
  })

  // Listas de categorías y proveedores para los desplegables
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])

  // Estado para mensajes de error
  const [error, setError] = useState('')

  /**
   * Carga las categorías y proveedores disponibles desde la API
   * para poblar los desplegables del formulario
   */
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resCategorias, resProveedores] = await Promise.all([
          api.get('/categorias'),
          api.get('/proveedores'),
        ])
        setCategorias(resCategorias.data)
        setProveedores(resProveedores.data)
      } catch (err) {
        setError('Error al cargar categorías y proveedores')
      }
    }
    cargarDatos()
  }, [])

  /**
   * Efecto para cargar los datos del producto cuando se edita
   * Se ejecuta cuando cambia la prop 'producto'
   */
  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        talla: producto.talla || '',
        color: producto.color || '',
        imagenUrl: producto.imagenUrl || '',
        categoriaId: producto.categoria?.idCategoria || producto.categoriaId || '',
        proveedorId: producto.proveedor?.idProveedor || producto.proveedorId || '',
      })
    }
  }, [producto])

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado formData con el nuevo valor del campo modificado
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Valida que todos los campos obligatorios estén completos
   * @returns {boolean} true si la validación pasa
   */
  const validarCampos = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio')
      return false
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError('El precio debe ser un valor positivo')
      return false
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      setError('El stock no puede ser negativo')
      return false
    }
    if (!formData.categoriaId) {
      setError('Debe seleccionar una categoría')
      return false
    }
    if (!formData.proveedorId) {
      setError('Debe seleccionar un proveedor')
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
      // Preparar payload con tipos de datos correctos y estructura anidada que espera el backend
      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        talla: formData.talla || null,
        color: formData.color || null,
        imagenUrl: formData.imagenUrl || null,
        categoria: { idCategoria: parseInt(formData.categoriaId) },
        proveedor: { idProveedor: parseInt(formData.proveedorId) },
      }

      if (producto && producto.idProducto) {
        // Actualizar producto existente con PUT
        await api.put(`/productos/${producto.idProducto}`, payload)
      } else {
        // Crear nuevo producto con POST
        await api.post('/productos', payload)
      }

      onSubmit()
    } catch (err) {
      setError('Error al guardar el producto. Verifique los datos.')
    }
  }

  return (
    <div className="form-container">
      <h3>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h3>

      {/* Mensaje de error global del formulario */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre del producto */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre del producto"
          />
        </div>

        {/* Campo: Descripción del producto */}
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada del producto"
            rows="3"
          />
        </div>

        {/* Campo: Precio en pesos colombianos */}
        <div className="form-group">
          <label htmlFor="precio">Precio (COP) *</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="100"
          />
        </div>

        {/* Campo: Stock disponible */}
        <div className="form-group">
          <label htmlFor="stock">Stock *</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>

        {/* Campo: Talla del calzado */}
        <div className="form-group">
          <label htmlFor="talla">Talla</label>
          <input
            type="text"
            id="talla"
            name="talla"
            value={formData.talla}
            onChange={handleChange}
            placeholder="Ej: 40, 42, M, L"
          />
        </div>

        {/* Campo: Color del producto */}
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Ej: Negro, Blanco"
          />
        </div>

        {/* Campo: URL de imagen del producto */}
        <div className="form-group">
          <label htmlFor="imagenUrl">URL de Imagen</label>
          <input
            type="text"
            id="imagenUrl"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Desplegable: Categoría del producto */}
        <div className="form-group">
          <label htmlFor="categoriaId">Categoría *</label>
          <select
            id="categoriaId"
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Desplegable: Proveedor del producto */}
        <div className="form-group">
          <label htmlFor="proveedorId">Proveedor *</label>
          <select
            id="proveedorId"
            name="proveedorId"
            value={formData.proveedorId}
            onChange={handleChange}
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.idProveedor} value={prov.idProveedor}>
                {prov.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botones de acción del formulario */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {producto ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductoForm
