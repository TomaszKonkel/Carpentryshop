package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ItemAssigment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantityItemAssigment;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "furniture_id")
    private Furniture furniture;

    @ManyToOne
    @JoinColumn(name = "assigment_id")
    private Assigment assigment;

    @OneToMany(
            mappedBy = "itemAssigment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Resources> resources = new ArrayList<>();


    public ItemAssigment() {
    }

    public ItemAssigment(Long id, int quantityItemAssigment, LocalDate data, Furniture furniture, Assigment assigment, List<Resources> resources) {
        this.id = id;
        this.quantityItemAssigment = quantityItemAssigment;
        this.data = data;
        this.furniture = furniture;
        this.assigment = assigment;
        this.resources = resources;
    }

    @JsonIgnore
    public List<Resources> getResources() {
        return resources;
    }

    public void setResources(List<Resources> resources) {
        this.resources = resources;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantityItemAssigment() {
        return quantityItemAssigment;
    }

    public void setQuantityItemAssigment(int quantityItemAssigment) {
        this.quantityItemAssigment = quantityItemAssigment;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Furniture getFurniture() {
        return furniture;
    }

    public void setFurniture(Furniture furniture) {
        this.furniture = furniture;
    }

    @JsonIgnore
    public Assigment getAssigment() {
        return assigment;
    }

    public void setAssigment(Assigment assigment) {
        this.assigment = assigment;
    }


}