import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Rating', fieldName: 'Rating' }
];

export default class LightningApiListUi extends LightningElement {
    @wire(getListUi, { objectApiName: 'Account', listViewApiName: 'RecentlyViewed' })
    accounts;

    get columns() {
        return COLUMNS;
    }
}