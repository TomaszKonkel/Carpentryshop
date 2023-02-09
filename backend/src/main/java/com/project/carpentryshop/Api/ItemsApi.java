package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.ItemsRepository;

import com.project.carpentryshop.Repo.ItemListRepository;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemsApi {

    private ItemsRepository itemsRepository;
    private ItemListRepository itemListRepository;

    @Autowired
    public ItemsApi(ItemsRepository itemsRepository, ItemListRepository itemListRepository) {
        this.itemsRepository = itemsRepository;
        this.itemListRepository = itemListRepository;
    }

    @GetMapping("/allItems")
    public Iterable<Items> getAllItems() {
        return itemsRepository.findAll();
    }

    @GetMapping("/all")
    public Iterable<Items> getAll() {
        return itemsRepository.findAll();

    }

    @GetMapping("/total")
    public double getTotalPrice() {
        if(itemsRepository.count() != 0){
            Items last = itemsRepository.findTopByOrderByIdDesc();
            if(last.isActive() == false)
            {
                return 0;
            }
            return last.getTotalPrice();
        }
        return 0;
    }

    @PostMapping("/addItem")
    public ResponseEntity createItemsConstant(@RequestBody ItemList itemList) {
        //Pusta tabela
        if(itemsRepository.count() == 0) {
            Items items = new Items();
            items.setName("Items 1");
            items.setActive(true);
            items.setCreationDate(LocalDate.now());
            return createItem(itemList, items);
        }
        //Kiedy nie ma aktywnej grupy
        if(itemsRepository.findTopByOrderByIdDesc().isActive() == false)
        {
            Items itemsNew = new Items();
            itemsNew.setName("Items" + " " + (itemsRepository.count() +1));
            itemsNew.setActive(true);
            itemsNew.setCreationDate(LocalDate.now());
            return createItem(itemList, itemsNew);
        }

        //Jeżeli przedmiot się powtarza
        boolean ifexist = false;
        if(itemList.getElementConstant() != null){
            ifexist = itemListRepository.existsByElementConstantAndItems(itemList.getElementConstant(), itemsRepository.findTopByOrderByIdDesc());
        }
        if(itemList.getElementLiquid() != null){
            ifexist = itemListRepository.existsByElementLiquidAndItems(itemList.getElementLiquid(), itemsRepository.findTopByOrderByIdDesc());
        }


        if(ifexist){

            Items lastItems = itemsRepository.findTopByOrderByIdDesc();
            ItemList update = itemList;
            if(itemList.getElementConstant() != null){
                update = itemListRepository.findByElementConstant_IdAndItems(itemList.getElementConstant().getId(), lastItems);
                lastItems.setTotalPrice(lastItems.getTotalPrice() + update.getElementConstant().getPricePerPiece());
            }
            if(itemList.getElementLiquid() != null){
                update = itemListRepository.findByElementLiquid_IdAndItems(itemList.getElementLiquid().getId(), lastItems);
                lastItems.setTotalPrice(lastItems.getTotalPrice() + update.getElementLiquid().getPricePerLiter());
            }

            update.setQuantityItems(update.getQuantityItems()+1);
            itemListRepository.save(update);

        }
        //Jeżeli przedmiot się nie powtarza
        else{
            Items lastItems = itemsRepository.findTopByOrderByIdDesc();
            Long lastId = itemsRepository.findTopByOrderByIdDesc().getId();

            if(itemList.getElementConstant() != null){
                lastItems.setTotalPrice(lastItems.getTotalPrice() + itemList.getElementConstant().getPricePerPiece());
            }
            if(itemList.getElementLiquid() != null){
                lastItems.setTotalPrice(lastItems.getTotalPrice() + itemList.getElementLiquid().getPricePerLiter());
            }

            itemList.setData(LocalDate.now());
            itemList.setQuantityItems(1);
            itemList.setItems(itemsRepository.findTopById(lastId));
            itemListRepository.save(itemList);
        }



        return ResponseEntity.ok(HttpStatus.OK);
    }

    private ResponseEntity createItem(@RequestBody ItemList itemList, Items cart) {

        if(itemList.getElementConstant() != null){
            cart.setTotalPrice(itemList.getElementConstant().getPricePerPiece());
        }
        if(itemList.getElementLiquid() != null){
            cart.setTotalPrice(itemList.getElementLiquid().getPricePerLiter());
        }
        List<ItemList> items = Arrays.asList(itemList);
        cart.setItems(items);

        itemList.setData(LocalDate.now());
        itemList.setQuantityItems(1);
        itemList.setItems(cart);
        itemsRepository.save(cart);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/end")
    public void end() {
        Items endItems = itemsRepository.findByIsActive(true);
        if(endItems == null) {
        System.out.println("There is no Cart");
        }
        else {
            endItems.setActive(false);
            itemsRepository.save(endItems);
        }
    }


    @PutMapping("/totalprice")
    public ResponseEntity modifiedTotalPrice(@RequestParam("total") double total, @RequestParam("operation") String operation) {

        Items findActive = itemsRepository.findByIsActive(true);

        if (operation.equals("minus")){
            findActive.setTotalPrice(findActive.getTotalPrice() - total);
            itemsRepository.save(findActive);
        }
        if (operation.equals("plus")){
            findActive.setTotalPrice(findActive.getTotalPrice() + total);
            itemsRepository.save(findActive);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/modified")
    public ResponseEntity modifiedQuantity(@RequestParam("item") Long item,
                                           @RequestParam("operation") String operation,
                                           @RequestParam("quan") int quan) {

            ItemList items = itemListRepository.findById(item).orElseThrow(RuntimeException::new);
            if (operation.equals("minus")){
                items.setQuantityItems((items.getQuantityItems() - quan));
                itemListRepository.save(items);
            }
            if (operation.equals("plus")){
                items.setQuantityItems((items.getQuantityItems() + quan));
                itemListRepository.save(items);
            }
        return ResponseEntity.ok(HttpStatus.OK);
    }


}
