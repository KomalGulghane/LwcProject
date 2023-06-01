import { LightningElement, wire, track } from 'lwc';
import getObjectNames from '@salesforce/apex/ApexController.getObjectNames';
import getObjectRecords from '@salesforce/apex/ApexController.getObjectRecords';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'Id' },
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
];
export default class DatatableWithSobject extends LightningElement {
       @track selectedAccountObject = '';
    @track accountObjectOptions = [{ label: 'All Types', value: '' }];
    @track pageNumber = 1;
    @track pageSize = 10;
    @track recordsToDisplay = [];
    @track bDisableFirst = true;
    @track bDisableLast = false;
    @track columns = columns;
    @track totalRecords = 0;
    @track totalPages = 0;
    records = [];

    @wire(getObjectNames)
    wiredObjectNames({ error, data }) {
        if (data) {
            const objects = data.map(name => ({ label: name, value: name }));
            console.log('objects Result'+objects);
            this.accountObjectOptions = this.accountObjectOptions.concat(objects);
            console.log('this.accountObjectOptions result'+this.accountObjectOptions);

            if (this.accountObjectOptions.length > 0) {
                this.selectedAccountObject = this.accountObjectOptions[0].value;
                console.log('this.selectedAccountObject result'+ this.selectedAccountObject);
                 
            }
        } else if (error) {
            console.error(error);
        }
    }

    handleAccountObjectChange(event) {
        this.selectedAccountObject = event.target.value;
        this.pageNumber = 1;
        this.getRecords();
    }

    getRecords() {
        getObjectRecords({ objectName: this.selectedAccountObject })
            .then(records => {
                this.records = records;
                this.totalRecords = this.records.length;
                this.getPaginationLogic();
            })
            .catch(error => {
                console.error(error);
            });
    }

    getPaginationLogic() {
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.recordsToDisplay = this.records.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
        console.log('this.recordsToDisplay result'+this.recordsToDisplay);
        if (this.recordsToDisplay.length === 0) {
            this.bDisableLast = true;
            this.bDisableFirst = true;
        } else {
            this.bDisableFirst = this.pageNumber === 1;
            this.bDisableLast = this.pageNumber === this.totalPages;
        }
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.getPaginationLogic();
    }

    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.getPaginationLogic();
    }
}