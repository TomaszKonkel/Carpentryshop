package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.*;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResourcesApi(ResourcesRepository resourcesRepository, AssigmentRepository assigmentRepository, @Qualifier("projectRepo") ProductRepo productRepo, ElementConstantRepo elementConstantRepo, ElementLiquidRepo elementLiquidRepo) {
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


    @PutMapping("/modifiedPrice")
    public ResponseEntity modifiedPrice(@RequestParam("assigment") Long assigment,
                                        @RequestParam("price") double price,
                                        @RequestParam("operation") String operation,
                                        @RequestParam(required = false) Long quan) {

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



    @PostMapping("/add")
    public ResponseEntity add(@RequestParam("product") Long product, @RequestParam("assigment") Long assigment,@RequestBody  Resources resources) {

        if(resourcesRepository.count() == 0 ){
            Product productFind =productRepo.findById(product).orElseThrow(RuntimeException::new);
            Assigment assigmentFind = assigmentRepository.findById(assigment).orElseThrow(RuntimeException::new);
            resources.setAssigment(assigmentFind);
            resources.setProduct(productFind);
            resources.setQuantityResources(1);

            resourcesRepository.save(resources);
            return ResponseEntity.ok(HttpStatus.OK);
        }

        boolean resourcesExist = resourcesRepository.existsByProductIdAndAssigmentIdAndProjectList(product, assigment, resources.getItemAssigment());
        if(resourcesExist){
            Resources find = resourcesRepository.findByProductIdAndAssigmentIdAndProjectList(product, assigment, resources.getItemAssigment());
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
