"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NubmersCollection = void 0;
var NubmersCollection = /** @class */ (function () {
    function NubmersCollection(data) {
        this.data = data;
    }
    Object.defineProperty(NubmersCollection.prototype, "length", {
        /**
         * this `get` keyword allows us to use `length` a bit more naturally
         * once we have an instance of `NumbersCollection` we can access the length
         * using dot notation:
         * const myNumCol = new NumbersCollection([1,3,4])
         * myNumCol.length will return 3
         * instead of having to do:
         * myNumCol.length()
         */
        get: function () {
            return this.data.length;
        },
        enumerable: false,
        configurable: true
    });
    NubmersCollection.prototype.compare = function (leftIndex, rightIndex) {
        return this.data[leftIndex] > this.data[rightIndex];
    };
    NubmersCollection.prototype.swap = function (leftIndex, rightIndex) {
        var leftHandSide = this.data[leftIndex];
        this.data[leftIndex] = this.data[rightIndex];
        this.data[rightIndex] = leftHandSide;
    };
    return NubmersCollection;
}());
exports.NubmersCollection = NubmersCollection;
