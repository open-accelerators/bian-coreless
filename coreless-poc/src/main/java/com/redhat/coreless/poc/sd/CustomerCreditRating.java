package com.redhat.coreless.poc.sd;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;

public class CustomerCreditRating extends RouteBuilder {

    /**
     * Defines Apache Camel routes using REST DSL fluent API.
     */
    public void configure() {
        from("direct:retrieveCustomerCreditRating").transform().constant("{\"rating\": 801}").setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200));
    }
}
