package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.Furniture;
import com.project.carpentryshop.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ProductRepo extends CrudRepository<Product, Long> {

    Product findTopByOrderByIdDesc();

}
