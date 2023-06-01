public class AccountController {
    //account detail card (task) delete,update, create   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetails() {
      return [SELECT Id, Name, Industry, Type, AnnualRevenue 
      FROM Account 
      WHERE CreatedDate = TODAY 
      ORDER BY CreatedDate DESC 
      LIMIT 12];
    }

    //for delete       
    @AuraEnabled 
    public static List<Account> delAccRecord(String accountId){

      if(String.isNotBlank(accountId)){
      List<Account> acclistDelete = [SELECT Id, Name FROM Account WHERE ID=:accountId];
      delete acclistDelete;
      }
      return getAccountDetails();
      }
   

    //for update
    @AuraEnabled(cacheable=true)
    public static Account upateAccRecord(String accountId){

      if(String.isNotBlank(accountId)){
      Account acclistUpdate = [SELECT Id, Name ,Industry,Type,AnnualRevenue FROM Account WHERE Id=:accountId LIMIT 1];
      System.debug('acclistUpdate is:'+acclistUpdate);
      return acclistUpdate;
      }
      return null;
      }

    //-------------
    @AuraEnabled 
    public static List<Account> ListupdateAccountRecord(String accountId, String accountName, String accountIndustry, string accountType, Decimal accountAnnualRevenue){
     List<Account> newAcc= new List<Account>();

      if(String.isNotBlank(accountId)){
      Account Acc = new Account();
      Acc.Id = accountId;
      Acc.Name=accountName;
      Acc.Industry= accountIndustry;
      Acc.Type=accountType;
      Acc.AnnualRevenue= accountAnnualRevenue;
      newAcc.add(Acc);
      System.debug('acclistUpdate is:'+newAcc);
      }

      if(!newAcc.isEmpty()) {
       update newAcc;
      }
      return getAccountDetails();
      }

    // for create
    @AuraEnabled 
    public static List<Account> ListCreateAccountRecord(String accountName, String accountIndustry, String accountType, Decimal accountAnnualRevenue){
         List<Account> newAcc = new List<Account>();
         Account Acc = new Account();
         Acc.Name = accountName;
         Acc.Industry = accountIndustry;
         Acc.Type = accountType;
         Acc.AnnualRevenue = accountAnnualRevenue;
         newAcc.add(Acc);
         System.debug('acclistUpdate is:' + newAcc);
         insert newAcc;
         List<Account> accountList = [SELECT Id, Name, Industry, Type, AnnualRevenue 
                                      FROM Account 
                                      ORDER BY Name ASC];
         System.debug('acclistUpdate value:' + accountList);
         return accountList;
     }
     

     //  for search button
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchKey) {
      try {
         String queryString = 'SELECT Id, Name, Industry, Type, AnnualRevenue FROM Account WHERE CreatedDate = TODAY ';
         if (!String.isEmpty(searchKey)) {
            queryString += 'AND Name LIKE \'%' + searchKey + '%\'';
         }
         queryString += 'ORDER BY CreatedDate DESC LIMIT 12';
         system.debug('resultQuery:'+ queryString);
         return Database.query(queryString);
      }catch (Exception e) {
         throw new AccountHandleException('An error occurred while searching for accounts: ' + e.getMessage());
      }
   }
}