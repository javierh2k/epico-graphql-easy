import { Service } from "typedi"

import { Photo } from "./photo.entity"
import { CreatePhotoInput } from "./input/createPhoto.input"
import { UpdatePhotoInput } from "./input/updatePhoto.input"
import { PhotoRepository } from "./photo.repository"

@Service()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async create(data: CreatePhotoInput): Promise<Photo> {
    const photo = await Photo.create(data).save()
    return photo
  }

  async update(photoId: string, data: UpdatePhotoInput): Promise<Photo> {
    const photo = await this.photoRepository.findById(photoId)
    Object.assign(photo, data)
    await photo.save()
    return photo
  }

  async destroy(photoId: string): Promise<boolean> {
    const photo = await this.photoRepository.findById(photoId)
    await photo.remove()
    return true
  }
}
