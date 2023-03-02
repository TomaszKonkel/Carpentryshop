package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.ElementConstantRepo;
import com.project.carpentryshop.Repo.FurnitureRepo;
import com.project.carpentryshop.entity.ConstantCategory;
import com.project.carpentryshop.entity.ElementConstant;
import com.project.carpentryshop.entity.Furniture;
import com.project.carpentryshop.entity.FurnitureCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/constant")
@CrossOrigin
public class ConstantApi {
    private ElementConstantRepo elementConstantRepo;

    @Autowired
    public ConstantApi(ElementConstantRepo elementConstantRepo) {
        this.elementConstantRepo = elementConstantRepo;
    }

    @GetMapping("/category")
    public ConstantCategory[] getCategorySecond(){
        return ConstantCategory.values();
    }

    @PostMapping("/addConstant")
    public ElementConstant addProduct(@RequestBody ElementConstant elementConstant) {
        return elementConstantRepo.save(elementConstant);
    }

    @PutMapping("details/update/constant/{id}")
    public ElementConstant updateConstant(@PathVariable Long id, @RequestBody ElementConstant constant) {

        ElementConstant updateProduct = (ElementConstant) elementConstantRepo.findById(id).orElseThrow(RuntimeException::new);
        updateProduct.setName(constant.getName());
        updateProduct.setQuantity(constant.getQuantity());
        updateProduct.setConstantCategory(constant.getConstantCategory());
        updateProduct.setDescription(constant.getDescription());
        updateProduct.setLengthInCm(constant.getLengthInCm());
        updateProduct.setWidthInCm(constant.getWidthInCm());
        updateProduct.setPricePerPiece(constant.getPricePerPiece());


        return elementConstantRepo.save(updateProduct);
    }
}
