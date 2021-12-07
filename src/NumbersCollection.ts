import { Sorter } from "./Sorter";
export class NubmersCollection extends Sorter {
    constructor(public data: number[]) {
        super();
    }

    /**
     * this `get` keyword allows us to use `length` a bit more naturally
     * once we have an instance of `NumbersCollection` we can access the length
     * using dot notation:
     * const myNumCol = new NumbersCollection([1,3,4])
     * myNumCol.length will return 3
     * instead of having to do:
     * myNumCol.length()
     */

    get length(): number {
        return this.data.length
    }

    compare(leftIndex: number, rightIndex: number):boolean {
        return this.data[leftIndex] > this.data[rightIndex]
    }

    swap(leftIndex: number, rightIndex: number): void {
        const leftHandSide = this.data[leftIndex];
        this.data[leftIndex] = this.data[rightIndex];
        this.data[rightIndex] = leftHandSide;
    }
}
