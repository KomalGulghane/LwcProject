import { LightningElement, wire, track, api } from 'lwc';
import getAssignments from '@salesforce/apex/AssignmentListController.getAssignments';

const columns = [
  { label: 'Title', fieldName: 'Title__c' },
  { label: 'Description', fieldName: 'Description__c' },
  { label: 'Due Date', fieldName: 'DueDate__c', type: 'date' },
  { label: 'Status', fieldName: 'Status__c' },
  { label: 'Priority', fieldName: 'Priority__c' },
  { label: 'Assignment Group', fieldName: 'AssignmentGroup__r.Name' }
];

export default class AssignmentList extends LightningElement {
  assignments;
  totalRecords;
  totalPages;
  recordsToDisplay;
  @track pageNumber = 1;
  @track pageSize = 4;
  @track bDisableFirst = true;
  @track bDisableLast = false;
  searchTerm = '';

  @wire(getAssignments, { searchTerm: '$searchTerm' })
  wiredAssignments({ error, data }) {
    if (data) {
      this.assignments = data;
      this.totalRecords = data.length;
      this.getPaginationLogic();
    } else if (error) {
      console.error(error);
    }
  }

//   @api
//   refreshData() {
//     this.searchTerm = '';
//     this.handleSearch();
//   }

  get columns() {
    return columns;
  }

  getPaginationLogic() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.recordsToDisplay = this.assignments.slice(
      (this.pageNumber - 1) * this.pageSize,
      this.pageNumber * this.pageSize
    );
    console.log('this.recordsToDisplay result:', this.recordsToDisplay);
    this.bDisableFirst = this.pageNumber === 1;
    this.bDisableLast = this.pageNumber === this.totalPages;
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this.getPaginationLogic();
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber = this.pageNumber + 1;
      this.getPaginationLogic();
    }
  }

  handleSearchChange(event) {
    this.searchTerm = event.target.value;
  }

  handleSearch() {
    this.pageNumber = 1;
    this.getPaginationLogic();
  }
}
