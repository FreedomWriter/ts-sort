"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumbersCollection_1 = require("./NumbersCollection");
var Sorter_1 = require("./Sorter");
var numCol = new NumbersCollection_1.NubmersCollection([]);
var sorter = new Sorter_1.Sorter(numCol);
console.log(sorter.collection);
var numCol1 = new NumbersCollection_1.NubmersCollection([1]);
var sorter1 = new Sorter_1.Sorter(numCol1);
sorter1.sort();
console.log(sorter1.collection);
var numCol2 = new NumbersCollection_1.NubmersCollection([-4, 3, 2, 1]);
var sorter2 = new Sorter_1.Sorter(numCol2);
sorter2.sort();
console.log(sorter2.collection);
var numCol3 = new NumbersCollection_1.NubmersCollection([0, 7, -6, 3, 2, 8, 5, 1]);
var sorter3 = new Sorter_1.Sorter(numCol3);
sorter3.sort();
console.log(sorter3.collection);
// const numCol4 = new NubmersCollection(('["c", "e", "a", "b", "C" ]'))
// const sorter4 = new Sorter(numCol4)
// sorter4.sort()
// console.log(sorter4.collection) 
