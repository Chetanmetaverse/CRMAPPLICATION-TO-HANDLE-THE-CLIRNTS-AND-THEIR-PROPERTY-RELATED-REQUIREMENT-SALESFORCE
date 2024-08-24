public class PropertHandler_LWC{

    @AuraEnabled(cacheable=true)

    public static list<Property__c> getProperty(string type , boolean verified){

        return [SELECT Id, Location__c, Property_Name__c, Type__c, Verified__c FROM Property__c Where Type__c =: type AND Verified__c =: verified];


    }

}