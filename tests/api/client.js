const request = require("supertest");

// Target API; override with API_BASE_URL (e.g. a local mirror of DummyJSON).
const BASE_URL = process.env.API_BASE_URL || "https://dummyjson.com";

module.exports = { api: request(BASE_URL), BASE_URL };
