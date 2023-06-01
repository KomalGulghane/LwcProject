import { LightningElement, track, wire } from 'lwc';
import getAssignmentGroup from '@salesforce/apex/AssignmentTreeController.getAssignmentGroup';

export default class AssignmentTree extends LightningElement {
    @track assignmentGroups;
    error;

    columns = [
        { label: 'Group Name', fieldName: 'Name', type: 'text' },
        // { label: 'Assignment Name', fieldName: 'Assignment__r.Name', type: 'text' },
        { label: 'Title', fieldName: 'Title__c', type: 'text' },
        { label: 'Description', fieldName: 'Description__c', type: 'text' },
        { label: 'Due Date', fieldName: 'DueDate__c', type: 'date' },
        { label: 'Status', fieldName: 'Status__c', type: 'text' },
        { label: 'Priority', fieldName: 'Priority__c', type: 'text' }
    ];

    @wire(getAssignmentGroup)
    wiredAssignmentGroups({ error, data }) {
        if (data) {
            let parseData = JSON.parse(JSON.stringify(data));
            // without forloop 
            for (let i = 0; i < parseData.length; i++) {
                parseData[i]._children = parseData[i]["Assignments__r"];
            }
            this.assignmentGroups = parseData;
        } else if (error) {
            this.error = error;
            this.assignmentGroups = undefined;
        }
    }
}


    

