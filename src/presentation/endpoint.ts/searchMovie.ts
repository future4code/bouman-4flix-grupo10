import { Request, Response } from "express";

export const searchMovieEndpoint = async (req: Request, res: Response) => {
  try {

  } catch(err) {
    res.status(err.errorCode || 400).send({
      message: err.message,
      ...err
    })
  }
}