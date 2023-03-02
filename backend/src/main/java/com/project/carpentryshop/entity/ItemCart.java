package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class ItemCart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantityItemCart;
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
    private Cart cart;

    public ItemCart() {
    }

    public ItemCart(Long id, int quantityItemCart, LocalDate data, ElementConstant elementConstant, ElementLiquid elementLiquid, Cart cart) {
        this.id = id;
        this.quantityItemCart = quantityItemCart;
        this.data = data;
        this.elementConstant = elementConstant;
        this.elementLiquid = elementLiquid;
        this.cart = cart;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuantityItemCart(int quantityItemCart) {
        this.quantityItemCart = quantityItemCart;
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

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Long getId() {
        return id;
    }

    public int getQuantityItemCart() {
        return quantityItemCart;
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
    public Cart getCart() {
        return cart;
    }
}
