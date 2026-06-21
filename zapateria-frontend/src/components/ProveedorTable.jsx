/**
 * Componente de tabla para mostrar la lista de proveedores.
 * 
 * Renderiza una tabla con los campos de cada proveedor:
 * - ID
 * - Nombre
 * - Contacto
 * - Teléfono
 * - Email
 * - Dirección
 * - Botones de editar y eliminar
 * 
 * @param {Array} proveedores - Lista de proveedores a mostrar
 * @param {Function} onEdit - Callback al hacer clic en editar
 * @param {Function} onDelete - Callback al hacer clic en eliminar
 */
function ProveedorTable({ proveedores, onEdit, onDelete }) {
  // Mostrar mensaje cuando no hay proveedores registrados
  if (!proveedores || proveedores.length === 0) {
    return <p className="no-data">No hay proveedores registrados</p>
  }

  return (
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
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.id}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.contacto || '-'}</td>
              <td>{proveedor.telefono || '-'}</td>
              <td>{proveedor.email || '-'}</td>
              <td>{proveedor.direccion || '-'}</td>
              <td className="acciones">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(proveedor)}
                  title="Editar proveedor"
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(proveedor.id)}
                  title="Eliminar proveedor"
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

export default ProveedorTable
