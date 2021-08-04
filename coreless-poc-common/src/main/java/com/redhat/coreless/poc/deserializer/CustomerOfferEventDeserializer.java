package com.redhat.coreless.poc.deserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.coreless.poc.model.CustomerOfferEvent;
import org.apache.kafka.common.errors.InvalidRequestException;
import org.apache.kafka.common.header.Headers;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

/**
 * The deserializer deserializes customer offer events from the customer offer topic into CustomerOfferEvent object
 */
public class CustomerOfferEventDeserializer implements Deserializer<CustomerOfferEvent> {
    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        Deserializer.super.configure(configs, isKey);
    }

    @Override
    public CustomerOfferEvent deserialize(String topic, byte[] data) {
        ObjectMapper mapper = new ObjectMapper();
        CustomerOfferEvent coe;
        try {
            coe = mapper.readValue(data, CustomerOfferEvent.class);
        } catch (Exception e) {
            throw new InvalidRequestException("Failed to deserilize kafka message from kafka topic " + topic);
        }

        return coe;
    }

    @Override
    public CustomerOfferEvent deserialize(String topic, Headers headers, byte[] data) {
        return Deserializer.super.deserialize(topic, headers, data);
    }

    @Override
    public void close() {
        Deserializer.super.close();
    }
}
