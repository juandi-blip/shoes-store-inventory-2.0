/**
 * Componente de tabla para mostrar la lista de categorías.
 *
 * Renderiza una tabla con los campos de cada categoría:
 * - ID (idCategoria)
 * - Nombre
 * - Botones de editar y eliminar
 *
 * Nota: el modelo Categoria en el backend solo tiene idCategoria y nombre.
 * La columna 'Descripción' fue eliminada porque no existe en la entidad JPA.
 *
 * @param {Array}    categorias - Lista de categorías a mostrar
 * @param {Function} onEdit     - Callback al hacer clic en editar
 * @param {Function} onDelete   - Callback al hacer clic en eliminar
 */
function CategoriaTable({ categorias, onEdit, onDelete }) {
  // Mostrar mensaje cuando no hay categorías registradas
  if (!categorias || categorias.length === 0) {
    return <p className="no-data">No hay categorías registradas</p>
  }

  return (
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
          {categorias.map((categoria) => (
            // Se usa idCategoria como key (campo real del backend)
            <tr key={categoria.idCategoria}>
              <td>{categoria.idCategoria}</td>
              <td>{categoria.nombre}</td>
              <td className="acciones">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(categoria)}
                  title="Editar categoría"
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(categoria.idCategoria)}
                  title="Eliminar categoría"
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

export default CategoriaTable
