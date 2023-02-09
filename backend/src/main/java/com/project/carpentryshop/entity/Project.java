package com.project.carpentryshop.entity;

import lombok.Builder;

import javax.persistence.*;


@Entity
public class Project extends Product {

        @Enumerated(value = EnumType.STRING)
        private ProjectCategory projectCategory;
        private float basePrice;
        private double weight;

        private final String TYPE = "FURNITURE";


    public Project() {

    }

    public Project(Long id, String name, String description, String photos, ProjectCategory projectCategory, float basePrice, double weight) {
        super(id, name, description, photos);
        this.projectCategory = projectCategory;
        this.basePrice = basePrice;
        this.weight = weight;

    }

    public ProjectCategory getFurnitureCategory() {
        return projectCategory;
    }

    public void setFurnitureCategory(ProjectCategory projectCategory) {
        this.projectCategory = projectCategory;
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

}
