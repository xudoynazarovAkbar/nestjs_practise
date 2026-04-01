import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Akbar', email: 'aaakbar@gmail.com' },
    { id: 2, name: 'Eren', email: 'eren.jaeger@gmail.com' },
    { id: 3, name: 'John', email: 'john.doe@gmail.com' },
  ];
  private nextId = 4;

  create(createUserDto: CreateUserDto) {
    const user: User = { id: this.nextId++, ...createUserDto };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1)
      throw new NotFoundException(`User with id ${id} not found`);
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }
}
