import express from "express";
import { Signup } from "./signup";
import { AccountDAOInMemory } from "./accountDAO";
import { GetAccount } from "./get-account";

const app = express();
app.use(express.json());

app.post("/signup", async (request, response) => {
  const accountDAO = new AccountDAOInMemory();
  const signup = new Signup(accountDAO);
  const output = await signup.execute(request.body);
  return response.json(output);
});

app.get("/accounts/:id", async (request, response) => {
  const accountDAO = new AccountDAOInMemory();
  const getAccount = new GetAccount(accountDAO);
  const output = await getAccount.execute(request.params.id);

  return response.json(output);
});

app.listen(3333);
