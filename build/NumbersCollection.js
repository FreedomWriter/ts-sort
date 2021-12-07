"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NubmersCollection = void 0;
var Sorter_1 = require("./Sorter");
var NubmersCollection = /** @class */ (function (_super) {
    __extends(NubmersCollection, _super);
    function NubmersCollection(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
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
}(Sorter_1.Sorter));
exports.NubmersCollection = NubmersCollection;
