const { api } = require("./client");

describe("Users API", () => {
  it("GET /users/1 returns the user with id 1 and the expected shape", async () => {
    const res = await api.get("/users/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.stringContaining("@"),
        username: expect.any(String),
        address: expect.objectContaining({ city: expect.any(String) }),
      })
    );
  });

  it("GET /users/{unknown id} returns 404 with an error message", async () => {
    const res = await api.get("/users/999999");

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
