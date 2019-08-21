import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

import { Rate } from "./rate.entity";
import { User } from "./user.entity";
import { Lazy } from "../../lib";

@Entity()
@ObjectType()
export class Recipe {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(type => [Rate])
  @OneToMany(type => Rate, rate => rate.recipe, { lazy: true, cascade: ["insert"] })
  ratings!: Lazy<Rate[]>;

  @Field(type => User)
  @ManyToOne(type => User, { lazy: true })
  author!: Lazy<User>;
}
