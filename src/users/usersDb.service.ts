import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";

@Injectable()
export class UsersDbService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    saveUser(user) {
        this.usersRepository.save(user);
    }
}