"use strict";
var Sorter = /** @class */ (function () {
    function Sorter(collection) {
        this.collection = collection;
    }
    Sorter.prototype.sort = function () {
        var length = this.collection.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - i - 1; j++) {
                if (this.collection[j] > this.collection[j + 1]) {
                    var leftHandSide = this.collection[j];
                    this.collection[j] = this.collection[j + 1];
                    this.collection[j + 1] = leftHandSide;
                }
            }
        }
    };
    return Sorter;
}());
var sorter = new Sorter([]);
console.log(sorter.collection);
var sorter1 = new Sorter([1]);
sorter1.sort();
console.log(sorter1.collection);
var sorter2 = new Sorter([-4, 3, 2, 1]);
sorter2.sort();
console.log(sorter2.collection);
var sorter3 = new Sorter([0, 7, -6, 3, 2, 8, 5, 1]);
sorter3.sort();
console.log(sorter3.collection);
var sorter4 = new Sorter((["a", "b", "f", "c", "e"]));
sorter4.sort();
console.log(sorter4.collection);
