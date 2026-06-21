package com.zapateria.service;

import com.zapateria.model.Proveedor;
import com.zapateria.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la gestión de proveedores.
 * Encapsula la lógica de acceso a datos y validaciones
 * sobre la entidad Proveedor.
 */
@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    /**
     * Constructor que inyecta el repositorio de proveedores.
     *
     * @param proveedorRepository repositorio JPA de Proveedor
     */
    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    /**
     * Obtiene la lista completa de proveedores registrados.
     *
     * @return lista con todos los proveedores
     */
    public List<Proveedor> listarTodos() {
        return proveedorRepository.findAll();
    }

    /**
     * Consulta un proveedor por su identificador único.
     *
     * @param id identificador del proveedor a buscar
     * @return Optional con el proveedor encontrado, o vacío si no existe
     */
    public Optional<Proveedor> obtenerPorId(Long id) {
        return proveedorRepository.findById(id);
    }

    /**
     * Registra un nuevo proveedor en el sistema.
     *
     * @param proveedor datos del proveedor a crear
     * @return el proveedor creado con su ID asignado
     */
    public Proveedor crear(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    /**
     * Actualiza los datos de un proveedor existente.
     * Si el proveedor no se encuentra, lanza una excepción.
     *
     * @param id identificador del proveedor a actualizar
     * @param proveedorActualizado nuevos datos del proveedor
     * @return el proveedor actualizado
     */
    public Proveedor actualizar(Long id, Proveedor proveedorActualizado) {
        Proveedor existente = proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + id));

        existente.setNombre(proveedorActualizado.getNombre());
        existente.setContacto(proveedorActualizado.getContacto());
        existente.setTelefono(proveedorActualizado.getTelefono());
        existente.setEmail(proveedorActualizado.getEmail());
        existente.setDireccion(proveedorActualizado.getDireccion());

        return proveedorRepository.save(existente);
    }

    /**
     * Elimina un proveedor del sistema por su identificador.
     * Si el proveedor no se encuentra, lanza una excepción.
     *
     * @param id identificador del proveedor a eliminar
     */
    public void eliminar(Long id) {
        if (!proveedorRepository.existsById(id)) {
            throw new RuntimeException("Proveedor no encontrado con id: " + id);
        }
        proveedorRepository.deleteById(id);
    }
}
