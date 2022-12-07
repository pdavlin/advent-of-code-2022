import { NextApiResponse } from "next";
import get from "axios";

export default async function handler(req, res: NextApiResponse<any>) {
  const { cookie } = JSON.parse(req.body);
  const { day } = req.query;
  const aocResponse = await get(
    `https://adventofcode.com/2022/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${cookie}`,
      },
      withCredentials: true,
    }
  );
  res.status(200).send(aocResponse.data);
}
