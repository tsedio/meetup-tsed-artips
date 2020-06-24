import {BodyParams, Controller, Get, PathParams, Post, Status} from "@tsed/common";
import {BadRequest, NotFound} from "@tsed/exceptions";
import {Returns, Summary} from "@tsed/swagger";
import {UserModel} from "../../models/UserModel";

const user = new UserModel();
user.id = "1";
user.name = "Romakita";

@Controller("/users")
export class UserController {
  private users: UserModel[] = [user];

  @Get("/:id")
  @Returns(UserModel)
  @Summary("Get a user from his id")
  get(@PathParams("id") id: string) {
    const user = this.users.find((user) => id === user.id);

    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  @Post("/")
  @Returns(UserModel)
  @Status(201)
  @Summary("Add a new User")
  save(@BodyParams() user: UserModel) {
    const exists = this.users.find(({id}) => id === user.id);

    if (exists) {
      throw new BadRequest("User already registered");
    }

    this.users.push(user);

    return user;
  }
}
