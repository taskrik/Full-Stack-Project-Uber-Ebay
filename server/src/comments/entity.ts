import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, Length } from "class-validator";
import User from "../users/entity"
import Ticket from "../tickets/entity";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @Length(2, 100)
  @Column("text")
  comment: string;

  @ManyToOne(_ => User, user => user.comments, {
    eager: true,
    cascade: true
  })
  users: User;

  @ManyToOne(_ => Ticket, ticket => ticket.comments, {
    eager: true,
    cascade: true
  })
  tickets: Ticket;
}