import { NubmersCollection } from "./NumbersCollection"
import { CharactersCollection } from "./CharactersCollection"
import { LinkedList } from "./LinkedList"
import { Sorter } from "./Sorter"


const numCol = new NubmersCollection([])
console.log(numCol.data)

const numCol1 = new NubmersCollection([1])
numCol1.sort()
console.log(numCol1.data)

const numCol2 = new NubmersCollection([-4,3,2,1])
numCol2.sort()
console.log(numCol2.data)

const numCol3 = new NubmersCollection([0,7,-6,3,2,8,5,1])
numCol3.sort()
console.log(numCol3.data) 

const numCol4 = new CharactersCollection(('[c, e, a, b, C ]'))
numCol4.sort()
console.log(numCol4.data) 

const linkedList = new LinkedList()
linkedList.add(500)
linkedList.add(-10)
linkedList.add(-3)
linkedList.add(4)
linkedList.add(44)


// linkedList.print()
linkedList.sort()
linkedList.print()