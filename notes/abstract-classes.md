# Abstract Classes

- Can't be used to create an object directly
- Only used as a parent class
- Can contain real implementation for some methods
- The implemented methods can reer to other methods that don't actually exist yet (stil must provide names and types for the un-implemented methods)
- can make child classes promise to implement some other method

## Interfaces vs Abstract Classes

### Interfaces

- sets up a contract between different classes
- use when we have very different objects that we want to work toether
- promotes loose coupling

### Abstract Classes

- Sets up a contract between different classes
- use when we are trying to build up a definition of an object
- strongly couples classes together
