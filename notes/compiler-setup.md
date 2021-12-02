# Compiler Setup

We could just run our ts code using the command `tsc` followed by a space and the typescript file we want to run's name (including .ts). TS will then compile that file and spit out an equivilent JS file. Every time we compile another TS file, we end up with another JS file. Let's take some steps to keep our project clean and organized:

- At the root level, create a `src` directory and a `build` directory
- generate a tsconfig file:
  `tsc --init`
- find 2 settings in the `tsconfig.json` file that was just created:
  `outDir` and `rootDir`
  `rootDir` is a relative path reference to the directory that holds all of our source code
  `outDir` is a relative path reference to the directory that will hold all of our compiled (js) code
  ```json
  "rootDir": "./src",
  "outDir": "./build",
  ```

Once completed, we can now run `tsc` and the compiler will run all of our ts code that lives in the `src` directory, compile it to js code and place the js in the `build` directory

We can pass tsc a watch flag:

```node
tsc - w;
```

Our code will continue to be compiled every time a file changes until we quit

## Concurrent Compilation and Execution

Install:

- npm i nodemon concurrently

```json
"scripts": {
    "start:build": "tsc -w", /* ts compiler */
    "start:run": "nodemon build/index.js", /* `build/index.js` = entrypoint */
    "start": "concurrently npm:start:*"
},
```

    nodemon will allow us to execute our code once it has been compiled
    concurrently will allow us to run muliple scripts at the same time
        - we need to run multiple scripts simultaneously, `concurrently` gives us this ability.

We will now be able to compile our code and run it, everytime we make a change to a file by running:

```node
npm start
```
