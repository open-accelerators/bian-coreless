package com.redhat.coreless.poc.model;

import java.util.Objects;

public class CustomerOfferReference {
    private String id;
    private String status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerOfferReference that = (CustomerOfferReference) o;
        return Objects.equals(id,that.id) && Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status);
    }

    @Override
    public String toString() {
        return "CustomerOfferReference{" +
                "id=" + id +
                ", status='" + status + '\'' +
                '}';
    }
}
