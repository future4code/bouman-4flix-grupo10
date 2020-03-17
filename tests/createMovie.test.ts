import { MovieGateway } from "../src/business/gateways/MovieGateway";
import { CreateMovieUC } from "../src/business/usecase/createMovie";


const movieGatewayImplementation: MovieGateway = {
  createMovie: jest.fn(),
  getMedia: jest.fn()
}

describe("Tests CreateMovieUC", () => {
  it("Return an error if no data has been sent", async () => {
    movieGatewayImplementation.createMovie = jest
      .fn()
      .mockReturnValueOnce(undefined)
    
      const uc = new CreateMovieUC(movieGatewayImplementation)
      // try {
      //   await uc.execute({
      //     title: "",
      //     date: new Date,
      //     synopsis: "",
      //     link: "",
      //     length: 100,
      //     picture: ""
      //   })
      // } catch (err) {
      //   expect(err).toEqual(new Error("Missing parameters"))
      // }
      expect(uc.execute(input: undefined)).rejects.toThrow(new Error("Parametres not defined"))
  });



})