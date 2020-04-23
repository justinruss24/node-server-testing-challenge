const request = require("supertest");
const db = require("../data/dbConfig.js");

beforeEach(async () => {
  await db.seed.run();
});

const server = require("./server.js");

describe("server", () =>{
    describe("POST request to add account", () => {
        it("should return 200 status", async () => {
            const response = await (await request(server).post("/accounts")).setEncoding({
                id: 10,
                name: "newAcct1",
            });
            expect(response.status).toBe(201);
        })
        it("should return an array with all accounts", async () => {
            const response = await (await request(server).post("/accounts")).setEncoding({
                id: 15,
                name: "newAcct2"
            })
            expect(typeof response.body).toBe("object");
            expect(response.body).toEqual(expect.arrayContaining([16]));
        });
    });

    describe("DELETE route function", function () {
        it("should return a status of 200 and be the object", async function () {
            const response = await request(server).delete("/accounts/13");

            expect(response.status).toBe(200);
    });
        it("should return an object", async function () {
            const response = await request(server).delete("/accounts/13");

            expect(typeof response.body).toBe("object");
        });
    });
})