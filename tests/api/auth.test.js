const { api } = require("./client");

// Public demo account documented by DummyJSON (https://dummyjson.com/docs/auth).
const DEMO_USER = { username: "emilys", password: "emilyspass" };

describe("Auth API", () => {
  it("POST /auth/login with wrong credentials returns 400 and a message", async () => {
    const res = await api
      .post("/auth/login")
      .send({ username: "wronguser", password: "wrongpass" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("POST /auth/login with the demo account returns tokens, usable on /auth/me", async () => {
    const login = await api.post("/auth/login").send(DEMO_USER);

    expect(login.status).toBe(200);
    expect(login.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: DEMO_USER.username,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );

    const me = await api
      .get("/auth/me")
      .set("Authorization", `Bearer ${login.body.accessToken}`);

    expect(me.status).toBe(200);
    expect(me.body.username).toBe(DEMO_USER.username);
  });

  it("GET /auth/me without a token is rejected", async () => {
    const res = await api.get("/auth/me");

    expect(res.status).toBe(401);
  });
});
