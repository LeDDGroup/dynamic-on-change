# dynamic-on-change

An utility for managing on change functions.
This is meant to be used with react components for avoiding binding instance methods.

Typescript support. Made in typescript ;)

## Example

```ts
import dynamicOnChange from "./index";
const a = {
  hello: "world",
  foo: 3,
};
const onChange = dynamicOnChange<typeof a>((key, value) => {
  a[key] = value;
});
onChange.foo(5);
expect(a).toMatchObject({ hello: "world", foo: 5 });
onChange.hello("me");
expect(a).toMatchObject({ hello: "me", foo: 5 });

// invalid in typescript
onChange.foo("hello"); // error: Argument of type '"hello"' is not assignable to parameter of type 'number'.
onChange.hello(3); // error: Argument of type '3' is not assignable to parameter of type 'string'.
onChange.asdf("me"); // error: Property 'asdf' does not exist on type 'dynamicOnChanges<{ hello: string; foo: number; }>'.
```
