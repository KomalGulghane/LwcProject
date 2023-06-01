import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import saveAssignment from '@salesforce/apex/AssignmentFormController.saveAssignment';

export default class AssignmentForm extends LightningElement {
    handleSubmit(event) {
        const fields = event.detail.fields;
        saveAssignment({ assignment: fields })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Assignment saved successfully',
                        variant: 'success',
                    })
                );
                location.reload();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }
}