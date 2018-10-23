import dynamicOnChange from "./index";

it("should work", () => {
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
});
