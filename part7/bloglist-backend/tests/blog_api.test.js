const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blogs contain an id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  describe("when user is NOT signed in", () => {
    test("fails with a 401 status code", async () => {
      const newBlog = {
        author: "test author",
        url: "https://testurl.com/",
        title: "new title",
      };

      await api.post("/api/blogs").send(newBlog).expect(401);
    });
  });

  describe("when user is signed in", () => {
    let token;

    beforeAll(async () => {
      const username = "username";
      const password = "password";

      await User.deleteMany({});
      await api.post("/api/users").send({ username, password });

      const response = await api
        .post("/api/login")
        .send({ username, password });
      token = response.body.token;
    });

    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "test title",
        author: "test author",
        url: "https://testurl.com/",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((n) => n.title);
      expect(contents).toContain("test title");
    });

    test("without a likes property will default to zero likes", async () => {
      const newBlog = {
        title: "test title",
        author: "test author",
        url: "https://testurl.com/",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const blog = blogsAtEnd.find((b) => b.title === newBlog.title);
      expect(blog.likes).toBe(0);
    });

    test("without a title property with fail with a 400 status code", async () => {
      const newBlog = {
        author: "test author",
        url: "https://testurl.com/",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(400);
    });

    test("without a url property with fail with a 400 status code", async () => {
      const newBlog = {
        author: "test author",
        title: "test title",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(400);
    });
  });
});

describe("deletion of a blog", () => {
  describe("when is signed in", () => {
    test.skip("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const contents = blogsAtEnd.map((b) => b.title);
      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe("when user is not signed in", () => {
    test("fails with a 401 status code", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

      const contents = blogsAtEnd.map((b) => b.title);
      expect(contents).toContain(blogToDelete.title);
    });
  });
});

describe("updating a blog", () => {
  test("succeeds with status code 200", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 100 })
      .expect(200);
    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
    expect(updatedBlog.likes).toBe(100);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
