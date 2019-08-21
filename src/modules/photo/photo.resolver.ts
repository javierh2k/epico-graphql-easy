import { Resolver, Query, Mutation, Arg } from "type-graphql"
  
import { Photo } from "./photo.entity"
import { CreatePhotoInput } from "./input/createPhoto.input"
import { UpdatePhotoInput } from "./input/updatePhoto.input"
import { PhotoService } from "./photo.service"
import { PhotoRepository } from "./photo.repository"

@Resolver(() => Photo)
export class PhotoResolver {
  constructor(
    private readonly photoService: PhotoService,
    private readonly photoRepository: PhotoRepository
  ) {}

  @Query(() => [Photo])
  getPhotos(): Promise<Photo[]> {
    return this.photoRepository.findAll()
  }

  @Mutation(() => Photo)
  createPhoto(@Arg("data") data: CreatePhotoInput): Promise<Photo> {
    return this.photoService.create(data)
  }

  @Mutation(() => Photo)
  updatePhoto(
    @Arg("photoId") photoId: string,
    @Arg("data") data: UpdatePhotoInput,
  ): Promise<Photo> {
    return this.photoService.update(photoId, data)
  }

  @Mutation(() => Boolean)
  destroyPhoto(@Arg("photoId") photoId: string): Promise<boolean> {
    return this.photoService.destroy(photoId)
  }

}
