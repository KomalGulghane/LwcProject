import { LightningElement, wire, api,track } from 'lwc';
import getAccountDetails from '@salesforce/apex/AccountController.getAccountDetails';
import delAccRecord from '@salesforce/apex/AccountController.delAccRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
import searchAccounts from '@salesforce/apex/AccountController.searchAccounts';

export default class AccountDetailsCardParent extends LightningElement {
    currentRecordId;
    @track searchKey = '';
    IsCheck = false;
    showModal = false;
    showModalCreate = false;
    @wire(getAccountDetails) accounts;
    
   closeModal() {
   this.showModal = false;
   console.log('show result:'+ this.showModal);
 }
 
   handleChange(){
   this.IsCheck= true;
   this.currentRecordId = event.target.value;
 }
 
 //for delete
 callDelete() {
   if (this.IsCheck) {
     delAccRecord({ accountId: this.currentRecordId })
     .then(() => {
       const toastEvent = new ShowToastEvent({
           title: 'Success',
           message: 'Account record deleted successfully',
           variant: 'success',
       });
         this.dispatchEvent(toastEvent);
         location.reload();
       })
       .catch((error) => {
         this.error = error;
         console.log('Unable to delete the record due to ' + JSON.stringify(this.error));
       });
   } else {
     const toastEvent = new ShowToastEvent({
       title: 'Error',
       message: 'Please select the checkbox to delete the record.',
       variant: 'error',
     });
     this.dispatchEvent(toastEvent);
   }
 }
 
  //update 
 showModalPopup() {
   console.log('ischeckedResult'+this.IsCheck);
   if (this.IsCheck) {
     this.showModal = true;
   } else {
     const toastEvent = new ShowToastEvent({
       title: 'Error',
       message: 'Please select the checkbox to update the record.',
       variant: 'error',
     });
     this.dispatchEvent(toastEvent);
   }
 }
 
  //create
 closeModalCreate() {
 this.showModalCreate = false;
 console.log('show result1:'+ this.showModalCreate);
 }
 
 callCreate() {
 this.showModalCreate = true;
 }
 
 //search button
 handleSearchKeyChange(event) {
   this.searchKey = event.target.value;
   console.log('search handle change:'+this.searchKey);
 }
 
 handleSearch() {
   searchAccounts({ searchKey: this.searchKey })
       .then(result => {
           this.accounts = { data: result };
           console.log('search handle:'+this.accounts);
       })
       .catch(error => {
           this.accounts = { error: error.body.message };
       });
 }
   
}