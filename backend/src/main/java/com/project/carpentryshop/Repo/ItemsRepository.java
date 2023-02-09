package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.Items;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends CrudRepository<Items, Long> {
    Items findTopById(Long id);
    Items findTopByOrderByIdDesc();

    Items findByIsActive(boolean isActive);
}
