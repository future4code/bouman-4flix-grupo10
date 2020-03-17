import { Request, Response } from "express";
import { CreateSerieUC } from "../../business/usecase/createSerie";
import { SeriesDB } from "../../data/seriesDB";

export const createSerieEndpoint = async (req: Request, res: Response) => {
  try {
    const createSerieUC = new CreateSerieUC(new SeriesDB())
    const result = await createSerieUC.execute({
      title: req.body.title,
      date: req.body.date,
      synopsis: req.body.synopsis,
      link: req.body.link,
      picture: req.body.picture,
      episodes: req.body.episodes
    })
    res.status(200).send(result)
  } catch(err) {
    res.status(err.errorCode || 400).send({
      message: err.message,
      ...err
    })
  }
}