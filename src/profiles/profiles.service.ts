import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { randomUUID, UUID } from 'crypto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Akbar',
      description: 'Hello wolrd',
    },
    {
      id: randomUUID(),
      name: 'Gojo',
      description: 'Hello wolrd',
    },
    {
      id: randomUUID(),
      name: 'Levi',
      description: 'Hello wolrd',
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: UUID) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);

    if (!matchingProfile) throw new NotFoundException();

    return matchingProfile;
  }

  create(body: CreateProfileDto) {
    const newProfile = {
      id: randomUUID(),
      ...body,
    };

    this.profiles.push(newProfile);

    return newProfile;
  }

  update(id: UUID, body: UpdateProfileDto) {
    const index = this.profiles.findIndex((profile) => profile.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    const updatedProfile = {
      ...this.profiles[index],
      ...body,
    };

    this.profiles.splice(index, 1, updatedProfile);

    return updatedProfile;
  }

  remove(id: UUID) {
    const index = this.profiles.findIndex((profile) => profile.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.profiles.splice(index, 1);
  }
}
