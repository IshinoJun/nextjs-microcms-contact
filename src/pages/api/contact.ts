import { NextApiResponse, NextApiRequest } from "next";
import { isContact } from "../../utils/TypeGuardUtils";

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const WRITE_API_KEY = process.env.WRITE_API_KEY;

  // クエリとAPIキーのチェック
  if (!isContact(req.body) || typeof WRITE_API_KEY === "undefined") {
    return res.status(404).end();
  }

  const content = await fetch(`https://XXXXXXXXXXXXXXXXXX.microcms.io/api/v1/contacts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-WRITE-API-KEY": WRITE_API_KEY,
    },
    body: JSON.stringify(req.body),
  })
    .then(() => "Created")
    .catch(() => null);

  // CMS側で正しく作成されたかチェック
  if (content !== "Created") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "OK" });

  res.end("Contact enabled");
};

export default contact;
