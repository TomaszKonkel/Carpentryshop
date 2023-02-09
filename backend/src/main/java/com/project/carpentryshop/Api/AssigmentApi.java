package com.project.carpentryshop.Api;


import com.project.carpentryshop.Repo.AssigmentRepository;
import com.project.carpentryshop.Repo.ProjecListRepository;
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
    private ProjecListRepository projecListRepository;



    @Autowired
    public AssigmentApi(AssigmentRepository assigmentRepository, ProjecListRepository projecListRepository) {
        this.assigmentRepository = assigmentRepository;
        this.projecListRepository = projecListRepository;

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
    public ResponseEntity createAssigment(@RequestBody ProjectList item) {

        if(assigmentRepository.count() == 0) {
            Assigment assigment = new Assigment();
            assigment.setName("Assigment 1");
            assigment.setCustomerName("undefined");
            assigment.setCustomerPhoneNumber(0);
            assigment.setCustomerLastName("undefined");
            return createJob(item, assigment);
        }
        if(assigmentRepository.findTopByOrderByIdDesc().isInCart() == false)
        {

            Assigment assigment = new Assigment();
            assigment.setName("Assigment"+ " " + (assigmentRepository.count() + 1));
            return createJob(item, assigment);
        }
        Project exist = item.getProject();
        boolean ifexist = projecListRepository.existsByProjectAndAssigment(exist, assigmentRepository.findTopByOrderByIdDesc());

        if(ifexist){

            Assigment lastAssigment = assigmentRepository.findTopByOrderByIdDesc();
            ProjectList update = projecListRepository.findByProject_IdAndAssigment(exist.getId(), lastAssigment);
            update.setQuantityItemAssigment(update.getQuantityItemAssigment()+1);
            lastAssigment.setTotalPrice(lastAssigment.getTotalPrice() + update.getProject().getBasePrice());
            projecListRepository.save(update);


        }
        else{
            Long lastId = assigmentRepository.findTopByOrderByIdDesc().getId();
            Assigment lastAssigment = assigmentRepository.findTopByOrderByIdDesc();
            lastAssigment.setTotalPrice(lastAssigment.getTotalPrice() + item.getProject().getBasePrice());

            item.setData(LocalDate.now());
            item.setQuantityItemAssigment(1);
            item.setAssigment(assigmentRepository.findTopById(lastId));
            projecListRepository.save(item);
        }



        return ResponseEntity.ok(HttpStatus.OK);
    }

    private ResponseEntity createJob(@RequestBody ProjectList item, Assigment assigment) {
        assigment.setInCart(true);
        assigment.setApproved(false);
        assigment.setTotalPrice(item.getProject().getBasePrice());
        assigment.setCreationDate(LocalDate.now());
        List<ProjectList> items = Arrays.asList(item);
        assigment.setItemAssigment(items);

        item.setData(LocalDate.now());
        item.setQuantityItemAssigment(1);
        item.setAssigment(assigment);
        assigmentRepository.save(assigment);
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

    @PutMapping("/end")
    public ResponseEntity endJob(@RequestParam("assigment") Long assigment) {
        Assigment endAssigment = assigmentRepository.findById(assigment).orElseThrow(RuntimeException::new);

        endAssigment.setApproved(true);
        assigmentRepository.save(endAssigment);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @PutMapping("/totalprice")
    public ResponseEntity modifiedTotalPrice(@RequestParam("total") double total, @RequestParam("operation") String operation) {

        Assigment findActive = assigmentRepository.findByInCart(true);

        if (operation.equals("minus")){
            findActive.setTotalPrice(findActive.getTotalPrice() - total);
            assigmentRepository.save(findActive);
        }
        if (operation.equals("plus")){
            findActive.setTotalPrice(findActive.getTotalPrice() + total);
            assigmentRepository.save(findActive);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/modified")
    public ResponseEntity modifiedQuantity(@RequestParam("item") Long item, @RequestParam("operation") String operation, @RequestParam("quan") int quan) {

        ProjectList items = projecListRepository.findById(item).orElseThrow(RuntimeException::new);
        if (operation.equals("minus")){
            items.setQuantityItemAssigment((items.getQuantityItemAssigment() - quan));
            projecListRepository.save(items);
        }
        if (operation.equals("plus")){
            items.setQuantityItemAssigment((items.getQuantityItemAssigment() + quan));
            projecListRepository.save(items);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @PutMapping("/customerData")
    public Assigment setCustomerData(@RequestParam("customerName") String name, @RequestParam("customerLastName") String lastname, @RequestParam("customerPhoneNumber") Integer phonenumber ) {
            Assigment lastAssigment = assigmentRepository.findTopByOrderByIdDesc();
            lastAssigment.setCustomerName(name);
            lastAssigment.setCustomerLastName(lastname);
            lastAssigment.setCustomerPhoneNumber(phonenumber);

        return assigmentRepository.save(lastAssigment);
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

