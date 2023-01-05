package com.project.carpentryshop.Api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.carpentryshop.Repo.AssigmentRepository;
import com.project.carpentryshop.Repo.CartRepository;
import com.project.carpentryshop.Repo.ItemARepository;
import com.project.carpentryshop.Repo.ItemRepository;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.lang.Throwable;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/itemA")
@CrossOrigin
public class ItemAApi {
    private ItemARepository itemARepository;
    private AssigmentRepository assigmentRepository;


    @Autowired
    public ItemAApi(ItemARepository itemARepository, AssigmentRepository assigmentRepository) {
        this.itemARepository = itemARepository;
        this.assigmentRepository = assigmentRepository;
    }


    @GetMapping("/allAssigment")
    public Iterable<ItemAssigment> getAllAssigment() {
        return itemARepository.findAll();
    }


    @GetMapping("/all")
    public ResponseEntity<List<ItemAssigment>> getAll() {
        if(itemARepository.count() != 0){
            Assigment last = itemARepository.findTopByOrderByAssigmentDesc().getAssigment();
            if(last.isInCart() == false)
            {
                return new ResponseEntity(new emptySite(), HttpStatus.OK);
            }
            return new ResponseEntity<>(itemARepository.findByAssigment(last), HttpStatus.OK);
        }
        return new ResponseEntity<>((List<ItemAssigment>) itemARepository.findAll(), HttpStatus.OK);

    }
    @PutMapping("/details/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody ItemAssigment item){
        ItemAssigment updateItem = itemARepository.findById(id).orElseThrow(RuntimeException::new);
        updateItem.setQuantityItemAssigment(item.getQuantityItemAssigment());
        Long lastId = assigmentRepository.findTopByOrderByIdDesc().getId();
        System.out.println(lastId);
        updateItem.setAssigment(assigmentRepository.findTopById(lastId));
        itemARepository.save(updateItem);


        return ResponseEntity.ok(updateItem);
    }



    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id){

        Assigment find = assigmentRepository.findByInCart(true);

        itemARepository.deleteById(id);
        if(find.getItemAssigment().isEmpty() == true){
            assigmentRepository.deleteById(find.getId());
        }

    }

    @JsonSerialize
    public class emptySite{
        Object object = new Object();

    }
}
