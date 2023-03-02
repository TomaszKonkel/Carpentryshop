package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JoinColumn(name = "itemAssigment_id")
    private ItemAssigment itemAssigment;

    @ManyToOne
    @JoinColumn(name = "assigment_id")
    private Assigment assigment;

    public Resources() {
    }

    public Resources(Long id, int quantityResources, Product product, ItemAssigment itemAssigment, Assigment assigment) {
        this.id = id;
        this.quantityResources = quantityResources;
        this.product = product;
        this.itemAssigment = itemAssigment;
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

    public ItemAssigment getItemAssigment() {
        return itemAssigment;
    }

    public void setItemAssigment(ItemAssigment itemAssigment) {
        this.itemAssigment = itemAssigment;
    }

    @JsonIgnore
    public Assigment getAssigment() {
        return assigment;
    }

    public void setAssigment(Assigment assigment) {
        this.assigment = assigment;
    }


}
