package com.project.carpentryshop.entity;

import javax.persistence.*;

@Entity
public class Furniture extends Product {

        @Enumerated(value = EnumType.STRING)
        private FurnitureCategory furnitureCategory;
        private float basePrice;
        private double weight;

        private String TYPE = "FURNITURE";


    public Furniture() {

    }

    public Furniture(Long id, String name, String description, String photos, FurnitureCategory furnitureCategory, float basePrice, double weight, String TYPE) {
        super(id, name, description, photos);
        this.furnitureCategory = furnitureCategory;
        this.basePrice = basePrice;
        this.weight = weight;
        this.TYPE = TYPE;
    }

    public FurnitureCategory getFurnitureCategory() {
        return furnitureCategory;
    }

    public void setFurnitureCategory(FurnitureCategory furnitureCategory) {
        this.furnitureCategory = furnitureCategory;
    }

    public float getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(float basePrice) {
        this.basePrice = basePrice;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getTYPE() {
        return TYPE;
    }

    public void setTYPE(String TYPE) {
        this.TYPE = TYPE;
    }
}
