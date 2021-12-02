class Sorter {
    constructor(public collection:  number[] | string[]) {  
    }

    sort(): void {
        const {length} = this.collection;
        for( let i = 0; i < length; i++) {
            for( let j = 0; j < length - i - 1; j++) {
                if(this.collection[j] > this.collection[j+1]) {
                    const leftHandSide = this.collection[j];
                    this.collection[j] = this.collection[j + 1]
                    this.collection[j + 1] = leftHandSide
                }
            }   
        }
    }
}

const sorter = new Sorter([])

console.log(sorter.collection)
const sorter1 = new Sorter([1])
sorter1.sort()
console.log(sorter1.collection)
const sorter2 = new Sorter([-4,3,2,1])
sorter2.sort()
console.log(sorter2.collection)
const sorter3 = new Sorter([0,7,-6,3,2,8,5,1])
sorter3.sort()
console.log(sorter3.collection) 
const sorter4 = new Sorter((["a", "b", "f", "c", "e"]))
sorter4.sort()
console.log(sorter4.collection)