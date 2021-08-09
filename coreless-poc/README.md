# Coreless POC

This is a part of the BIAN coreless poc, a Red Hat implementation and demonstration of the [Party Routing Profile](https://bian.org/semantic-apis/customer-profile/) service domain.

* The service domain integrates with the [Customer Offer](https://bian.org/semantic-apis/customer-offer/) service domain by receiving customer offer event notifications via a Kafka Topic.
* The service domain integrates with the [Workbench](https://bian.org/semantic-apis/customer-workbench/) service domain by implementing retrieve party state status [Rest API](https://app.swaggerhub.com/apis/BIAN-3/CustomerProfile/2.0.0#/retrieve/retrievePartyStateStatus/customer-profile/{sdReferenceId}/party-state/{crReferenceId}/status/{bqReferenceId})
and returning the customer's offer process ids and the status of the offers.

##Technologies used

We use Camel and Camel K and Openshift to create the routes and to deploy the service an openshift installation.

##Running the POC

To run the POC you need to have an Openshift installation and Openshift commandline (oc), Camel K CLI (kamel), a Kafka topic and a maven repository containing the coreless-poc-common jar.

Perform the following steps:
* Configure application.properties with the Kafka details.
* Create coreless-poc-common jar and deploy it to the maven repository.
* Install the Camel K operator in Openshift and create an Integration Platform.

Run the following command:

```shell
kamel run -d mvn:com.redhat.bian-coreless:coreless-poc-common:0.0.1-SNAPSHOT src/main/java/com/redhat/coreless/poc/sd/PartyRoutingProfile.java --open-api PartyRoutingProfile.json --maven-repository http://nexus-mercury.bian-coreless-df320be24f0424156040b8c0440947c1-0000.us-south.containers.appdomain.cloud/repository/mercury@id=coreless-poc-nexus@snapshots@noreleases --maven-repository https://repo.maven.apache.org/maven2@id=central --property file:application.properties --name party-routing-profile
```

Command explanation:

* -d mvn:com.redhat.bian-coreless:coreless-poc-common:0.0.1-SNAPSHOT - We add the coreless-poc-common jar maven dependency.
* src/main/java/com/redhat/coreless/poc/sd/PartyRoutingProfile.java - The class containing our routes.
* --open-api PartyRoutingProfile.json - The json containing Party Routing Profile Rest APIs routes
* --maven-repository http://nexus-mercury.bian-coreless-df320be24f0424156040b8c0440947c1-0000.us-south.containers.appdomain.cloud/repository/mercury@id=coreless-poc-nexus@snapshots@noreleases - The nexus maven repository containing the coreless-poc-common jar
* --maven-repository https://repo.maven.apache.org/maven2@id=central - The central maven repository for fetching the maven dependencies
* --property file:application.properties - The properties file containing the Kafka details
* --name party-routing-profile - The name of the integration



