const updater = new (require("../src/lib/Updater"))({ clientId: "xxxxx", clientSecret: "xxxxx" });

test("updater sets refresh token correctly", () => {
  expect(updater.setRefreshToken("xxxxx")).toBe(updater);
  expect(updater.refreshToken).toBe("xxxxx");
});
