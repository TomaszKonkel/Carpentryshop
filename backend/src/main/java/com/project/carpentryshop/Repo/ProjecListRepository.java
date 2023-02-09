package com.project.carpentryshop.Repo;

import com.project.carpentryshop.entity.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjecListRepository extends CrudRepository<ProjectList, Long> {
    boolean existsByProjectAndAssigment(Project exist, Assigment a);

    ProjectList findByProject_IdAndAssigment(Long id, Assigment lastAssigment);

    ProjectList findTopByOrderByAssigmentDesc();

    List<ProjectList> findByAssigment(Assigment last);
}
