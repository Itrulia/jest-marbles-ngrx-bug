# Jest marbles bug with Ngrx `overrideSelector`

While upgrading our repository from Nx 11.x & Angular 11.x to Nx 13.1.4 and Angular to v12.x we noticed all of our `expect(result).toBeObservable(expected)` that used `store.overrideSelector` started to fail. We narrowed it down to `jest-marbles` not properly working anymore.

## The issue

When you are using `@ngrx/store` and use the `MockStore` from `@ngrx/store/testing` and override a selector via `store.overrideSelector` it does not work when using `jest-marbles` `expect(result).toBeObservable(expected)`. When subscribing to the selector manually, the `store.overrideSelector` works as expected.

## Expected outcome

When you are using `@ngrx/store` and use the `MockStore` from `@ngrx/store/testing` and override a selector via `store.overrideSelector` the `expect(result).toBeObservable(expected)` assertion should work as expected.

## How to reproduce

In this repository I reproduced the issue with `jest-marbles` and copied the exact same test and replaced `jest-marbles` with `jasmine-marbles`.

### Setup

```bash
$ npm install
```

### Run the tests

You can either run all tests at once via:

```bash
$ npx jest
```

Or run the tests on their own via:

```bash
$ npx nx test jasmine-test
```

```bash
$ npx nx test jest-test
```


The tests for `jasmine-marbles` are located at `libs/jasmine-test/src/lib/test.component.spec.ts`.

The tests for `jest-marbles` are located at `libs/jest-test/src/lib/test.component.spec.ts`.

The component that is being tested is located at `libs/test/src/lib/test.component.ts`.

## Example test outcomes


```bash
❯ nx test jest-test
 FAIL   jest-test  libs/jest-test/src/lib/test.component.spec.ts
  Jest Marbles
    ✕ should override the selector (toBeObservable hot) (37 ms)
    ✕ should override the selector (toBeObservable cold) (8 ms)
    ✓ should override the selector (subscribe) (4 ms)
```

```bash
❯ nx test jasmine-test
 PASS   jasmine-test  libs/jasmine-test/src/lib/test.component.spec.ts
  Jasmine Marbles
    ✓ should override the selector (toBeObservable hot) (32 ms)
    ✓ should override the selector (toBeObservable cold) (9 ms)
    ✓ should override the selector (subscribe) (7 ms)
```

## We tried and didn't try

**We did try the following:**

* Downgrading rxjs to ^6.0.0
* Downgrading jasmine-marbles to ^2.0.0
* Downgrading @ngrx/store to ^11.0.0
* Using jasmine-marbles instead of jest-marbles -> This worked

**We didn't try the following:**

* Downgrading Jest -> But this is most likely what broke the jest-marbles behaviour

