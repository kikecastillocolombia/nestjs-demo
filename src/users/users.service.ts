import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createUser(user: Omit<User, "id">): Promise<User> {
    return this.usersRepository.createUser(user);
  }

  async findAll({ page, limit }: { page: number; limit: number; }) {
    return this.usersRepository.getUsers({ page, limit });
  }

  findOne(id: number) {
    return this.usersRepository.getUserById(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  async update(id: number, updateUserDto: Partial<Omit<User, "id">>) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: number): Promise<{ message:string }> {
    return this.usersRepository.deleteUser(id);
  }

  getUsersByCountry(country: string) {
    return this.usersRepository.getUsersByCountry(country);
  }

  getUserByName(name: string) {
    return this.usersRepository.getByName(name);
  }
}
