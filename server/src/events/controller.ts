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
import Event from "./entity";
import User from "../users/entity";



@JsonController()
export default class EventController {
  @Get("/events/:id")
  async getEvent(@Param("id") id: number) {
    const event = await Event.findOne(id);
    return event;
  }

  @Get("/events")
  async allEvents() {
    const events = await Event.find();
    return { events };
  }

  @Authorized()
  @Put("/events/:id")
  async updateEvent(@Param("id") id: number, @Body() update: Partial<Event>) {
    const event = await Event.findOne(id);
    if (!event) throw new NotFoundError("Cannot find event");

    return Event.merge(event, update).save();
  }
  @Authorized()
  @Post("/events")
  @HttpCode(201)
  async createEvent(
    @CurrentUser() users: User,
    @Body() event: Event
  
  ) {
    
    if(users instanceof User) event.users = users
        
    const entity = event.save()
    return { entity }
  }
}
