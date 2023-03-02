package com.project.carpentryshop.Api;

import com.project.carpentryshop.Repo.ProductRepo;
import com.project.carpentryshop.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductApi {
    private ProductRepo productRepo;

    @Autowired
    public ProductApi(@Qualifier("furnitureRepo") ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @GetMapping("/all")
    public Iterable<Product> getAll() {
        return productRepo.findAll();
    }

    @PutMapping(value = "/addPhoto")
    public Product addProduct(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        Product lastProduct = productRepo.findTopByOrderByIdDesc();



        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        lastProduct.setPhotos(fileName);

        Product saved = productRepo.save(lastProduct);

        String uploadDir = "user-photos/" + saved.getId();

        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);

        return productRepo.save(lastProduct);
    }

    @GetMapping("/details/{id}")
    public Optional<Product> getById(@PathVariable("id") Long id) {
        return productRepo.findById(id);
    }

    @PostMapping("/status/{id}")
    public void changeStatus(@PathVariable("id") Long id) {
        Product changeStatus = productRepo.findById(id).orElseThrow(RuntimeException::new);

        if (changeStatus.isProductStatus() == true){
            changeStatus.setProductStatus(false);
            productRepo.save(changeStatus);
        }
        else{
            changeStatus.setProductStatus(true);
            productRepo.save(changeStatus);
        }

    }
}
