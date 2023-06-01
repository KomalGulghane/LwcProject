import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getFiles from '@salesforce/apex/fileController.getFiles';
import deleteFile from '@salesforce/apex/fileController.deleteFile';

const COLUMNS = [
    {
        typeAttributes: {
            label: { fieldName: 'Title' },
            iconPosition: 'left'
        },
        cellAttributes: {
            iconName: { fieldName: 'FileTypeIconName' }
        },
        label: 'File Name',
        fieldName: 'Title',
        type: 'text'
    },
    { label: 'File Type', fieldName: 'FileType', type: 'text' },
    { label: 'File Created Date', fieldName: 'CreatedDate', type: 'date' },
    {
        label: '',
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'View', name: 'view' },
                { label: 'Delete', name: 'delete' }
            ]
        }
    }
];

export default class FileUploadDatatable extends NavigationMixin(LightningElement) {
    @track fileList = [];
    @track pageNumber = 1;
    @track pageSize = 5;
    @track bDisableFirst = true;
    @track bDisableLast = false;
    @track totalRecords = 0;
    @track totalPages = 0;
    records = [];

    connectedCallback() {
        this.loadFiles();
    }

    loadFiles() {
        getFiles()
            .then(result => {
                console.log('this.fileList', this.fileList);
                this.fileList = result.map(file => ({
                    ...file,
                    FileTypeIconName: this.getFileTypeIconName(file.FileType)
                }));
                this.records = this.fileList;
                this.totalRecords = this.fileList.length;
                this.getPaginationLogic();
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    getPaginationLogic() {
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.fileList = this.records.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
        console.log('this.fileList result'+this.fileList);
        if (this.fileList.length === 0) {
            this.bDisableLast = true;
            this.bDisableFirst = true;
        } else {
            this.bDisableFirst = this.pageNumber === 1;
            this.bDisableLast = this.pageNumber === this.totalPages;
        }
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
   
    getFileTypeIconName(fileType) {
        console.log(fileType);
        if (fileType === "PDF") {
            return "doctype:pdf";
        } else if (fileType === "PNG" || fileType === "JPG") {
            return "doctype:image";
        } else if (fileType === "DOC" || fileType === "DOCX") {
            return "doctype:word";
        } else if (fileType === "XLS" || fileType === "XLSX") {
            return "doctype:excel";
        } else if (fileType === "XML") {
            return "doctype:xml";
        }
        return "doctype:attachment";
    }

    handleRowAction(event) {
        const action = event.detail.action.name;
        const row = event.detail.row;
        switch (action) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__namedPage',
                    attributes: {
                        pageName: 'filePreview'
                    },
                    state: {
                        recordIds: row.Id,
                        selectedRecordId: row.Id,
                       
                    }
                });
                break;
            case 'delete':
                this.handleDeleteClick(row.Id);
                break;
            default:
                break;
        }
    }

    handleDeleteClick(fileId) {
        if (confirm('Are you sure you want to delete this file?')) {
            deleteFile({ fileId: fileId })
                .then(() => {
                    const index = this.fileList.findIndex(file => file.Id === fileId);
                    if (index > -1) {
                        this.fileList.splice(index, 1);
                    }
                    this.loadFiles();
                    this.getPaginationLogic();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    handleUploadFinished() {
        this.loadFiles();
        this.pageNumber = 1;
    }


    get columns() {
        return [
            ...COLUMNS
        ];
    }
}