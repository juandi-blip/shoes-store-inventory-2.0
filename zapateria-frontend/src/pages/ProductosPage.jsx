import { useState, useEffect } from 'react'
import api from '../services/api'

/**
 * Página de gestión de productos.
 * Permite listar, crear, editar y eliminar productos del sistema.
 * Se conecta con la API REST del backend Spring Boot.
 * Proyecto SENA GA7-220501096-AA3-EV01 - Evidencia de aprendizaje.
 */
function ProductosPage() {
  // Estado para almacenar la lista de productos obtenida del backend
  const [productos, setProductos] = useState([])
  // Estado para controlar la visualización del spinner de carga
  const [loading, setLoading] = useState(true)
  // Estado para almacenar mensajes de error
  const [error, setError] = useState(null)
  // Estado para controlar la visibilidad del modal de formulario
  const [showModal, setShowModal] = useState(false)
  // Estado para almacenar el producto que se está editando (null = nuevo)
  const [productoActual, setProductoActual] = useState(null)
  // Estado para almacenar la lista de categorías (para el select)
  const [categorias, setCategorias] = useState([])
  // Estado para almacenar la lista de proveedores (para el select)
  const [proveedores, setProveedores] = useState([])

  /**
   * Efecto que se ejecuta al montar el componente.
   * Carga los productos, categorías y proveedores desde el backend.
   */
  useEffect(() => {
    cargarProductos()
    cargarCategorias()
    cargarProveedores()
  }, [])

  /**
   * Función para obtener todos los productos desde la API.
   * Maneja estados de carga y error.
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

  /**
   * Función para obtener todas las categorías desde la API.
   */
  const cargarCategorias = async () => {
    try {
      const respuesta = await api.get('/categorias')
      setCategorias(respuesta.data)
    } catch (err) {
      console.error('Error al obtener categorías:', err)
    }
  }

  /**
   * Función para obtener todos los proveedores desde la API.
   */
  const cargarProveedores = async () => {
    try {
      const respuesta = await api.get('/proveedores')
      setProveedores(respuesta.data)
    } catch (err) {
      console.error('Error al obtener proveedores:', err)
    }
  }

  /**
   * Función para eliminar un producto por su ID.
   * Solicita confirmación antes de proceder con la eliminación.
   * @param {number} id - Identificador del producto a eliminar
   */
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Está seguro de que desea eliminar este producto?')
    if (!confirmar) return

    try {
      await api.delete(`/productos/${id}`)
      // Actualizar la lista de productos después de eliminar
      setProductos(productos.filter(p => p.id !== id))
    } catch (err) {
      setError('Error al eliminar el producto.')
      console.error('Error al eliminar producto:', err)
    }
  }

  /**
   * Función para abrir el modal con los datos de un producto existente.
   * @param {Object} producto - Objeto producto a editar
   */
  const abrirEditar = (producto) => {
    setProductoActual(producto)
    setShowModal(true)
  }

  /**
   * Función para abrir el modal vacío para crear un nuevo producto.
   */
  const abrirCrear = () => {
    setProductoActual(null)
    setShowModal(true)
  }

  /**
   * Función para guardar un producto (crear o actualizar).
   * @param {Object} datosProducto - Datos del producto a guardar
   */
  const guardarProducto = async (datosProducto) => {
    try {
      if (productoActual && productoActual.id) {
        // Actualizar producto existente
        await api.put(`/productos/${productoActual.id}`, datosProducto)
      } else {
        // Crear nuevo producto
        await api.post('/productos', datosProducto)
      }
      // Recargar la lista de productos
      await cargarProductos()
      setShowModal(false)
      setProductoActual(null)
    } catch (err) {
      setError('Error al guardar el producto.')
      console.error('Error al guardar producto:', err)
    }
  }

  /**
   * Función auxiliar para obtener el nombre de una categoría por su ID.
   * @param {number} id - Identificador de la categoría
   * @returns {string} Nombre de la categoría o 'N/A'
   */
  const obtenerNombreCategoria = (id) => {
    const categoria = categorias.find(c => c.id === id)
    return categoria ? categoria.nombre : 'N/A'
  }

  /**
   * Función auxiliar para obtener el nombre de un proveedor por su ID.
   * @param {number} id - Identificador del proveedor
   * @returns {string} Nombre del proveedor o 'N/A'
   */
  const obtenerNombreProveedor = (id) => {
    const proveedor = proveedores.find(p => p.id === id)
    return proveedor ? proveedor.nombre : 'N/A'
  }

  // Renderizado del componente
  return (
    <div>
      {/* Encabezado de la página con botón para agregar nuevo producto */}
      <div className="page-header">
        <h1 className="page-title">Productos</h1>
        <button className="btn btn-primary" onClick={abrirCrear}>
          + Nuevo Producto
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
        <div className="loading">Cargando productos...</div>
      ) : (
        /* Tabla de productos */
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
                  <td colSpan="10" className="empty-message">
                    No hay productos registrados.
                  </td>
                </tr>
              ) : (
                productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion || '—'}</td>
                    <td>${producto.precio?.toLocaleString() || '0'}</td>
                    <td>{producto.stock || 0}</td>
                    <td>{producto.talla || '—'}</td>
                    <td>{producto.color || '—'}</td>
                    <td>{obtenerNombreCategoria(producto.categoriaId)}</td>
                    <td>{obtenerNombreProveedor(producto.proveedorId)}</td>
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
                          onClick={() => eliminarProducto(producto.id)}
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

      {/* Modal de formulario para crear/editar productos */}
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
 * Componente de formulario para crear/editar productos.
 * Se muestra como modal superpuesto a la página.
 */
function ProductoForm({ producto, categorias, proveedores, onGuardar, onCancelar }) {
  // Estado local del formulario
  const [formulario, setFormulario] = useState({
    nombre: producto?.nombre || '',
    descripcion: producto?.descripcion || '',
    precio: producto?.precio || '',
    stock: producto?.stock || '',
    talla: producto?.talla || '',
    color: producto?.color || '',
    categoriaId: producto?.categoriaId || '',
    proveedorId: producto?.proveedorId || '',
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
      alert('El nombre del producto es obligatorio.')
      return
    }
    onGuardar(formulario)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {producto ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button className="modal-close" onClick={onCancelar}>
            ×
          </button>
        </div>

        <form onSubmit={manejarEnvio}>
          {/* Campo: Nombre del producto */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ingrese el nombre del producto"
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
              placeholder="Ingrese la descripción del producto"
            />
          </div>

          {/* Campos de precio y stock en fila */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formulario.precio}
                onChange={manejarCambio}
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
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

          {/* Campos de talla y color en fila */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="talla">Talla</label>
              <input
                type="text"
                id="talla"
                name="talla"
                value={formulario.talla}
                onChange={manejarCambio}
                placeholder="Ej: 42"
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
                placeholder="Ej: Negro"
              />
            </div>
          </div>

          {/* Selector de categoría */}
          <div className="form-group">
            <label htmlFor="categoriaId">Categoría</label>
            <select
              id="categoriaId"
              name="categoriaId"
              value={formulario.categoriaId}
              onChange={manejarCambio}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de proveedor */}
          <div className="form-group">
            <label htmlFor="proveedorId">Proveedor</label>
            <select
              id="proveedorId"
              name="proveedorId"
              value={formulario.proveedorId}
              onChange={manejarCambio}
            >
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botones de acción del formulario */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {producto ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductosPage
