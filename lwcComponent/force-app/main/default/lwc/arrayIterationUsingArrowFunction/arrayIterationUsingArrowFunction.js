import { LightningElement } from 'lwc';

export default class ArrayIterationUsingArrowFunction extends LightningElement {
     fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

    handleButtonClick() {
        // Using arrow function with forEach iteration
        this.fruits.forEach((fruit) => {
            console.log('forEach:'+fruit);
        });

        // Using arrow function with map iteration
        const uppercaseFruits = this.fruits.map((fruit) => fruit.toUpperCase());
        console.log('map:'+uppercaseFruits);

        

       
        // Using arrow function with some iteration
        const hasLongFruitName = this.fruits.some((fruit) => fruit.length > 6);
        console.log('some:'+hasLongFruitName);

        // Using arrow function with every iteration
        const allFruitsAreLong = this.fruits.every((fruit) => fruit.length > 4);
        console.log('every:'+allFruitsAreLong);
    }  
}