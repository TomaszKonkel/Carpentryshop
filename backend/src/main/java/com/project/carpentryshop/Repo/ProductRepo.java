package com.project.carpentryshop.Repo;


import com.project.carpentryshop.entity.Assigment;
import com.project.carpentryshop.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ProductRepo extends CrudRepository<Product, Long> {
    Product findTopByOrderByIdDesc();


}
