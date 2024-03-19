import express from "express";
import { Signup } from "./signup";
import { AccountDAOInMemory } from "./accountDAO";

const app = express();
app.use(express.json());

app.post("/signup", async (request, response) => {
  const accountDAO = new AccountDAOInMemory();
  const signup = new Signup(accountDAO);
  const output = await signup.execute(request.body);
  return response.json(output);
});

app.listen(3333);
