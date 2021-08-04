package com.redhat.coreless.poc.model;

import java.util.Objects;

public class CustomerOfferEvent {

    private String status;
    private CustomerOfferReference customerOfferReference;
    private CustomerReference customerReference;
    private FacilityApplicationReference facilityApplicationReference;
    private ConsumerLoanReference consumerLoanReference;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public CustomerOfferReference getCustomerOfferReference() {
        return customerOfferReference;
    }

    public void setCustomerOfferReference(CustomerOfferReference customerOfferReference) {
        this.customerOfferReference = customerOfferReference;
    }

    public CustomerReference getCustomerReference() {
        return customerReference;
    }

    public void setCustomerReference(CustomerReference customerReference) {
        this.customerReference = customerReference;
    }

    public FacilityApplicationReference getFacilityApplicationReference() {
        return facilityApplicationReference;
    }

    public void setFacilityApplicationReference(FacilityApplicationReference facilityApplicationReference) {
        this.facilityApplicationReference = facilityApplicationReference;
    }

    public ConsumerLoanReference getConsumerLoanReference() {
        return consumerLoanReference;
    }

    public void setConsumerLoanReference(ConsumerLoanReference consumerLoanReference) {
        this.consumerLoanReference = consumerLoanReference;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerOfferEvent that = (CustomerOfferEvent) o;
        return Objects.equals(status, that.status) && Objects.equals(customerOfferReference, that.customerOfferReference) && Objects.equals(customerReference, that.customerReference) && Objects.equals(facilityApplicationReference, that.facilityApplicationReference) && Objects.equals(consumerLoanReference, that.consumerLoanReference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, customerOfferReference, customerReference, facilityApplicationReference, consumerLoanReference);
    }

    @Override
    public String toString() {
        return "CustomerOfferEvent{" +
                "status='" + status + '\'' +
                ", customerOfferReference=" + customerOfferReference +
                ", customerReference=" + customerReference +
                ", facilityApplicationReference=" + facilityApplicationReference +
                ", consumerLoanReference=" + consumerLoanReference +
                '}';
    }
}
