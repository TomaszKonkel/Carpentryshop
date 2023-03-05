package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Assigment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;
    private boolean inCart;

    private boolean approved;

    private double totalPrice;

    private String customerName;
    private String customerLastName;
    private Integer customerPhoneNumber;

    @OneToMany(
            mappedBy = "assigment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProjectList> itemAssigment = new ArrayList<>();

    @OneToMany(
            mappedBy = "assigment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Resources> resources = new ArrayList<>();

    public Assigment() {
    }

    public Assigment(Long id, String name, LocalDate creationDate, boolean inCart, boolean approved, double totalPrice, String customerName, String customerLastName, Integer customerPhoneNumber, List<ProjectList> itemAssigment, List<Resources> resources) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.inCart = inCart;
        this.approved = approved;
        this.totalPrice = totalPrice;
        this.customerName = customerName;
        this.customerLastName = customerLastName;
        this.customerPhoneNumber = customerPhoneNumber;
        this.itemAssigment = itemAssigment;
        this.resources = resources;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isInCart() {
        return inCart;
    }

    public void setInCart(boolean inCart) {
        this.inCart = inCart;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerLastName() {
        return customerLastName;
    }

    public void setCustomerLastName(String customerLastName) {
        this.customerLastName = customerLastName;
    }

    public Integer getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(Integer customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public List<ProjectList> getItemAssigment() {
        return itemAssigment;
    }

    public void setItemAssigment(List<ProjectList> itemAssigment) {
        this.itemAssigment = itemAssigment;
    }

    public List<Resources> getResources() {
        return resources;
    }

    public void setResources(List<Resources> resources) {
        this.resources = resources;
    }
}
