package com.project.carpentryshop.entity;

import lombok.Builder;

import javax.persistence.*;


@Entity
public class ElementLiquid extends Product {


        @Enumerated(value = EnumType.STRING)
        private LiquidCategory liquidCategory;
        private float capacity;
        private int quantity;
        private double pricePerLiter;

    private final String TYPE = "LIQUID";

    public ElementLiquid() {

    }

    public ElementLiquid(Long id, String name, String description, String photos, LiquidCategory liquidCategory, float capacity, int quantity, double pricePerLiter) {
        super(id, name, description, photos);
        this.liquidCategory = liquidCategory;
        this.capacity = capacity;
        this.quantity = quantity;
        this.pricePerLiter = pricePerLiter;

    }

    public LiquidCategory getLiquidCategory() {
        return liquidCategory;
    }

    public void setLiquidCategory(LiquidCategory liquidCategory) {
        this.liquidCategory = liquidCategory;
    }

    public float getCapacity() {
        return capacity;
    }

    public void setCapacity(float capacity) {
        this.capacity = capacity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPricePerLiter() {
        return pricePerLiter;
    }

    public void setPricePerLiter(double pricePerLiter) {
        this.pricePerLiter = pricePerLiter;
    }

    public String getTYPE() {
        return TYPE;
    }
}
