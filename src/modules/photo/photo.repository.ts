import { Service } from "typedi"
import { Photo } from "./photo.entity"

@Service()
export class PhotoRepository {
  findById(photoId: string): Promise<Photo> {
    return Photo.findOneOrFail(photoId)
  }

  findAll(): Promise<Photo[]> {
    return Photo.find()
  }
}
