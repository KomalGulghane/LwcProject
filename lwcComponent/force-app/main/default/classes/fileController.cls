public class fileController {
    @AuraEnabled
    public static List<ContentDocument> getFiles() {
        List<ContentDocument> files = [SELECT Id, Title, FileType, CreatedById, CreatedDate FROM ContentDocument ORDER BY CreatedDate DESC];
        system.debug('files'+files);
        return files;
    }
    
    @AuraEnabled
    public static void deleteFile(String fileId) {
        ContentDocument fileToDelete = [SELECT Id, Title, FileType, CreatedById, CreatedDate FROM ContentDocument WHERE Id = :fileId];
          
            delete fileToDelete;
            system.debug('fileToDelete'+fileToDelete);
        
    }
}