package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.Cart;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    Cart findTopById(Long id);
    Cart findTopByOrderByIdDesc();

    Cart findByIsActive(boolean isActive);
}
