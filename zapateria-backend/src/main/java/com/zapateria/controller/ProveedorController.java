package com.zapateria.controller;

import com.zapateria.model.Proveedor;
import com.zapateria.service.ProveedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de proveedores.
 * Expone los endpoints CRUD bajo /api/proveedores
 * para operaciones de crear, consultar, actualizar y eliminar.
 */
@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    private final ProveedorService proveedorService;

    /**
     * Constructor que inyecta el servicio de proveedores.
     *
     * @param proveedorService servicio de negocio de Proveedor
     */
    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    /**
     * Lista todos los proveedores registrados.
     *
     * @return lista de proveedores con código HTTP 200
     */
    @GetMapping
    public ResponseEntity<List<Proveedor>> listar() {
        List<Proveedor> proveedores = proveedorService.listarTodos();
        return ResponseEntity.ok(proveedores);
    }

    /**
     * Consulta un proveedor por su ID.
     *
     * @param id identificador del proveedor a consultar
     * @return el proveedor encontrado o código HTTP 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtenerPorId(@PathVariable Long id) {
        return proveedorService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuevo proveedor.
     *
     * @param proveedor datos del proveedor a registrar
     * @return el proveedor creado con código HTTP 201
     */
    @PostMapping
    public ResponseEntity<Proveedor> crear(@RequestBody Proveedor proveedor) {
        Proveedor nuevo = proveedorService.crear(proveedor);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    /**
     * Actualiza los datos de un proveedor existente.
     *
     * @param id identificador del proveedor a actualizar
     * @param proveedor nuevos datos del proveedor
     * @return el proveedor actualizado o código HTTP 404 si no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizar(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        try {
            Proveedor actualizado = proveedorService.actualizar(id, proveedor);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Elimina un proveedor por su ID.
     *
     * @param id identificador del proveedor a eliminar
     * @return código HTTP 204 si se eliminó, o 404 si no existe
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            proveedorService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
