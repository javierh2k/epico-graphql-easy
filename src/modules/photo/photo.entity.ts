import { Entity, Column, BaseEntity,PrimaryGeneratedColumn } from "typeorm"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
@Entity()
export class Photo extends BaseEntity {

  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  filename!: string
  
  @Field()
  @Column()
  urlname!: string
  
  @Field()
  @Column()
  counter!: string
  
  @Field()
  @Column()
  userId!: string
  
  
}
