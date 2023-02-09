package com.project.carpentryshop.Api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.carpentryshop.Repo.AssigmentRepository;
import com.project.carpentryshop.Repo.ProjecListRepository;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/itemA")
@CrossOrigin
public class ProjectListApi {
    private ProjecListRepository projecListRepository;
    private AssigmentRepository assigmentRepository;


    @Autowired
    public ProjectListApi(ProjecListRepository projecListRepository, AssigmentRepository assigmentRepository) {
        this.projecListRepository = projecListRepository;
        this.assigmentRepository = assigmentRepository;
    }


    @GetMapping("/allAssigment")
    public Iterable<ProjectList> getAllAssigment() {
        return projecListRepository.findAll();
    }


    @GetMapping("/all")
    public ResponseEntity<List<ProjectList>> getAll() {
        if(projecListRepository.count() != 0){
            Assigment last = projecListRepository.findTopByOrderByAssigmentDesc().getAssigment();
            if(last.isInCart() == false)
            {
                return new ResponseEntity(new emptySite(), HttpStatus.OK);
            }
            return new ResponseEntity<>(projecListRepository.findByAssigment(last), HttpStatus.OK);
        }
        return new ResponseEntity<>((List<ProjectList>) projecListRepository.findAll(), HttpStatus.OK);

    }
    @PutMapping("/details/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody ProjectList item){
        ProjectList updateItem = projecListRepository.findById(id).orElseThrow(RuntimeException::new);
        updateItem.setQuantityItemAssigment(item.getQuantityItemAssigment());
        Long lastId = assigmentRepository.findTopByOrderByIdDesc().getId();
        System.out.println(lastId);
        updateItem.setAssigment(assigmentRepository.findTopById(lastId));
        projecListRepository.save(updateItem);


        return ResponseEntity.ok(updateItem);
    }



    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id){

        Assigment find = assigmentRepository.findByInCart(true);

        projecListRepository.deleteById(id);
        if(find.getItemAssigment().isEmpty() == true){
            assigmentRepository.deleteById(find.getId());
        }

    }

    @JsonSerialize
    public class emptySite{
        Object object = new Object();

    }
}
