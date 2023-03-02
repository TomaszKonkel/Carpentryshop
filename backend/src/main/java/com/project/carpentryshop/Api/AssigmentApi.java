package com.project.carpentryshop.Api;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.carpentryshop.Repo.AssigmentRepository;
import com.project.carpentryshop.Repo.ItemARepository;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.lang.Throwable;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/assigment")
@CrossOrigin
public class AssigmentApi {
    private AssigmentRepository assigmentRepository;
    private ItemARepository itemARepository;



    @Autowired
    public AssigmentApi(AssigmentRepository assigmentRepository, ItemARepository itemARepository) {
        this.assigmentRepository = assigmentRepository;
        this.itemARepository = itemARepository;

    }
    @GetMapping("/allAssigment")
    public Iterable<Assigment> getAllAssigment() {
        return assigmentRepository.findAll();
    }

    @GetMapping("/all")
    public Iterable<Assigment> getAll() {
        return assigmentRepository.findAll();
    }

    @GetMapping("/total")
    public double getTotalPrice() {
        if (assigmentRepository.count() != 0) {
            Assigment last = assigmentRepository.findTopByOrderByIdDesc();
            if (last.isInCart() == false) {
                return 0;
            }
            return last.getTotalPrice();
        }
        return 0;
    }



        @PostMapping("/add")
    public ResponseEntity createAssigment(@RequestBody ItemAssigment item) {


        if(assigmentRepository.count() == 0) {
            Assigment assigment = new Assigment();
            assigment.setName("Assigment 1");
            assigment.setInCart(true);
            assigment.setApproved(false);
            assigment.setTotalPrice(item.getFurniture().getBasePrice());
            assigment.setCreationDate(LocalDate.now());
            List<ItemAssigment> items = Arrays.asList(item);
            assigment.setItemAssigment(items);

            item.setData(LocalDate.now());
            item.setQuantityItemAssigment(1);
            item.setAssigment(assigment);
            assigmentRepository.save(assigment);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        if(assigmentRepository.findTopByOrderByIdDesc().isInCart() == false)
        {

            Assigment assigment = new Assigment();
            assigment.setName("Assigment" + (assigmentRepository.count() + 1));
            assigment.setInCart(true);
            assigment.setApproved(false);
            assigment.setTotalPrice(item.getFurniture().getBasePrice());
            assigment.setCreationDate(LocalDate.now());
            List<ItemAssigment> items = Arrays.asList(item);
            assigment.setItemAssigment(items);

            item.setData(LocalDate.now());
            item.setQuantityItemAssigment(1);
            item.setAssigment(assigment);
            assigmentRepository.save(assigment);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        Furniture exist = item.getFurniture();
        boolean ifexist = itemARepository.existsByFurnitureAndAssigment(exist, assigmentRepository.findTopByOrderByIdDesc());

        if(ifexist){

            Assigment lastAssigment = assigmentRepository.findTopByOrderByIdDesc();
            ItemAssigment update = itemARepository.findByFurniture_IdAndAssigment(exist.getId(), lastAssigment);
            update.setQuantityItemAssigment(update.getQuantityItemAssigment()+1);
            lastAssigment.setTotalPrice(lastAssigment.getTotalPrice() + update.getFurniture().getBasePrice());
            itemARepository.save(update);


        }
        else{
            Long lastId = assigmentRepository.findTopByOrderByIdDesc().getId();
            Assigment lastAssigment = assigmentRepository.findTopByOrderByIdDesc();
            lastAssigment.setTotalPrice(lastAssigment.getTotalPrice() + item.getFurniture().getBasePrice());

            item.setData(LocalDate.now());
            item.setQuantityItemAssigment(1);
            item.setAssigment(assigmentRepository.findTopById(lastId));
            itemARepository.save(item);
        }



        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/end")
    public void end() {
        Assigment endAssigment = assigmentRepository.findByInCart(true);
        if(endAssigment == null) {
            System.out.println("There is no Assigment");
        }
        else{
            endAssigment.setInCart(false);
            assigmentRepository.save(endAssigment);
        }
    }

    @PutMapping("/end/{assigment}")
    public ResponseEntity endJob(@PathVariable("assigment") Long assigment) {
        Assigment endAssigment = assigmentRepository.findById(assigment).orElseThrow(RuntimeException::new);

        endAssigment.setApproved(true);
        assigmentRepository.save(endAssigment);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/totalprice/{total}")
    public Assigment updateAssigmentTotalPlus(@PathVariable("total") double total) {

        Assigment findActive = assigmentRepository.findByInCart(true);
        findActive.setTotalPrice(findActive.getTotalPrice() + total);


        return assigmentRepository.save(findActive);
    }

    @PutMapping("/totalpriceTrash/{total}")
    public Assigment updateAssigmentTotalTrash(@PathVariable("total") double total) {

        Assigment findActive = assigmentRepository.findByInCart(true);
        findActive.setTotalPrice(findActive.getTotalPrice() - total);


        return assigmentRepository.save(findActive);
    }


    @PutMapping("/customerData/{customerName}/{customerLastName}/{customerPhoneNumber}")
    public Assigment setCustomerData(@PathVariable("customerName") String name, @PathVariable("customerLastName") String lastname, @PathVariable("customerPhoneNumber") Integer phonenumber ) {
            Assigment lastAssigment = assigmentRepository.findTopByOrderByIdDesc();
            lastAssigment.setCustomerName(name);
            lastAssigment.setCustomerLastName(lastname);
            lastAssigment.setCustomerPhoneNumber(phonenumber);

        return assigmentRepository.save(lastAssigment);
    }

    @PutMapping("/totalprice2/{total}")
    public Assigment updateAssigmentTotalMins(@PathVariable("total") double total) {

        Assigment findActive = assigmentRepository.findByInCart(true);
        findActive.setTotalPrice(findActive.getTotalPrice() - total);


        return assigmentRepository.save(findActive);
    }

    @GetMapping("/details/{id}")
    public Optional<Assigment> getById(@PathVariable("id") Long id) {
        return assigmentRepository.findById(id);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) throws Throwable {

        assigmentRepository.deleteById(id);

    }


}

