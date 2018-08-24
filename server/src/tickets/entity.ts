import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, Length } from "class-validator";
import User from '../users/entity'
import Comment from "../comments/entity";
import Event from "../events/entity";



@Entity()
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @Column("text", { nullable: true })
  image: string;

  @Column("integer", { nullable: true })
  price: number;

  @IsString()
  @Length(0, 100)
  @Column("text")
  description: string;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  uploadDate: Date;

  @ManyToOne(_ => User, user => user.tickets, {
    eager: true,
    cascade: true
  })
  users: User;

  @OneToMany(_ => Comment, comment => comment.tickets, {
    eager: false
  })
  comments: Comment[];

  @ManyToOne(_ => Event, event => event.tickets, {
    eager: true,
    cascade: true
  })
  events: Event;
}