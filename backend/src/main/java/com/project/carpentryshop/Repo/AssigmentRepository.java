package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.Assigment;
import com.project.carpentryshop.entity.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssigmentRepository extends CrudRepository<Assigment, Long> {
    Assigment findTopByOrderByIdDesc();


    Assigment findTopById(Long lastId);

    Assigment findByInCart(boolean b);
}
