import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  NotFoundError,
  HttpCode,
  Post,
  Authorized,
  CurrentUser
} from "routing-controllers";
import Comment from "./entity";
import User from "../users/entity";

@JsonController()
export default class CommentController {
  @Get("/comments/:id")
  async getComment(@Param("id") id: number) {
    const comment = await Comment.findOne(id);
    return comment
  }

  @Get("/comments")
  async allComments() {
    const comments = await Comment.find();
    return { comments };
  }

  @Authorized()
  @Put("/comments/:id")
  async updateComments(
    @Param("id") id: number,
    @Body() update: Partial<Comment>
  ) {
    const comment = await Comment.findOne(id);
    if (!comment) throw new NotFoundError("Cannot find comment");

    return Comment.merge(comment, update).save();
  }

  @Authorized()
  @Post("/comments")
  @HttpCode(201)
  async createComment(
    @CurrentUser() users: User,
    @Body() comment: Comment
  ) {

      comment.users = users 
      const entity = await comment.save()
      
      return entity 
  }
}