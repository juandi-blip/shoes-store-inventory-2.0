/**
 * Componente de tabla para mostrar la lista de proveedores.
 *
 * Renderiza una tabla con los campos reales del backend:
 * - ID (idProveedor)
 * - Nombre
 * - Teléfono
 * - Dirección
 * - Botones de editar y eliminar
 *
 * Nota: las columnas 'Contacto' y 'Email' fueron eliminadas porque esos
 * campos no existen en la entidad JPA Proveedor del backend.
 *
 * @param {Array}    proveedores - Lista de proveedores a mostrar
 * @param {Function} onEdit      - Callback al hacer clic en editar
 * @param {Function} onDelete    - Callback al hacer clic en eliminar
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
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            // Se usa idProveedor como key (campo real del backend)
            <tr key={proveedor.idProveedor}>
              <td>{proveedor.idProveedor}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.telefono || '-'}</td>
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
                  onClick={() => onDelete(proveedor.idProveedor)}
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
