import { NextApiResponse } from "next";

export default async function handler(req, res: NextApiResponse<string>) {
  const { day } = req.query;
  const fetchResponse: Response = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
    method: 'GET',
    credentials: 'same-origin'
  });
  const result = await fetchResponse.text()
  res
    .status(200)
    .send(await result);
}
