package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.*;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin
public class ResourcesApi {
    private ResourcesRepository resourcesRepository;
    private ProductRepo productRepo;
    private AssigmentRepository assigmentRepository;
    private ElementConstantRepo elementConstantRepo;
    private ElementLiquidRepo elementLiquidRepo;

    @Autowired
    public ResourcesApi(ResourcesRepository resourcesRepository, AssigmentRepository assigmentRepository, @Qualifier("furnitureRepo") ProductRepo productRepo, ElementConstantRepo elementConstantRepo, ElementLiquidRepo elementLiquidRepo) {
        this.resourcesRepository = resourcesRepository;
        this.productRepo =productRepo;
        this.assigmentRepository = assigmentRepository;
        this.elementConstantRepo = elementConstantRepo;
        this.elementLiquidRepo = elementLiquidRepo;

    }
    @GetMapping("/all")
    public Iterable<Resources> getAllToItem() {
        return resourcesRepository.findAll();

    }


    @PutMapping("/modifiedPrice/{assigment}/{price}/{operation}/{quan}")
    public ResponseEntity modifiedPrice(@PathVariable Long assigment, @PathVariable double price, @PathVariable String operation, @PathVariable int quan) {

        Assigment assigmentFind = assigmentRepository.findById(assigment).orElseThrow(RuntimeException::new);
        System.out.println(operation);

        if (operation.equals("plus")) {
            assigmentFind.setTotalPrice(assigmentFind.getTotalPrice() + price);
            assigmentRepository.save(assigmentFind);
        }
        if (operation.equals("minus")){
            assigmentFind.setTotalPrice(assigmentFind.getTotalPrice() - (price * quan));
            assigmentRepository.save(assigmentFind);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/modified/{product}/{type}/{operation}/{quan}")
    public ResponseEntity modified(@PathVariable Long product, @PathVariable String type, @PathVariable String operation, @PathVariable int quan) {


        if (type.equals("CONSTANT")){
            ElementConstant constant = (ElementConstant) elementConstantRepo.findById(product).orElseThrow(RuntimeException::new);
                if (operation.equals("minus")){
                    constant.setQuantity((constant.getQuantity() - quan));
                    elementConstantRepo.save(constant);
                }
                if (operation.equals("plus")){
                    constant.setQuantity((constant.getQuantity() + quan));
                    elementConstantRepo.save(constant);
                }
        }

        if (type.equals("LIQUID")){
            ElementLiquid liquid = (ElementLiquid) elementLiquidRepo.findById(product).orElseThrow(RuntimeException::new);
                if (operation.equals("minus")){
                    liquid.setQuantity((liquid.getQuantity() - quan));
                    elementLiquidRepo.save(liquid);
                }
                if (operation.equals("plus")){
                    liquid.setQuantity((liquid.getQuantity() + quan));
                    elementLiquidRepo.save(liquid);
                }
        }


        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/add/{product}/{assigment}")
    public ResponseEntity add(@PathVariable Long product, @PathVariable Long assigment,@RequestBody  Resources resources) {

        if(resourcesRepository.count() == 0 ){
            Product productFind =productRepo.findById(product).orElseThrow(RuntimeException::new);
            Assigment assigmentFind = assigmentRepository.findById(assigment).orElseThrow(RuntimeException::new);
            resources.setAssigment(assigmentFind);
            resources.setProduct(productFind);
            resources.setQuantityResources(1);

            resourcesRepository.save(resources);
            return ResponseEntity.ok(HttpStatus.OK);
        }

        boolean resourcesExist = resourcesRepository.existsByProductIdAndAssigmentIdAndItemAssigment(product, assigment, resources.getItemAssigment());
        if(resourcesExist){
            Resources find = resourcesRepository.findByProductIdAndAssigmentIdAndItemAssigment(product, assigment, resources.getItemAssigment());
            find.setQuantityResources(find.getQuantityResources() + 1);

            resourcesRepository.save(find);
            return ResponseEntity.ok(HttpStatus.OK);
        }
        else{
            Product productFind =productRepo.findById(product).orElseThrow(RuntimeException::new);
            Assigment assigmentFind = assigmentRepository.findById(assigment).orElseThrow(RuntimeException::new);
            resources.setAssigment(assigmentFind);
            resources.setProduct(productFind);
            resources.setItemAssigment(resources.getItemAssigment());
            resources.setQuantityResources(1);

            resourcesRepository.save(resources);
            return ResponseEntity.ok(HttpStatus.OK);
        }


    }



    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {
        resourcesRepository.deleteById(id);

    }




}
