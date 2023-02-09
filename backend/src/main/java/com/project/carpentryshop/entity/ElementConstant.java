package com.project.carpentryshop.entity;

import lombok.Builder;

import javax.persistence.*;


@Entity
public class ElementConstant extends Product{


        @Enumerated(value = EnumType.STRING)
        private ConstantCategory constantCategory;
        private int quantity;
        private float pricePerPiece;
        private double lengthInCm;
        private double widthInCm;

        private final String TYPE = "CONSTANT";


    public ElementConstant() {

    }

    public ElementConstant(Long id, String name, String description, String photos, ConstantCategory constantCategory, int quantity, float pricePerPiece, double lengthInCm, double widthInCm) {
        super(id, name, description, photos);
        this.constantCategory = constantCategory;
        this.quantity = quantity;
        this.pricePerPiece = pricePerPiece;
        this.lengthInCm = lengthInCm;
        this.widthInCm = widthInCm;

    }

    public ConstantCategory getConstantCategory() {
        return constantCategory;
    }

    public void setConstantCategory(ConstantCategory constantCategory) {
        this.constantCategory = constantCategory;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPricePerPiece() {
        return pricePerPiece;
    }

    public void setPricePerPiece(float pricePerPiece) {
        this.pricePerPiece = pricePerPiece;
    }

    public double getLengthInCm() {
        return lengthInCm;
    }

    public void setLengthInCm(double lengthInCm) {
        this.lengthInCm = lengthInCm;
    }

    public double getWidthInCm() {
        return widthInCm;
    }

    public void setWidthInCm(double widthInCm) {
        this.widthInCm = widthInCm;
    }

    public String getTYPE() {
        return TYPE;
    }
}
