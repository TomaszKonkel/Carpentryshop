package com.project.carpentryshop;

import com.project.carpentryshop.Api.ConstantApi;
import com.project.carpentryshop.Api.LiquidApi;
import com.project.carpentryshop.Api.ProjectApi;
import com.project.carpentryshop.Repo.ElementConstantRepo;
import com.project.carpentryshop.Repo.ElementLiquidRepo;
import com.project.carpentryshop.Repo.ProductRepo;
import com.project.carpentryshop.entity.*;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Rollback(value = false)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class test {
    @Qualifier("projectRepo")
    @Autowired
    private ProductRepo productRepo;


    @Autowired
    private ProjectApi projectApi;

    @Autowired
    private ConstantApi constantApi;

    @Autowired
    private LiquidApi liquidApi;

    Long productId = null;

    @Test
    public void CreateProduct() throws Exception {

        projectApi.addProject(new Project());
        constantApi.addConst(new ElementConstant());
        liquidApi.addLiquid(new ElementLiquid());



                assertThat(productRepo.count()).isEqualTo((3L));



    }

    @Test
    public void GetListProduct() throws Exception {
        if(productRepo.count() == 0){
            productId = 3L;
        }
        else {
            productId = productRepo.findTopByOrderByIdDesc().getId();
        }
        List<Product> list = new ArrayList<>();

        Project project = new Project();
        project.setId(productId - 2);
        list.add(project);

        ElementConstant elementConstant = new ElementConstant();
        elementConstant.setId(productId - 1);
        list.add(elementConstant);

        ElementLiquid elementLiquid = new ElementLiquid();
        elementLiquid.setId(productId);
        list.add(elementLiquid);

        List<Product> find = (List<Product>) productRepo.findAll();

        System.out.println(find);

    }


    @Test
    public void UpdateProduct() throws Exception {
        productId = productRepo.findTopByOrderByIdDesc().getId();

        Product foundProject = productRepo.findById(productId - 2).get();
        Product foundConst = productRepo.findById(productId - 1).get();
        Product foundLiquid = productRepo.findById(productId).get();

        foundProject.setProductStatus(true);
        productRepo.save(foundProject);

        foundConst.setDescription("ZmienionyDobryOpis");
        productRepo.save(foundConst);

        foundLiquid.setName("Farbeczka");
        productRepo.save(foundLiquid);


        assertAll("found",
                () -> assertThat(productRepo.findById(productId - 2).get().isProductStatus()).isEqualTo(true),
                () -> assertThat(productRepo.findById(productId - 1).get().getDescription()).isEqualTo("ZmienionyDobryOpis"),
                () -> assertThat(productRepo.findById(productId).get().getName()).isEqualTo("Farbeczka")

        );

    }

    @Test
    public void DeleteProduct() throws Exception {
        productId = productRepo.findTopByOrderByIdDesc().getId();
        productRepo.deleteById(productId);

        assertThat(productRepo.findAll()).isNotEqualTo(3L);

    }

    @Test
    public void DeleteAll() throws Exception {
        productRepo.deleteAll();
        assertThat(productRepo.count()).isZero();

    }



}
