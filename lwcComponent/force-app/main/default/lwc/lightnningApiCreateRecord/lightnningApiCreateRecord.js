import { LightningElement , wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
export default class LightnningApiCreateRecord extends LightningElement {
    @wire(getRecord, { recordId: '0032w00001536sxAAA', fields: ['Contact.Name', 'Contact.Title'] })
    contact;
}