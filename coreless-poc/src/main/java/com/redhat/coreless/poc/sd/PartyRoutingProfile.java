package com.redhat.coreless.poc.sd;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.coreless.poc.model.CustomerOfferEvent;
import com.redhat.coreless.poc.model.PartyRoutingState;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.kafka.common.errors.InvalidRequestException;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class PartyRoutingProfile extends RouteBuilder {

    private Map<String, Set<PartyRoutingState>> partyRoutingStateMap = new ConcurrentHashMap<>();

    private ObjectMapper mapper = new ObjectMapper();

    /**
     * Defines Apache Camel routes using REST DSL fluent API.
     */
    public void configure() {
        from("kafka:{{consumer.topic}}?brokers={{kafka.host}}&valueDeserializer=com.redhat.coreless.poc.deserializer.CustomerOfferEventDeserializer")
                .bean(this, "updatePartyRoutingState(${exchange})");

        from("direct:retrievePartyStateStatus").process(exchange -> {
            String sdReferenceId = exchange.getIn().getHeader("sdReferenceId", String.class);
            String crReferenceId = exchange.getIn().getHeader("crReferenceId", String.class);
            String bqReferenceId = exchange.getIn().getHeader("bqReferenceId", String.class);

            if(sdReferenceId == null || crReferenceId == null || bqReferenceId == null){
                throw new InvalidRequestException("Mandatory path variables are missing");
            }

            Set<PartyRoutingState> partyRoutingStateList = partyRoutingStateMap.get(crReferenceId);
            exchange.getIn().setBody(mapper.writeValueAsString(Objects.requireNonNullElse(partyRoutingStateList, Collections.emptySet())));
        }).setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200));
    }

    public PartyRoutingState updatePartyRoutingState(Exchange exchange) {
        CustomerOfferEvent coe = exchange.getIn().getBody(CustomerOfferEvent.class);
        log.info("CustomerOfferEvent = " + coe.toString());
        String customerId = coe.getCustomerReference().getId();
        final String customerOfferEventStatus = coe.getStatus();
        String customerOfferStatus = handleCustomerOfferStatus(customerOfferEventStatus);
        String processId = handleProcessId(customerOfferStatus, coe.getCustomerOfferReference().getId());
        PartyRoutingState prs = new PartyRoutingState(customerOfferStatus, processId);

        Set<PartyRoutingState> partyRoutingStateList = partyRoutingStateMap.computeIfAbsent(customerId, k -> new HashSet<>());
        partyRoutingStateList.forEach(e -> log.info("A partyRoutingStateList element " + e.toString() + " and hashcode " + e.hashCode()));
        log.info("A new partyRoutingStateList element " + prs + " and hashcode " + prs.hashCode());
        partyRoutingStateList.removeIf(e -> coe.getCustomerOfferReference().getId().equals(e.getProcessId()));
        partyRoutingStateList.add(prs);

        partyRoutingStateMap.forEach((key,partyRoutingState) -> log.info("A partyRoutesState with key: " + key + " value: " + partyRoutingState.toString() + "\n"));

        return prs;
    }

    private String handleProcessId(String customerOfferStatus, String customerOfferId) {
        if("0".equals(customerOfferStatus)){
            return customerOfferId;
        }

        return null;
    }

    private String handleCustomerOfferStatus(String customerOfferEventStatus) {
        String customerOfferStatus = null;
        if("OFFER_INITIATED".equals(customerOfferEventStatus)){
            customerOfferStatus = "0";
        } else if("OFFER_COMPLETED".equals(customerOfferEventStatus)){
            customerOfferStatus = "1";
        }

        return customerOfferStatus;
    }
}
