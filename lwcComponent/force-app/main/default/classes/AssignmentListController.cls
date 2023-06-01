public class AssignmentListController {
    @AuraEnabled(cacheable=true)
    public static List<Assignment__c> getAssignments(String searchTerm) {
        String query = 'SELECT Id, Title__c, Description__c, DueDate__c, Status__c, Priority__c, AssignmentGroup__r.Name ' +
                       'FROM Assignment__c ';
        
        String searchTermClause = 'WHERE Title__c LIKE \'%' + searchTerm + '%\' OR Priority__c LIKE \'%' + searchTerm + '%\'';
        query += searchTermClause;
        
        query += ' ORDER BY DueDate__c ASC';
        
        return Database.query(query);
    }
}
