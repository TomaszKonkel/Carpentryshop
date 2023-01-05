package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemARepository extends CrudRepository<ItemAssigment, Long> {
    boolean existsByFurnitureAndAssigment(Furniture exist, Assigment a);

    ItemAssigment findByFurniture_IdAndAssigment(Long id, Assigment lastAssigment);

    ItemAssigment findTopByOrderByAssigmentDesc();

    List<ItemAssigment> findByAssigment(Assigment last);
}
