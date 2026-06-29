/**
 * Componente de tabla para mostrar la lista de productos.
 * 
 * Renderiza una tabla con todos los campos del producto incluyendo:
 * - Información básica (nombre, descripción, precio, stock)
 * - Detalles (talla, color)
 * - Categoría y proveedor asociados
 * - Formato de precio en pesos colombianos (COP)
 * - Botones de editar y eliminar
 * 
 * @param {Array} productos - Lista de productos a mostrar
 * @param {Function} onEdit - Callback al hacer clic en editar
 * @param {Function} onDelete - Callback al hacer clic en eliminar
 */
function ProductoTable({ productos, onEdit, onDelete }) {
  /**
   * Formatea un valor numérico como moneda colombiana (COP)
   * @param {number} valor - Valor numérico a formatear
   * @returns {string} Valor formateado como "$ 1.234.567"
   */
  const formatCurrency = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor)
  }

  // Mostrar mensaje cuando no hay productos registrados
  if (!productos || productos.length === 0) {
    return <p className="no-data">No hay productos registrados</p>
  }

  return (
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
          {productos.map((producto) => (
            <tr key={producto.idProducto}>
              <td>{producto.idProducto}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion || '-'}</td>
              {/* Precio formateado en pesos colombianos */}
              <td>{formatCurrency(producto.precio)}</td>
              {/* Indicador visual de stock bajo */}
              <td className={producto.stock <= 5 ? 'stock-bajo' : ''}>
                {producto.stock}
              </td>
              <td>{producto.talla || '-'}</td>
              <td>{producto.color || '-'}</td>
              {/* Nombre de la categoría asociada */}
              <td>{producto.categoria?.nombre || '-'}</td>
              {/* Nombre del proveedor asociado */}
              <td>{producto.proveedor?.nombre || '-'}</td>
              <td className="acciones">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(producto)}
                  title="Editar producto"
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(producto.idProducto)}
                  title="Eliminar producto"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductoTable
