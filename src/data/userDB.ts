import knex from "knex";
import { User } from "../business/entities/user";

export class UserDB {
  private connection = knex({
    client: "mysql",
    connection: {
      host: "ec2-18-229-236-15.sa-east-1.compute.amazonaws.com",
      port: 3306,
      user: "eloisa",
      password: "9B14WnvOEfRE8kyM8Fuf",
      database: "bouman-eloisa"
    }
  });

  private mapApprovedToNumer(approved: boolean): number {
    return approved ? 1 : 0;
  }

  private mapNumberToApproved(approvedAsNumber: number): boolean {
    return approvedAsNumber !== 0;
  }

  public async createUser(user: User): Promise<void> {
    await this.connection.raw(`
    INSERT INTO Users (id, name, email, approved)
    VALUES(
      '${user.getId()}',
      '${user.getName()}',
      '${user.getEmail()}',
      ${this.mapApprovedToNumer(user.isApproved())}
    )
	`);
  }

  public async getUserbyId(id: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
		SELECT * FROM Users WHERE id='${id}'
	`);

    if (result[0][0].approved === 0) {
      throw new Error("User not approved yet");
    }

    const user =
      result[0][0] &&
      new User(
        result[0][0].id,
        result[0][0].name,
        result[0][0].email,
        this.mapNumberToApproved(result[0][0].approved)
      );

    return user;
  }

  public async updateApprove(id: string, approved: boolean): Promise<void> {
    await this.connection.raw(`
		UPDATE Users
		SET 
      approved=${this.mapApprovedToNumer(approved)}
		WHERE id='${id}'
	`);
  }
}
