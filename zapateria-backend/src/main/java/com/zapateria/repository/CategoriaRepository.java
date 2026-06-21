package com.zapateria.repository;

import com.zapateria.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Categoria.
 * Proporciona operaciones CRUD básicas y consultas personalizadas
 * sobre la tabla de categorías.
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    /**
     * Busca categorías cuyo nombre contenga el texto indicado.
     * Utiliza la consulta derivada de Spring Data JPA.
     *
     * @param nombre texto a buscar dentro del nombre de la categoría
     * @return lista de categorías que coinciden con el criterio
     */
    List<Categoria> findByNombreContaining(String nombre);
}
