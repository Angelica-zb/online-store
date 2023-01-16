const set = require("./set-num.ts");

test("Проверяем изменение количества товаров в корзине", () => {
  expect(set(5)).toBe(5);
});
test("Проверяем изменение количества товаров в корзине", () => {
  expect(set(0)).toBe(0);
});
test("Проверяем изменение количества товаров в корзине", () => {
  expect(set(10)).toBe(10);
});
test("Проверяем изменение количества товаров в корзине", () => {
  expect(set("10")).toBe("10");
});
test("Проверяем изменение количества товаров в корзине", () => {
  expect(set(NaN)).toBe(NaN);
});