import { Request, Response } from "express";
import { CreateMovieUC } from "../../business/usecase/createMovie";
import { MoviesDB } from "../../data/moviesDB";

export const createMovieEndpoint = async (req: Request, res: Response) => {
  try {
    const createMovieUC = new CreateMovieUC(new MoviesDB())
    const result = await createMovieUC.execute({
      title: req.body.title,
      date: req.body.date,
      synopsis: req.body.synopsis,
      link: req.body.link,
      length: req.body.length,
      picture: req.body.picture
    })
    res.status(200).send(result)
  } catch(err) {
    res.status(err.errorCode || 400).send({
      message: err.message,
      ...err
    })
  }
}