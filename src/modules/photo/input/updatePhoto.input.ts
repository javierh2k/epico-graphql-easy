import { InputType, Field } from "type-graphql"
	
import { Photo } from "../photo.entity"

@InputType()
export class UpdatePhotoInput implements Partial<Photo> {
  @Field()
  filename!: string
  
  @Field()
  urlname!: string
  
  @Field()
  counter!: string
  
  @Field()
  userId!: string
  
  
}	
