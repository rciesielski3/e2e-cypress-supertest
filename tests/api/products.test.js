const { api } = require("./client");

const expectProductShape = (product) => {
  expect(product).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      price: expect.any(Number),
      category: expect.any(String),
      stock: expect.any(Number),
      tags: expect.any(Array),
    })
  );
};

describe("Products API", () => {
  it("GET /products returns a paginated list of well-formed products", async () => {
    const res = await api.get("/products");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        skip: 0,
        limit: expect.any(Number),
      })
    );
    expect(res.body.products.length).toBeGreaterThan(0);
    res.body.products.forEach(expectProductShape);
  });

  it("GET /products?limit=3&skip=3 honours pagination", async () => {
    const res = await api.get("/products").query({ limit: 3, skip: 3 });

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(3);
    expect(res.body.skip).toBe(3);
    expect(res.body.limit).toBe(3);
  });

  it("GET /products/1 returns the product with id 1", async () => {
    const res = await api.get("/products/1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expectProductShape(res.body);
  });

  it("GET /products/search?q=phone returns only matching products", async () => {
    const res = await api.get("/products/search").query({ q: "phone" });

    expect(res.status).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
    res.body.products.forEach(expectProductShape);
  });

  it("GET /products/{unknown id} returns 404 with an error message", async () => {
    const res = await api.get("/products/999999");

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
