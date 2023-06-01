import { LightningElement , api, wire ,track} from 'lwc';
import upateAccRecord from '@salesforce/apex/AccountController.upateAccRecord';
import ListupdateAccountRecord from '@salesforce/apex/AccountController.ListupdateAccountRecord';
import getAccountDetails from '@salesforce/apex/AccountController.getAccountDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountDetailsCardUpdateChild extends LightningElement {
    @api showModal;
    @api parentdata;
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
  
    @wire(upateAccRecord, { accountId: '$parentdata' })
    wiredAccount(result) {
      if (result.data) {
        this.accountName =result.data.Name;
        console.log('accountname print:'+this.accountName);
        this.accountIndustry = result.data.Industry;
        this.accountType = result.data.Type;
        this.accountAnnualRevenue = result.data.AnnualRevenue;
      } 
    }
  
    handleSave(){
      ListupdateAccountRecord({accountId:this.parentdata , accountName:this.accountName, accountIndustry:this.accountIndustry, 
      accountType:this.accountType, accountAnnualRevenue:this.accountAnnualRevenue})
      .then(accountDetails =>{
          console.log("accountDetails:" +JSON.stringify(accountDetails));
          const toastEvent = new ShowToastEvent({
              title: 'Success',
              message: 'Account record updated successfully',
              variant: 'success',
          });
          this.dispatchEvent(toastEvent);
          location.reload();
          
      })
      .catch(error =>{
          console.log("error:" +JSON.stringify(error));
      })
      this.dispatchEvent(new CustomEvent('close'));
  }
}