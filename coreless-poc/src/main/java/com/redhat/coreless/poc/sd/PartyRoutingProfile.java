package com.redhat.coreless.poc.sd;

import com.redhat.coreless.poc.model.CustomerOfferEvent;
import com.redhat.coreless.poc.model.PartyRoutingState;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.kafka.common.errors.InvalidRequestException;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class PartyRoutingProfile extends RouteBuilder {

    private Map<String, Set<PartyRoutingState>> partyRoutingStateMap = new ConcurrentHashMap<>();

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
            if(partyRoutingStateList != null){
                exchange.getIn().setBody(partyRoutingStateList);
            }
        }).setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200));
    }

    public PartyRoutingState updatePartyRoutingState(Exchange exchange) {
        CustomerOfferEvent coe = exchange.getIn().getBody(CustomerOfferEvent.class);
        log.info("CustomerOfferEvent = " + coe.toString());
        String customerId = coe.getCustomerReference().getId();
        PartyRoutingState prs = new PartyRoutingState(coe.getCustomerOfferReference().getStatus(), coe.getCustomerOfferReference().getId());

        Set<PartyRoutingState> partyRoutingStateList = partyRoutingStateMap.computeIfAbsent(customerId, k -> new HashSet<>());
        partyRoutingStateList.add(prs);

        partyRoutingStateMap.forEach((key,partyRoutingState) -> log.info("A partyRoutesState with key: " + key + " value: " + partyRoutingState.toString() + "\n"));

        return prs;
    }
}
