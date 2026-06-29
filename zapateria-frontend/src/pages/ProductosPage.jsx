import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Página de gestión de productos (inventario de calzado).
 * Permite listar, crear, editar y eliminar productos del sistema.
 * Se conecta con la API REST del backend Spring Boot.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function ProductosPage() {
  // Lista de productos cargada desde el backend
  const [productos, setProductos] = useState([])
  // Indicador de carga inicial
  const [loading, setLoading] = useState(true)
  // Mensaje de error si falla alguna operación
  const [error, setError] = useState(null)
  // Controla la visibilidad del modal de formulario
  const [showModal, setShowModal] = useState(false)
  // Producto en edición (null = nuevo)
  const [productoActual, setProductoActual] = useState(null)
  // Listas de categorías y proveedores para los selectores del formulario
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])

  /**
   * Carga inicial de datos al montar el componente.
   */
  useEffect(() => {
    cargarProductos()
    cargarCategorias()
    cargarProveedores()
  }, [])

  /**
   * Obtiene todos los productos desde la API REST.
   */
  const cargarProductos = async () => {
    try {
      setLoading(true)
      const respuesta = await api.get('/productos')
      setProductos(respuesta.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los productos. Verifique que el backend esté ejecutándose.')
      console.error('Error al obtener productos:', err)
    } finally {
      setLoading(false)
    }
  }

  /** Obtiene todas las categorías para el selector del formulario. */
  const cargarCategorias = async () => {
    try {
      const respuesta = await api.get('/categorias')
      setCategorias(respuesta.data)
    } catch (err) {
      console.error('Error al obtener categorías:', err)
    }
  }

  /** Obtiene todos los proveedores para el selector del formulario. */
  const cargarProveedores = async () => {
    try {
      const respuesta = await api.get('/proveedores')
      setProveedores(respuesta.data)
    } catch (err) {
      console.error('Error al obtener proveedores:', err)
    }
  }

  /**
   * Elimina un producto tras confirmación del usuario.
   * @param {number} id - ID del producto a eliminar
   */
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar este producto?')
    if (!confirmar) return

    try {
      await api.delete(`/productos/${id}`)
      setProductos(productos.filter(p => p.idProducto !== id))
    } catch (err) {
      setError('Error al eliminar el producto.')
      console.error('Error al eliminar producto:', err)
    }
  }

  /** Abre el modal en modo edición con los datos del producto seleccionado. */
  const abrirEditar = (producto) => {
    setProductoActual(producto)
    setShowModal(true)
  }

  /** Abre el modal en modo creación (formulario vacío). */
  const abrirCrear = () => {
    setProductoActual(null)
    setShowModal(true)
  }

  /**
   * Guarda un producto nuevo o actualiza uno existente.
   * @param {Object} datosProducto - Datos del formulario
   */
  const guardarProducto = async (datosProducto) => {
    try {
      if (productoActual && productoActual.idProducto) {
        await api.put(`/productos/${productoActual.idProducto}`, datosProducto)
      } else {
        await api.post('/productos', datosProducto)
      }
      await cargarProductos()
      setShowModal(false)
      setProductoActual(null)
    } catch (err) {
      setError('Error al guardar el producto.')
      console.error('Error al guardar producto:', err)
    }
  }

  /**
   * Formatea un valor numérico como moneda colombiana (COP).
   * @param {number} valor - Monto a formatear
   * @returns {string} Valor formateado, ej. "$ 1.234.567"
   */
  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor)
  }

  return (
    <div>
      {/* Encabezado con título y botón de acción */}
      <div className="page-header">
        <h1 className="page-title">Inventario de Calzado</h1>
        <button className="btn btn-primary" onClick={abrirCrear}>
          + Registrar Modelo
        </button>
      </div>

      {/* Alerta de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Tabla de productos o estado de carga */}
      {loading ? (
        <div className="loading">Cargando inventario...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Talla</th>
                <th>Color</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="10" className="empty-state-cell">
                    <p className="empty-state-text">
                      No hay productos registrados en el inventario.
                    </p>
                    <button className="btn btn-secondary" onClick={abrirCrear}>
                      Comenzar a añadir
                    </button>
                  </td>
                </tr>
              ) : (
                productos.map((producto) => (
                  <tr key={producto.idProducto}>
                    <td>{producto.idProducto}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion || '—'}</td>
                    <td>{formatearPrecio(producto.precio)}</td>
                    <td>{producto.stock ?? 0}</td>
                    <td>{producto.talla || '—'}</td>
                    <td>{producto.color || '—'}</td>
                    <td>{producto.categoria?.nombre || '—'}</td>
                    <td>{producto.proveedor?.nombre || '—'}</td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => abrirEditar(producto)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProducto(producto.idProducto)}
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

      {/* Modal de formulario para crear / editar producto */}
      {showModal && (
        <ProductoForm
          producto={productoActual}
          categorias={categorias}
          proveedores={proveedores}
          onGuardar={guardarProducto}
          onCancelar={() => {
            setShowModal(false)
            setProductoActual(null)
          }}
        />
      )}
    </div>
  )
}

/**
 * Formulario modal para crear o editar un producto.
 * @param {Object} producto - Producto a editar (null si es nuevo)
 * @param {Array}  categorias - Lista de categorías disponibles
 * @param {Array}  proveedores - Lista de proveedores disponibles
 * @param {Function} onGuardar - Callback al confirmar el formulario
 * @param {Function} onCancelar - Callback al cancelar
 */
function ProductoForm({ producto, categorias, proveedores, onGuardar, onCancelar }) {
  // Estado del formulario inicializado con los datos del producto (si existe)
  const [formulario, setFormulario] = useState({
    nombre:      producto?.nombre || '',
    descripcion: producto?.descripcion || '',
    precio:      producto?.precio || '',
    stock:       producto?.stock || '',
    talla:       producto?.talla || '',
    color:       producto?.color || '',
    imagenUrl:   producto?.imagenUrl || '',
    idCategoria: producto?.categoria?.idCategoria || '',
    idProveedor: producto?.proveedor?.idProveedor || '',
  })

  /** Actualiza el estado del formulario ante cualquier cambio de campo. */
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario(prev => ({ ...prev, [name]: value }))
  }

  /** Valida y envía el formulario al componente padre. */
  const manejarEnvio = (e) => {
    e.preventDefault()
    if (!formulario.nombre.trim()) {
      alert('El nombre del producto es obligatorio.')
      return
    }
    // Construye el payload con los tipos de datos correctos para la API
    const payload = {
      nombre:      formulario.nombre,
      descripcion: formulario.descripcion,
      precio:      parseFloat(formulario.precio) || 0,
      stock:       parseInt(formulario.stock) || 0,
      talla:       formulario.talla || null,
      color:       formulario.color || null,
      imagenUrl:   formulario.imagenUrl || null,
      categoria:   { idCategoria: parseInt(formulario.idCategoria) },
      proveedor:   { idProveedor: parseInt(formulario.idProveedor) },
    }
    onGuardar(payload)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Encabezado del modal */}
        <div className="modal-header">
          <h2 className="modal-title">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button className="modal-close" onClick={onCancelar}>×</button>
        </div>

        <form onSubmit={manejarEnvio}>
          <div className="form-body">
            {/* Nombre del calzado */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Calzado *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Ej. Air Max 90 Black"
                required
              />
            </div>

            {/* Descripción */}
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                placeholder="Ej. Silueta retro, cámara de aire visible, amortiguación premium..."
              />
            </div>

            {/* Talla y Color en dos columnas */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="talla">Talla</label>
                <input
                  type="text"
                  id="talla"
                  name="talla"
                  value={formulario.talla}
                  onChange={manejarCambio}
                  placeholder="Ej. 38, 40, 42"
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formulario.color}
                  onChange={manejarCambio}
                  placeholder="Ej. Negro, Blanco"
                />
              </div>
            </div>

            {/* URL de imagen */}
            <div className="form-group">
              <label htmlFor="imagenUrl">URL de Imagen</label>
              <input
                type="text"
                id="imagenUrl"
                name="imagenUrl"
                value={formulario.imagenUrl}
                onChange={manejarCambio}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            {/* Precio y Stock en dos columnas */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="precio">Precio (COP) *</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  placeholder="0.00"
                  min="0"
                  step="100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock Inicial *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formulario.stock}
                  onChange={manejarCambio}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Categoría y Proveedor en dos columnas */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="idCategoria">Categoría *</label>
                <select
                  id="idCategoria"
                  name="idCategoria"
                  value={formulario.idCategoria}
                  onChange={manejarCambio}
                >
                  <option value="">Seleccione...</option>
                  {categorias.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="idProveedor">Proveedor *</label>
                <select
                  id="idProveedor"
                  name="idProveedor"
                  value={formulario.idProveedor}
                  onChange={manejarCambio}
                >
                  <option value="">Seleccione...</option>
                  {proveedores.map((prov) => (
                    <option key={prov.idProveedor} value={prov.idProveedor}>
                      {prov.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {producto ? 'Actualizar' : 'Guardar Calzado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductosPage
