const updater = new (require("../src/lib/Updater"))({ clientId: "xxxxx", clientSecret: "xxxxx" });

test("updater sets access token correctly", () => {
  expect(updater.setAccessToken("xxxxx")).toBe(updater);
  expect(updater.accessToken).toBe("xxxxx");
});
