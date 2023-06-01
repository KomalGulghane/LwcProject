public class AssignmentFormController {
    @AuraEnabled
    public static void saveAssignment(Assignment__c assignment) {
        insert assignment;
    }
}
