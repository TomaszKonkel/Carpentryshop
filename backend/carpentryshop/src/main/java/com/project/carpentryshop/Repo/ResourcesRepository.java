package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesRepository extends CrudRepository<Resources, Long> {
    

    boolean existsByProductIdAndAssigmentIdAndItemAssigment(Long product, Long assigment, ItemAssigment itemAssigment );

    Resources findByProductIdAndAssigmentIdAndItemAssigment(Long product, Long assigment, ItemAssigment itemAssigment);

    Iterable<Resources> findByAssigmentId(Long id);
}
