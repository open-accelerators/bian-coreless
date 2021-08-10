package com.redhat.coreless.poc.model;

import java.util.Objects;

public class PartyRoutingState {
    private String customerOfferStatus;
    private String processId;

    public PartyRoutingState() {
    }

    public PartyRoutingState(String customerOfferStatus, String processId) {
        this.customerOfferStatus = customerOfferStatus;
        this.processId = processId;
    }

    public String getCustomerOfferStatus() {
        return customerOfferStatus;
    }

    public void setCustomerOfferStatus(String customerOfferStatus) {
        this.customerOfferStatus = customerOfferStatus;
    }

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyRoutingState that = (PartyRoutingState) o;
        return Objects.equals(processId, that.processId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(processId);
    }

    @Override
    public String toString() {
        return "PartyRoutingState{" +
                "customerOfferStatus=" + customerOfferStatus +
                ", processId='" + processId + '\'' +
                '}';
    }
}
