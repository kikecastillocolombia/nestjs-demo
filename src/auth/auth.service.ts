import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}
  
  async signIn(email: string, password: string) {
    
    const user = await this.usersRepository.getUserByEmail(email);

    if(!user || user.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {message: "Login exit"}
  }
  
}
