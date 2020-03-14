import { v4 } from "uuid";
import { UserDB } from "../../data/userDB";
import { User } from "../entities/user";

export class SignupUC {
  constructor(private userDB: UserDB) {}

  public async execute(input: SignupUCInput): Promise<SignupUCOutput> {
    const id = v4();

    await this.userDB.createUser(new User(id, input.name, input.email, false));

    return {
      id,
      name: input.name,
      email: input.email,
      approved: false
    };
  }
}

export interface SignupUCInput {
  name: string;
  email: string;
}

export interface SignupUCOutput {
  id: string;
  name: string;
  email: string;
  approved: boolean;
}
