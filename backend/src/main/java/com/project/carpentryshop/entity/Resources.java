package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Resources {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int quantityResources;

    @ManyToOne
    @JoinColumn(name = "Product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "projectList_id")
    private ProjectList projectList;

    @ManyToOne
    @JoinColumn(name = "assigment_id")
    private Assigment assigment;

    public Resources() {
    }

    public Resources(Long id, int quantityResources, Product product, ProjectList projectList, Assigment assigment) {
        this.id = id;
        this.quantityResources = quantityResources;
        this.product = product;
        this.projectList = projectList;
        this.assigment = assigment;
    }


    public int getQuantityResources() {
        return quantityResources;
    }

    public void setQuantityResources(int quantityResources) {
        this.quantityResources = quantityResources;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProjectList getItemAssigment() {
        return projectList;
    }

    public void setItemAssigment(ProjectList projectList) {
        this.projectList = projectList;
    }

    @JsonIgnore
    public Assigment getAssigment() {
        return assigment;
    }

    public void setAssigment(Assigment assigment) {
        this.assigment = assigment;
    }


}
