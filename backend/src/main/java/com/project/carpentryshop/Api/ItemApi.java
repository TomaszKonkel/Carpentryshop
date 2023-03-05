package com.project.carpentryshop.Api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.carpentryshop.Repo.ItemsRepository;
import com.project.carpentryshop.Repo.ItemListRepository;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/item")
@CrossOrigin
public class ItemApi {
    private ItemListRepository itemListRepository;
    private ItemsRepository itemsRepository;


    @Autowired
    public ItemApi(ItemListRepository itemListRepository, ItemsRepository itemsRepository) {
        this.itemListRepository = itemListRepository;
        this.itemsRepository = itemsRepository;
    }

    @GetMapping("/allCart")
    public Iterable<ItemList> getAllCart() {
        return itemListRepository.findAll();
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemList>> getAll() {
        if(itemListRepository.count() != 0){
            Items last = itemListRepository.findTopByOrderByItemsDesc().getItems();
            if(last.isActive() == false)
            {
                return new ResponseEntity(new emptySite(), HttpStatus.OK);
            }
            return new ResponseEntity<>(itemListRepository.findByItems(last), HttpStatus.OK);
        }
        return new ResponseEntity<>((List<ItemList>) itemListRepository.findAll(), HttpStatus.OK);

    }
@PutMapping("/details/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody ItemList item){
        ItemList updateItem = itemListRepository.findById(id).orElseThrow(RuntimeException::new);
        updateItem.setQuantityItems(item.getQuantityItems());
        Long lastId = itemsRepository.findTopByOrderByIdDesc().getId();
        System.out.println(lastId);
        updateItem.setItems(itemsRepository.findTopById(lastId));
        itemListRepository.save(updateItem);


        return ResponseEntity.ok(updateItem);
    }



    @DeleteMapping("/deleteItem/{id}")
    public void deleteProduct(@PathVariable("id") Long id){
        Items find = itemsRepository.findByIsActive(true);

        itemListRepository.deleteById(id);
        if(find.getItems().isEmpty() == true){
            itemsRepository.deleteById(find.getId());
        }
    }

    @JsonSerialize
    public class emptySite{
            Object object = new Object();

    }
}
