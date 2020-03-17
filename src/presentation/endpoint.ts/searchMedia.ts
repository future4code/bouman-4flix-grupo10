import { Request, Response } from "express";
import { SearchMediaUC } from "../../business/usecase/searchMedia";
import { MoviesDB } from "../../data/moviesDB";
import { SeriesDB } from "../../data/seriesDB";

export const searchMediaEndpoint = async (req: Request, res: Response) => {
  try {
    const searchMediaUC = new SearchMediaUC(new MoviesDB(), new SeriesDB())
    const result = await searchMediaUC.execute({
      query: req.query.query,
      minLength: req.query.minLength,
      maxLength: req.query.maxLength
    })
    res.status(200).send(result)
  } catch(err) {
    res.status(err.errorCode || 400).send({
      message: err.message,
      ...err
    })
  }
}