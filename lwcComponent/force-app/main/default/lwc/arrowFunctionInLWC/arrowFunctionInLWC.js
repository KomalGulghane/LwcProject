import { LightningElement ,track} from 'lwc';

export default class ArrowFunctionInLWC extends LightningElement {
    @track message = '';

    handleButtonClick = () => {
      this.message = 'Button Clicked!';
    };
}