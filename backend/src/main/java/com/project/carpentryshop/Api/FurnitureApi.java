package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.FurnitureRepo;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/furniture")
@CrossOrigin
public class FurnitureApi {
    private FurnitureRepo furnitureRepo;


    @Autowired
    public FurnitureApi(FurnitureRepo furnitureRepo) {
        this.furnitureRepo = furnitureRepo;

    }

    @GetMapping("/category")
    public FurnitureCategory[] getCategory(){
        return FurnitureCategory.values();
    }

    @PostMapping(value = "/addFurniture")
    public Furniture addProduct(@RequestBody Furniture furniture)  {
        furniture.setName(furniture.getName());
        furniture.setDescription(furniture.getDescription());
        furniture.setWeight(furniture.getWeight());
        furniture.setBasePrice(furniture.getBasePrice());
        furniture.setFurnitureCategory(furniture.getFurnitureCategory());

    return furnitureRepo.save(furniture);
    }

    @PutMapping("details/update/furniture/{id}")
    public Furniture updateFurniture(@PathVariable Long id, @RequestBody Furniture furniture) {

        Furniture updateProduct = (Furniture) furnitureRepo.findById(id).orElseThrow(RuntimeException::new);
        updateProduct.setName(furniture.getName());
        updateProduct.setBasePrice(furniture.getBasePrice());
        updateProduct.setFurnitureCategory(furniture.getFurnitureCategory());
        updateProduct.setDescription(furniture.getDescription());
        updateProduct.setWeight(furniture.getWeight());

        return furnitureRepo.save(updateProduct);
    }


}
