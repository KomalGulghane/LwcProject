import { LightningElement ,api,track} from 'lwc';
import ListCreateAccountRecord from '@salesforce/apex/AccountController.ListCreateAccountRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountDetailsCardCreateChild extends LightningElement {
    @api showModal;
    @track accountName;
    @track accountIndustry;
    @track accountType;
    @track accountAnnualRevenue;
  
    closeModal() {
      console.log('show result'+this.showModal);
      this.dispatchEvent(new CustomEvent('close'));
    }
  
    handleNameChange(event){
    this.accountName = event.target.value;
   }
      
   handleIndustryChange(event){
   this.accountIndustry = event.target.value;
   }
      
   handleTypeChange(event){
   this.accountType = event.target.value;
   }
      
   handleAnnualRevenueChange(event){
   this.accountAnnualRevenue = event.target.value;
   
   } 
  
   handleSaves(){
      ListCreateAccountRecord({accountName:this.accountName, accountIndustry:this.accountIndustry, 
        accountType:this.accountType, accountAnnualRevenue:this.accountAnnualRevenue})
        .then(accountDetails =>{
          console.log("accountDetails:" +JSON.stringify(accountDetails));
              const toastEvent = new ShowToastEvent({
              title: 'Success',
              message: 'Account record created successfully',
              variant: 'success',
          });
          this.dispatchEvent(toastEvent);
          location.reload();
              
          })
          .catch(error =>{
              console.log("error:" +JSON.stringify(error));
          })
      } 
}