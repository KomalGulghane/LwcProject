public class ApexController {
     //Sobject in Datatable
     @AuraEnabled(cacheable=true)
     public static List<String> getObjectNames() {
         List<String> objectNames = new List<String>();
         for (Schema.SObjectType objectType : Schema.getGlobalDescribe().Values()) {
             
                 objectNames.add(objectType.getDescribe().getName());
             
         }
         return objectNames;
     }
     @AuraEnabled(cacheable=true)
     public static List<sObject> getObjectRecords(String objectName) {
         List<sObject> records = new List<sObject>();
         
             String queryString = 'SELECT Id, Name, CreatedDate FROM ' + objectName;
             records = Database.query(queryString);
             system.debug('records result'+records);
         return records;
     }
}