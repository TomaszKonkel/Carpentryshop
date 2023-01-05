package com.project.carpentryshop.Api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.carpentryshop.Repo.CartRepository;
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
@RequestMapping("/api/item")
@CrossOrigin
public class ItemApi {
    private ItemRepository itemRepository;
    private CartRepository cartRepository;


    @Autowired
    public ItemApi(ItemRepository itemRepository, CartRepository cartRepository) {
        this.itemRepository = itemRepository;
        this.cartRepository = cartRepository;
    }

    @GetMapping("/allCart")
    public Iterable<ItemCart> getAllCart() {
        return itemRepository.findAll();
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemCart>> getAll() {
        if(itemRepository.count() != 0){
            Cart last = itemRepository.findTopByOrderByCartDesc().getCart();
            if(last.isActive() == false)
            {
                return new ResponseEntity(new emptySite(), HttpStatus.OK);
            }
            return new ResponseEntity<>(itemRepository.findByCart(last), HttpStatus.OK);
        }
        return new ResponseEntity<>((List<ItemCart>) itemRepository.findAll(), HttpStatus.OK);

    }
@PutMapping("/details/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody ItemCart item){
        ItemCart updateItem = itemRepository.findById(id).orElseThrow(RuntimeException::new);
        updateItem.setQuantityItemCart(item.getQuantityItemCart());
        Long lastId = cartRepository.findTopByOrderByIdDesc().getId();
        System.out.println(lastId);
        updateItem.setCart(cartRepository.findTopById(lastId));
        itemRepository.save(updateItem);


        return ResponseEntity.ok(updateItem);
    }



    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id){
        Cart find = cartRepository.findByIsActive(true);

        itemRepository.deleteById(id);
        if(find.getItemCart().isEmpty() == true){
            cartRepository.deleteById(find.getId());
        }
    }

    @JsonSerialize
    public class emptySite{
            Object object = new Object();

    }
}
