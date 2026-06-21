package com.zapateria.service;

import com.zapateria.model.Categoria;
import com.zapateria.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio que encapsula la lógica de negocio para la gestión de categorías.
 * Actúa como intermediario entre el controlador y el repositorio.
 */
@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    /**
     * Constructor para inyección de dependencias del repositorio.
     *
     * @param categoriaRepository repositorio de acceso a datos
     */
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    /**
     * Obtiene todas las categorías registradas en el sistema.
     *
     * @return lista completa de categorías
     */
    public List<Categoria> listarTodos() {
        return categoriaRepository.findAll();
    }

    /**
     * Busca una categoría por su identificador único.
     *
     * @param id identificador de la categoría
     * @return Optional con la categoría si existe
     */
    public Optional<Categoria> obtenerPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    /**
     * Registra una nueva categoría en el sistema.
     *
     * @param categoria datos de la categoría a crear
     * @return la categoría persistida con su ID asignado
     */
    public Categoria crear(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    /**
     * Actualiza los datos de una categoría existente.
     *
     * @param id identificador de la categoría a actualizar
     * @param categoriaActualizada nuevos datos de la categoría
     * @return la categoría actualizada
     * @throws RuntimeException si la categoría no existe
     */
    public Categoria actualizar(Long id, Categoria categoriaActualizada) {
        Categoria existente = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + id));

        existente.setNombre(categoriaActualizada.getNombre());
        existente.setDescripcion(categoriaActualizada.getDescripcion());

        return categoriaRepository.save(existente);
    }

    /**
     * Elimina una categoría del sistema por su identificador.
     *
     * @param id identificador de la categoría a eliminar
     * @throws RuntimeException si la categoría no existe
     */
    public void eliminar(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con id: " + id);
        }
        categoriaRepository.deleteById(id);
    }
}
