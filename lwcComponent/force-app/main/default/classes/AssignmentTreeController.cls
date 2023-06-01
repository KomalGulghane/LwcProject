public class AssignmentTreeController {
    @AuraEnabled(cacheable=true)
    public static List<AssignmentGroup__c> getAssignmentGroup() {
        return [SELECT Id, Name,
                (SELECT Id,Name,Title__c, Description__c, DueDate__c, Status__c, Priority__c
                 FROM Assignments__r)
                FROM AssignmentGroup__c];
    }
}
