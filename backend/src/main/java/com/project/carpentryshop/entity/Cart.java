package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;
    private boolean isActive;

    private double totalPrice;

    @OneToMany(
            mappedBy = "cart",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ItemCart> itemCart = new ArrayList<>();

    public Cart() {
    }

    public Cart(Long id, String name, LocalDate creationDate, boolean isActive, double totalPrice, List<ItemCart> itemCart) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.isActive = isActive;
        this.totalPrice = totalPrice;
        this.itemCart = itemCart;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrize) {
        this.totalPrice = totalPrize;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setItemCart(List<ItemCart> itemCart) {
        this.itemCart = itemCart;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public String getName() {
        return name;
    }

    public List<ItemCart> getItemCart() {
        return itemCart;
    }
}
