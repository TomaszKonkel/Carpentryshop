package com.project.carpentryshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ProjectList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantityItemAssigment;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "furniture_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assigment_id")
    private Assigment assigment;

    @OneToMany(
            mappedBy = "projectList",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Resources> resources = new ArrayList<>();


    public ProjectList() {
    }

    public ProjectList(Long id, int quantityItemAssigment, LocalDate data, Project project, Assigment assigment, List<Resources> resources) {
        this.id = id;
        this.quantityItemAssigment = quantityItemAssigment;
        this.data = data;
        this.project = project;
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

    public Project getProject() {
        return project;
    }

    public void setFurniture(Project project) {
        this.project = project;
    }

    @JsonIgnore
    public Assigment getAssigment() {
        return assigment;
    }

    public void setAssigment(Assigment assigment) {
        this.assigment = assigment;
    }


}