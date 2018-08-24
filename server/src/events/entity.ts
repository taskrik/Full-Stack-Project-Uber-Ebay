import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, Length, IsDate } from "class-validator";
import User from "../users/entity";
import Ticket from "../tickets/entity";
import { Type } from "../../node_modules/class-transformer";


@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @Length(5, 25)
  @Column("text")
  name: string;

  @IsString()
  @Length(0, 100)
  @Column("text")
  description: string;


  @IsString()
  @Column("text", { nullable: true })
  image: string;

  @IsDate()
  @Column("date")
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Column("date")
  @Type(() => Date)
  endDate: Date;

  @ManyToOne(_ => User, user => user.events, {
    eager: true,
    cascade: true
  })
  users: User

  @OneToMany(_ => Ticket, ticket => ticket.events, {
    eager: false
  })
  tickets: Ticket[];
}

