package com.project.carpentryshop.entity;

import javax.persistence.*;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private String name;
        private String description;

        private String photos;

        private boolean productStatus;



    public Product() {
    }

    public Product(Long id, String name, String description, String photos) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photos = photos;

    }

    public String getPhotos() {
        if (photos == null || id == null) return null;

        return "http://127.0.0.1:8887" + "/" + id + "/" + photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isProductStatus() {
        return productStatus;
    }

    public void setProductStatus(boolean productStatus) {
        this.productStatus = productStatus;
    }
}
