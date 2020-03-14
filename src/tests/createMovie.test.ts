import { MovieGateway } from "../business/gateways/MovieGateway"
import { CreateMovieUC } from "../business/usecase/createMovie"

const movieGatewayImplementation: MovieGateway = {
  createMovie: jest.fn()
}

describe("Tests CreateMovieUC", () => {
  it("Return an error if no data has been sent", async () => {
    movieGatewayImplementation.createMovie = jest
      .fn()
      .mockReturnValueOnce(undefined)
    
      const uc = new CreateMovieUC(movieGatewayImplementation)
      try {
        await uc.execute({
          title: "",
          date: new Date,
          synopsis: "",
          link: "",
          length: 100,
          picture: ""
        })
      } catch (err) {
        expect(err).toEqual(new Error("Missing parameters"))
      }
      
  })

})