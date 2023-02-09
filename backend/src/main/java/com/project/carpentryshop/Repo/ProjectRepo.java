package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo extends ProductRepo {
Optional<Product> findById(Long id);
}
