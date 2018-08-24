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
import Ticket from "./entity";
import User from "../users/entity";

@JsonController()
export default class TicketController {
  @Get("/tickets/:id")
  async getTicket(@Param("id") id: number) {
    const ticket = await Ticket.findOne(id);
    return ticket;
  }

  @Get("/tickets")
  async allTickets() {
    const tickets = await Ticket.find();
    return { tickets };
  }

  @Authorized()
  @Put("/tickets/:id")
  async updateTicket(
    
    @Param("id") id: number, @Body() update: Partial<Ticket>) {
    const ticket = await Ticket.findOne(id);
    if (!ticket) throw new NotFoundError("Cannot find ticket");

    return Ticket.merge(ticket, update).save();
  }

  @Authorized()
  @Post("/tickets")
  @HttpCode(201)
  async createTicket(
    @CurrentUser() users: User,
    @Body() ticket: Ticket    
  ) {
      
      ticket.users = users 
      const entity = await ticket.save()
      
      return  { entity } 
  }
}