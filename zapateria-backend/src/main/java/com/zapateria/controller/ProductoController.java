package com.zapateria.controller;

import com.zapateria.model.Producto;
import com.zapateria.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de productos (zapatos) en la zapatería.
 * Expone los endpoints del API para realizar operaciones CRUD sobre productos.
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    /** Servicio de productos inyectado por constructor */
    private final ProductoService productoService;

    /**
     * Constructor para inyección de dependencias del servicio.
     *
     * @param productoService servicio de lógica de negocio
     */
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * Lista todos los productos registrados en el sistema.
     *
     * @return ResponseEntity con la lista de productos y código 200
     */
    @GetMapping
    public ResponseEntity<List<Producto>> listar() {
        List<Producto> productos = productoService.listarTodos();
        return ResponseEntity.ok(productos);
    }

    /**
     * Busca un producto por su identificador único.
     *
     * @param id identificador del producto a buscar
     * @return ResponseEntity con el producto y código 200, o código 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuevo producto en el sistema.
     *
     * @param producto datos del producto a crear
     * @return ResponseEntity con el producto creado y código 201
     */
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        Producto productoCreado = productoService.crear(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
    }

    /**
     * Actualiza los datos de un producto existente.
     *
     * @param id identificador del producto a actualizar
     * @param producto datos actualizados del producto
     * @return ResponseEntity con el producto actualizado y código 200,
     *         o código 404 si no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        Producto productoActualizado = productoService.actualizar(id, producto);

        if (productoActualizado != null) {
            return ResponseEntity.ok(productoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Elimina un producto del sistema por su identificador.
     *
     * @param id identificador del producto a eliminar
     * @return ResponseEntity con código 204 si se eliminó, o código 404 si no existe
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = productoService.eliminar(id);

        if (eliminado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
