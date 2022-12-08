// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
const dir = './pages/solutions';

let daysComplete = 1;
fs.readdir(dir, (err, files) => {
  daysComplete = files.length;
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  res
    .status(200)
    .send(`${daysComplete - 1}`); // account for template file
}
