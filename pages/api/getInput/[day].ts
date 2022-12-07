import { NextApiResponse } from "next";
import get from "axios";

export default async function handler(req, res: NextApiResponse<any>) {
  const { day } = req.query;
  const aocResponse = await get(
    `https://adventofcode.com/2022/day/${day}/input`,
    {
      headers: {
        Cookie:
          "session=53616c7465645f5f048bb998958f7aa4441626b964b5a41074f0d1b05099787e7d7de0a13e63415d57647f51bfe7d05542b604e5270749c4112abca207642ed9",
      },
      withCredentials: true,
    }
  );
  console.log(typeof aocResponse.data)
  res.status(200).send(aocResponse.data);
}
