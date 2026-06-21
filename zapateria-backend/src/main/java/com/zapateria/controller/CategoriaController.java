package com.zapateria.controller;

import com.zapateria.model.Categoria;
import com.zapateria.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de categorías.
 * Expone los endpoints CRUD bajo /api/categorias.
 */
@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    /**
     * Constructor para inyección de dependencias del servicio.
     *
     * @param categoriaService servicio de lógica de negocio
     */
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    /**
     * Lista todas las categorías registradas.
     *
     * @return lista de categorías con código 200 OK
     */
    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {
        List<Categoria> categorias = categoriaService.listarTodos();
        return ResponseEntity.ok(categorias);
    }

    /**
     * Consulta una categoría por su ID.
     *
     * @param id identificador de la categoría
     * @return la categoría encontrada (200) o error 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(@PathVariable Long id) {
        return categoriaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea una nueva categoría.
     *
     * @param categoria datos de la categoría a registrar
     * @return la categoría creada con código 201 Created
     */
    @PostMapping
    public ResponseEntity<Categoria> crear(@RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaService.crear(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCategoria);
    }

    /**
     * Actualiza una categoría existente.
     *
     * @param id identificador de la categoría a actualizar
     * @param categoriaActualizada nuevos datos de la categoría
     * @return la categoría actualizada (200) o error 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(@PathVariable Long id,
                                                @RequestBody Categoria categoriaActualizada) {
        try {
            Categoria categoria = categoriaService.actualizar(id, categoriaActualizada);
            return ResponseEntity.ok(categoria);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Elimina una categoría por su ID.
     *
     * @param id identificador de la categoría a eliminar
     * @return código 204 No Content si se eliminó, o 404 si no existe
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            categoriaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
