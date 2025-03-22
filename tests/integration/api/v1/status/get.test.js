test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3001/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parseUpdatedAt = new Date(responseBody.updated_At).toISOString();

  expect(responseBody.updated_At).toEqual(parseUpdatedAt);
  expect(responseBody.dependencies.database.version).toEqual("16.8");
  expect(responseBody.dependencies.database.max_Connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_Connections).toEqual(1);
});
