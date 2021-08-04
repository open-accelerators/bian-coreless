package com.redhat.coreless.poc.model;

import java.util.Objects;

public class FacilityApplicationReference {
    private String productCode;

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FacilityApplicationReference that = (FacilityApplicationReference) o;
        return Objects.equals(productCode, that.productCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productCode);
    }

    @Override
    public String toString() {
        return "FacilityApplicationReference{" +
                "productCode='" + productCode + '\'' +
                '}';
    }
}
