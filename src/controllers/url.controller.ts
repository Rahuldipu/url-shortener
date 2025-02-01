import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Url from "../models/url.model";

export const shortenUrl = async (req: Request, res: Response) => {
  const { originalUrl, customAlias, expiryDate } = req.body;
  const userId = (req as any).user.userId;

  const shortUrl = customAlias || uuidv4().slice(0, 8);

  const newUrl = await Url.create({ originalUrl, shortUrl, userId, expiryDate });

  res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });
};

export const redirectUrl = async (req: Request, res: Response): Promise<any> => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });

  if (!url) return res.status(404).json({ message: "URL not found" });

  url.visits += 1;
  await url.save();
  res.redirect(url.originalUrl);
};

export const getUrlStatistics = async (req: Request, res: Response): Promise<any> => {
  try {
    const { shortUrl } = req.params;

    const urlData = await Url.findOne({ shortUrl });

    if (!urlData) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    return res.status(200).json({
      originalUrl: urlData.originalUrl,
      visits: urlData.visits,
      createdAt: urlData.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
