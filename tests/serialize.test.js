const { serialize } = require("../src/util");

test("serializes cookie names correctly", () => {
  expect(serialize("test")).toBe("spotify-oauth-refresher___test");
});
