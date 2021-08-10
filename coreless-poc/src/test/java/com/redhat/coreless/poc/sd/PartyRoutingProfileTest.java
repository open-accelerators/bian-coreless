package com.redhat.coreless.poc.sd;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.coreless.poc.deserializer.CustomerOfferEventDeserializer;
import com.redhat.coreless.poc.model.PartyRoutingState;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.RoutesBuilder;
import org.apache.camel.support.DefaultExchange;
import org.apache.camel.support.DefaultMessage;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.apache.kafka.common.errors.InvalidRequestException;
import org.junit.Test;

import java.util.List;

public class PartyRoutingProfileTest extends CamelTestSupport {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void setUp() throws Exception {
        replaceRouteFromWith("consumeCustomerOfferEvent", "direct:createCustomerOfferEvent");
        super.setUp();
    }

    @Override
    protected RoutesBuilder createRouteBuilder() throws Exception {
        return new PartyRoutingProfile();
    }

    @Test
    public void testCorrectInput() throws Exception {
        CustomerOfferEventDeserializer kafkaDeserializer = new CustomerOfferEventDeserializer();
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_INITIATED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));

        Exchange exchange = createRetrievePartyStateStatusExchange("a", "654321", "c");

        final Exchange resultExchange = template.send("direct:retrievePartyStateStatus", exchange);
        final String result = resultExchange.getIn().getBody().toString();
        final List<PartyRoutingState> partyRoutingStates = mapper.readValue(result, new TypeReference<>() {});
        assertNotNull(partyRoutingStates);
        assertFalse(partyRoutingStates.isEmpty());
        assertEquals("11223344", partyRoutingStates.get(0).getProcessId());
        assertEquals("0", partyRoutingStates.get(0).getCustomerOfferStatus());
    }

    @Test
    public void testCompletedOffer() throws Exception {
        CustomerOfferEventDeserializer kafkaDeserializer = new CustomerOfferEventDeserializer();
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_COMPLETED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));

        Exchange exchange = createRetrievePartyStateStatusExchange("a", "654321", "c");

        final Exchange resultExchange = template.send("direct:retrievePartyStateStatus", exchange);
        final String result = resultExchange.getIn().getBody().toString();
        final List<PartyRoutingState> partyRoutingStates = mapper.readValue(result, new TypeReference<>() {});
        assertNotNull(partyRoutingStates);
        assertFalse(partyRoutingStates.isEmpty());
        assertNull(partyRoutingStates.get(0).getProcessId());
        assertEquals("1", partyRoutingStates.get(0).getCustomerOfferStatus());
    }

    @Test(expected = InvalidRequestException.class)
    public void testIncorrectCustomerOfferEvent() throws Exception {
        CustomerOfferEventDeserializer kafkaDeserializer = new CustomerOfferEventDeserializer();
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status1\": \"OFFER_INITIATED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));
    }

    @Test
    public void testCorrectInputWithCompletedCustomerOffer() throws Exception {
        CustomerOfferEventDeserializer kafkaDeserializer = new CustomerOfferEventDeserializer();
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_INITIATED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_COMPLETED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));

        Exchange exchange = createRetrievePartyStateStatusExchange("a", "654321", "c");

        final Exchange resultExchange = template.send("direct:retrievePartyStateStatus", exchange);
        final String result = resultExchange.getIn().getBody().toString();
        final List<PartyRoutingState> partyRoutingStates = mapper.readValue(result, new TypeReference<>() {});
        assertNotNull(partyRoutingStates);
        assertFalse(partyRoutingStates.isEmpty());
        assertNull(partyRoutingStates.get(0).getProcessId());
        assertEquals("1", partyRoutingStates.get(0).getCustomerOfferStatus());
    }

    @Test
    public void testCorrectInputWithMultipleCustomerOffer() throws Exception {
        CustomerOfferEventDeserializer kafkaDeserializer = new CustomerOfferEventDeserializer();
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_INITIATED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_INITIATED\",\"customerOfferReference\": {\"id\": \"99999999\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_INITIATED\",\"customerOfferReference\": {\"id\": \"444444\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));
        template.sendBody("direct:createCustomerOfferEvent", kafkaDeserializer.deserialize("", "{\"status\": \"OFFER_COMPLETED\",\"customerOfferReference\": {\"id\": \"11223344\",\"status\": \"pricing_accepted\"},\"customerReference\": {\"id\": \"654321\",\"name\": \"John Doe\"},\"facilityApplicationReference\": {\"productCode\": \"CL\"},\"consumerLoanReference\": {\"id\": \"CLSSR765266\",\"status\": \"INITIALIZED\"}}".getBytes()));

        Exchange exchange = createRetrievePartyStateStatusExchange("a", "654321", "c");

        final Exchange resultExchange = template.send("direct:retrievePartyStateStatus", exchange);
        final String result = resultExchange.getIn().getBody().toString();
        final List<PartyRoutingState> partyRoutingStates = mapper.readValue(result, new TypeReference<>() {});
        assertNotNull(partyRoutingStates);
        assertFalse(partyRoutingStates.isEmpty());
        assertEquals(3, partyRoutingStates.size());
        assertTrue(partyRoutingStates.contains(new PartyRoutingState("OFFER_COMPLETED", null)));
        assertTrue(partyRoutingStates.contains(new PartyRoutingState("OFFER_INITIATED", "99999999")));
        assertTrue(partyRoutingStates.contains(new PartyRoutingState("OFFER_INITIATED", "444444")));
    }

    @Test
    public void testNoCustomerOffer() throws Exception {
        Exchange exchange = createRetrievePartyStateStatusExchange("a", "654321", "c");

        final Exchange resultExchange = template.send("direct:retrievePartyStateStatus", exchange);
        final String result = resultExchange.getIn().getBody().toString();
        final List<PartyRoutingState> partyRoutingStates = mapper.readValue(result, new TypeReference<>() {});
        assertNotNull(partyRoutingStates);
        assertTrue(partyRoutingStates.isEmpty());
    }

    @Test
    public void testMissingRestParametersCall() throws Exception {
        Exchange exchange = createRetrievePartyStateStatusExchange("a", "654321", "");

        final Exchange resultExchange = template.send("direct:retrievePartyStateStatus", exchange);
        final String result = resultExchange.getIn().getBody().toString();
        final List<PartyRoutingState> partyRoutingStates = mapper.readValue(result, new TypeReference<>() {});
        assertNotNull(partyRoutingStates);
        assertTrue(partyRoutingStates.isEmpty());
    }

    private Exchange createRetrievePartyStateStatusExchange(String sdReferenceId, String crReferenceId, String bqReferenceId) {
        Exchange exchange = new DefaultExchange(context);
        Message in = new DefaultMessage(context);
        in.setHeader("sdReferenceId", sdReferenceId);
        in.setHeader("crReferenceId", crReferenceId);
        in.setHeader("bqReferenceId", bqReferenceId);
        exchange.setIn(in);
        return exchange;
    }

}
