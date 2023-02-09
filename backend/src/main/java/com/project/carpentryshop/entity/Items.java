package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;
    private boolean isActive;

    private double totalPrice;

    @OneToMany(
            mappedBy = "items",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ItemList> items = new ArrayList<>();

    public Items() {
    }

    public Items(Long id, String name, LocalDate creationDate, boolean isActive, double totalPrice, List<ItemList> items) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.isActive = isActive;
        this.totalPrice = totalPrice;
        this.items = items;
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

    public List<ItemList> getItems() {
        return items;
    }

    public void setItems(List<ItemList> items) {
        this.items = items;
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


}
