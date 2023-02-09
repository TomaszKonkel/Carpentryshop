package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class ItemList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantityItems;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;


    @ManyToOne
    @JoinColumn(name = "constant_id")
    private ElementConstant elementConstant;


    @ManyToOne
    @JoinColumn(name = "liquid_id")
    private ElementLiquid elementLiquid;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Items items;

    public ItemList() {
    }

    public ItemList(Long id, int quantityItemCart, LocalDate data, ElementConstant elementConstant, ElementLiquid elementLiquid, Items items) {
        this.id = id;
        this.quantityItems = quantityItemCart;
        this.data = data;
        this.elementConstant = elementConstant;
        this.elementLiquid = elementLiquid;
        this.items = items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuantityItems(int quantityItems) {
        this.quantityItems = quantityItems;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setElementConstant(ElementConstant elementConstant) {
        this.elementConstant = elementConstant;
    }

    public void setElementLiquid(ElementLiquid elementLiquid) {
        this.elementLiquid = elementLiquid;
    }

    public void setItems(Items items) {
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public int getQuantityItems() {
        return quantityItems;
    }

    public LocalDate getData() {
        return data;
    }

    public ElementConstant getElementConstant() {
        return elementConstant;
    }

    public ElementLiquid getElementLiquid() {
        return elementLiquid;
    }
    @JsonIgnore
    public Items getItems() {
        return items;
    }
}
