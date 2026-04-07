import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<User[]> {
    const result = await this.db.query<User>('SELECT * FROM users');
    return result.rows;
  }

  async findOne(id: string): Promise<User> {
    const result = await this.db.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    if (!result.rows[0]) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] ?? null;
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const result = await this.db.query<User>(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password],
    );
    return result.rows[0] ?? null;
  }

  async create(data: CreateUserDto): Promise<User> {
    const result = await this.db.query<User>(
      'INSERT INTO users (email, name, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.email, data.name, data.password, data.role],
    );
    return result.rows[0];
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const fields = Object.keys(data) as (keyof UpdateUserDto)[];
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    const values: (string | number)[] = [
      ...fields.map((field) => data[field] as string),
      id,
    ];

    const result = await this.db.query<User>(
      `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      values,
    );
    return result.rows[0];
  }

  async remove(id: string): Promise<User> {
    const result = await this.db.query<User>(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id],
    );

    if (!result.rows[0]) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return result.rows[0];
  }
}
