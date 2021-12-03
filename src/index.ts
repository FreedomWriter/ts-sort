import { NubmersCollection } from "./NumbersCollection"
import { CharactersCollection } from "./CharactersCollection"
import { LinkedList } from "./LinkedList"
import { Sorter } from "./Sorter"


const numCol = new NubmersCollection([])
const sorter = new Sorter(numCol)
console.log(sorter.collection)

const numCol1 = new NubmersCollection([1])
const sorter1 = new Sorter(numCol1)
sorter1.sort()
console.log(sorter1.collection)

const numCol2 = new NubmersCollection([-4,3,2,1])
const sorter2 = new Sorter(numCol2)
sorter2.sort()
console.log(sorter2.collection)

const numCol3 = new NubmersCollection([0,7,-6,3,2,8,5,1])
const sorter3 = new Sorter(numCol3)
sorter3.sort()
console.log(sorter3.collection) 

const numCol4 = new CharactersCollection(('[c, e, a, b, C ]'))
const sorter4 = new Sorter(numCol4)
sorter4.sort()
console.log(sorter4.collection) 

const linkedList = new LinkedList()
linkedList.add(500)
linkedList.add(-10)
linkedList.add(-3)
linkedList.add(4)

const llSorter = new Sorter(linkedList)
linkedList.print()
llSorter.sort()
linkedList.print()