const request = require("supertest");

describe("DummyJSON API Tests", () => {
  const api = request("https://dummyjson.com");

  it("GET /products returns product list", async () => {
    const res = await api.get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it("GET /users/1 returns user with id 1", async () => {
    const res = await api.get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("POST /auth/login should fail with wrong credentials", async () => {
    const res = await api.post("/auth/login").send({
      username: "wronguser",
      password: "wrongpass",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
