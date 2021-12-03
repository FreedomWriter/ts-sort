# Union types

The union type is what we see when we use the `or` operator ( | ) in typescript.

if we give something a type of:

```ts
const someFunc = (someVar: number[] | string): void => console.log(someVar);
```

Then we will only be able to access properites (or methods) on `someVar` that are common to both an array of numbers and a string!

```ts
someVar.length(); /* yes */
someVar.push(); /* no */
someVar.toUppercase(); /* no */
```

There is a way around this though!

## Type Guards

### Primitive types

for `numbers` `strings` `booleans` and `symbols`:

    use `typeof`

For every other type of value:

    use `instanceof`

So our logic might look like this:

```ts
if (someVar instance of Array) {
    // do array stuff
}
if (typeof someVar === 'string' ) {
    // do string stuff
}
```

While the above will work for the given implementation, it is not very flexible, if we wanted to use `someFunc` for a type other than string, or an array of numbers, we would need to do some real refactoring to make it possible.
