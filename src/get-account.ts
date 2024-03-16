import pgp from "pg-promise";

export async function getAccount(accountId: string): Promise<any> {
  const connection = pgp()(
    "postgres://postgres:postgres@localhost:5432/call_rider"
  );
  try {
    const [acc] = await connection.query(
      "select * from call_rider.account where account_id = $1",
      [accountId]
    );
    return acc;
  } finally {
    await connection.$pool.end();
  }
}
