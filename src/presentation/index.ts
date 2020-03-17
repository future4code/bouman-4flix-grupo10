import express, { Request, Response } from "express";
import { createMovieEndpoint } from "./endpoint.ts/createMovie";
import { createSerieEndpoint } from "./endpoint.ts/createSerie";
import { searchMediaEndpoint } from "./endpoint.ts/searchMedia";
import { searchMovieEndpoint } from "./endpoint.ts/searchMovie";
import { searchSerieEndpoint } from "./endpoint.ts/searchSerie";
import { searchEpisodeEndpoint } from "./endpoint.ts/searchEpisode";

const app = express();
app.use(express.json());

app.post('/newMovie', createMovieEndpoint)
app.post('/newSerie', createSerieEndpoint)
app.get('/search', searchMediaEndpoint)
app.get('/searchMovie/:id', searchMovieEndpoint)
app.get('/searchSerie/:id', searchSerieEndpoint)
app.get('/searchEpisode/:id', searchEpisodeEndpoint)

export default app;
