package com.zapateria.service;

import com.zapateria.model.Producto;
import com.zapateria.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio que contiene la lógica de negocio para la gestión
 * de productos en la zapatería. Maneja las operaciones CRUD
 * y valida las reglas de negocio antes de interactuar con el repositorio.
 */
@Service
public class ProductoService {

    /** Repositorio de productos inyectado por constructor */
    private final ProductoRepository productoRepository;

    /**
     * Constructor para inyección de dependencias del repositorio.
     *
     * @param productoRepository repositorio de acceso a datos
     */
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Obtiene la lista de todos los productos registrados.
     *
     * @return lista completa de productos
     */
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    /**
     * Busca un producto por su identificador único.
     *
     * @param id identificador del producto a buscar
     * @return Optional con el producto encontrado o vacío si no existe
     */
    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    /**
     * Crea un nuevo producto en la base de datos.
     *
     * @param producto datos del producto a crear
     * @return el producto creado con su ID asignado
     */
    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }

    /**
     * Actualiza los datos de un producto existente.
     * Si el producto no se encuentra, retorna null.
     *
     * @param id identificador del producto a actualizar
     * @param productoDatos nuevos datos del producto
     * @return el producto actualizado, o null si no existe
     */
    public Producto actualizar(Long id, Producto productoDatos) {
        Optional<Producto> optionalProducto = productoRepository.findById(id);

        if (optionalProducto.isPresent()) {
            Producto producto = optionalProducto.get();
            producto.setNombre(productoDatos.getNombre());
            producto.setDescripcion(productoDatos.getDescripcion());
            producto.setPrecio(productoDatos.getPrecio());
            producto.setStock(productoDatos.getStock());
            producto.setTalla(productoDatos.getTalla());
            producto.setColor(productoDatos.getColor());
            producto.setImagenUrl(productoDatos.getImagenUrl());
            producto.setCategoria(productoDatos.getCategoria());
            producto.setProveedor(productoDatos.getProveedor());
            return productoRepository.save(producto);
        }

        return null;
    }

    /**
     * Elimina un producto por su identificador.
     *
     * @param id identificador del producto a eliminar
     * @return true si se eliminó correctamente, false si no existía
     */
    public boolean eliminar(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
