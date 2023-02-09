package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.ElementConstantRepo;
import com.project.carpentryshop.Repo.ElementLiquidRepo;
import com.project.carpentryshop.Repo.ProductRepo;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductApi {
    private ProductRepo productRepo;
    private ElementConstantRepo elementConstantRepo;
    private ElementLiquidRepo elementLiquidRepo;

    @Autowired
    public ProductApi(@Qualifier("projectRepo") ProductRepo productRepo, ElementConstantRepo elementConstantRepo, ElementLiquidRepo elementLiquidRepo) {
        this.productRepo =productRepo;
        this.elementConstantRepo = elementConstantRepo;
        this.elementLiquidRepo = elementLiquidRepo;
    }

    @GetMapping("/all")
    public Iterable<Product> getAll() {
        return productRepo.findAll();
    }

    @PutMapping(value = "/addPhoto")
    public ResponseEntity addProduct(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        Product lastProduct = productRepo.findTopByOrderByIdDesc();
        if(lastProduct == null){
            addProduct(multipartFile);
        }
        if(lastProduct.getPhotos() != null) {
            addProduct(multipartFile);
        }
        else {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            lastProduct.setPhotos(fileName);

            Product saved = productRepo.save(lastProduct);

            String uploadDir = "user-photos/" + saved.getId();

            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);

            productRepo.save(lastProduct);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public Optional<Product> getById(@PathVariable("id") Long id) {
        return productRepo.findById(id);
    }

    @PostMapping("/status/{id}")
    public Product changeStatus(@PathVariable("id") Long id) {
        Product changeStatus = productRepo.findById(id).orElseThrow(RuntimeException::new);

        if (changeStatus.isProductStatus() == true){
            changeStatus.setProductStatus(false);
            productRepo.save(changeStatus);
        }
        else{
            changeStatus.setProductStatus(true);
            productRepo.save(changeStatus);
        }
        return changeStatus;
    }

    @PutMapping("/modified")
    public ResponseEntity modifiedQuantity(@RequestParam("product") Long product,
                                           @RequestParam("type") String type,
                                           @RequestParam("operation") String operation,
                                           @RequestParam("quan") int quan) {

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

}
