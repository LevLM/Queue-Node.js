const request = require('supertest')
const app = require('./queue')

describe("POST:", () => {
    test("server respond 200 status code /newElement and content-type is json", async () => {
        const response = await request(app).post("/newElement").send({user: "user"})
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
})

describe("POST:", () => {
    test("when the user is missing should respond with a status code of 400", async () => {
      const bodyData = [{}]
      for (const body of bodyData) {
        const response = await request(app).post("/newElement").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
})

describe("POST:", () => {
    test("when input don't correct (integer)", async () => {
      const response = await request(app).post("/newElement").send('333')
      expect(response.statusCode).toBe(400)
    })
})



// describe("POST:", () => {
//   afterAll(async () => {await request(app).delete("/remove")})
//   it("when input don't correct (without value)", async () => {
//     const bodyData = [{user}]
//     for (const body of bodyData) {
//       const response = await request(app).post("/newElement").send(body)
//       expect(response.statusCode).toBe(400)
//     }
//   })
// })

// describe("POST:", () => {
//   test("when input don't correct (string)", async () => {
//     const bodyData = ['user']
//     for (const body of bodyData) {
//       const response = await request(app).post("/newElement").send(body)
//       expect(response.headers['content-type']).not.toEqual(expect.stringContaining("json"))
//     }
//   })
// })



describe("POST:", () => {
  afterAll(async () => {await request(app).delete("/remove")})
  it("when input correct but with added data ", async () => {
    const bodyData = [{user: "user", password: "password"}]
    for (const body of bodyData) {
      const response = await request(app).post("/newElement").send(body)
      expect(response.statusCode).toBe(200)
    }
  })
})

describe("DELETE:", () => {
    test("server respond 200 status code /remove", async () => {
      const response = await request(app).delete("/remove")
      expect(response.statusCode).toBe(200)
  })
})

describe("DELETE:", () => {
  const newElement = {user: "user"}
  beforeAll(async () => {await request(app).post("/newElement").send(newElement);})
  it("method DELETE remove element from queue", async () => {
    const response = await request(app).delete("/remove")
    expect(response.body).toBe('user deleted from queue, in queue now 0 elements');
  });
})  

describe("DELETE:", () => {
  test("method DELETE return Queue Is Empty", async () => {
    const response = await request(app).delete("/remove")
    expect(response.body).toBe('Queue Is Empty');
  });
})  

describe("GET:", () => {
  const newElement = {user: "user"}
  beforeAll(async () => {await request(app).post("/newElement").send(newElement);})
  afterAll(async () => {await request(app).delete("/remove")})
  it("server respond 200 status code /top and return top", async () => {
    const response = await request(app).get("/top");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('user is top element of queue')
  });
});

describe("GET:", () => {
  const newElement = {user: "user"}
  beforeAll(async () => {await request(app).post("/newElement").send(newElement);})
  afterAll(async () => {await request(app).delete("/remove")})
  it("server respond 200 status code /size and return correct length", async () => {
    const response = await request(app).get("/size");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Size of queue is 1');
  });
});

describe("GET, POST, DELETE for 2 elements:", () => {
  const newElement = {user: "user"}
  const newElement2 = {user: "user2"}
  beforeAll(async () => {
    await request(app).post("/newElement").send(newElement);
    await request(app).post("/newElement").send(newElement2);
  })
  afterAll(async () => {await request(app).delete("/remove")})
  it("server respond 200 status code /top and return peek of the queue", async () => {
    const response = await request(app).get("/top");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('user is top element of queue');
  });  
  it("method DELETE return element and remove it from queue", async () => {
    const response = await request(app).delete("/remove")
    expect(response.body).toBe('user deleted from queue, in queue now 1 elements');
  });
});
