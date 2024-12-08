import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { UsersDbService } from "./usersDb.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, 
    private readonly usersDbService: UsersDbService,
  ) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersDbService.saveUser(user);
  }

  @Get()
  findAll(@Query("name") name?: string, @Query("email") email?: string, @Query("country") country?: string, @Query("page") page = 1, @Query("limit") limit = 5) {
    console.log(name, email, country);

    if (email) {
      return this.usersService.findOneByEmail(email);
    }
    if (country) {
      return this.usersService.getUsersByCountry(country);
    }
    if (name) {
      return this.usersService.getUserByName(name);
    }

    return this.usersService.findAll({ page, limit });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<Omit<User, 'id'>>) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
