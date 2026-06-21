package com.zapateria.repository;

import com.zapateria.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Producto. Proporciona operaciones CRUD
 * básicas y consultas personalizadas para la gestión de productos
 * en la zapatería.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busca productos cuyo nombre contenga el texto especificado.
     * Utiliza la consulta derivada de Spring Data JPA.
     *
     * @param nombre texto a buscar dentro del nombre del producto
     * @return lista de productos que coinciden con la búsqueda
     */
    List<Producto> findByNombreContaining(String nombre);
}
