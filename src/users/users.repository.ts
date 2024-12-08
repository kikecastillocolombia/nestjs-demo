import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

type Users = {
  id: number;
  email: string;

  name: string;

  password: string;

  address: string;

  phone: string;

  country?: string | undefined;

  city?: string | undefined;
};

@Injectable()
export class UsersRepository {
  
  private users: Users[] = [
    {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      password: "hashedPassword123",
      address: "123 Main St, Anytown",
      phone: "123-456-7890",
      country: "USA",
      city: "New York",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      name: "Jane Smith",
      password: "hashedPassword456",
      address: "456 Elm St, Othertown",
      phone: "987-654-3210",
      country: "Canada",
      city: "Toronto",
    },
    {
      id: 3,
      email: "mike.jones@example.com",
      name: "Mike Jones",
      password: "hashedPassword789",
      address: "789 Oak St, Someplace",
      phone: "555-555-5555",
      country: "USA",
      city: "Los Angeles",
    },
    {
      id: 4,
      email: "lisa.white@example.com",
      name: "Lisa White",
      password: "hashedPassword101",
      address: "101 Pine St, Anotherplace",
      phone: "222-333-4444",
      country: "UK",
      city: "London",
    },
  ];

  private userWhitoutPassword(user: Users) {
    const {password, ...rest} = user;
    return rest;
  }

  async getUsers({ page, limit }: { page: number; limit: number; }) {

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUsers = this.users.slice(startIndex, endIndex);

    return paginatedUsers.map((user) => this.userWhitoutPassword(user));
  }

  async getUserByEmail(email: string){
    const user = this.users.find(user => user.email === email);
    return user  
  }

  async getUsersByCountry(country: string) {
    return this.users.filter((user) => user.country == country).map((user) => this.userWhitoutPassword(user));
  }

  async getUserById(id: number) {
    const user = this.users.find((user) => user.id == id);
    return user ? this.userWhitoutPassword(user) : null;
  }

  async getByName(name: string) {
    return this.users
      .filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
      .map((user) => this.userWhitoutPassword(user));
  }  

  async createUser(user: Omit<User, "id">) {
    const id = this.users.length + 1;
    const newUser = {
      id,
      ...user,
      password: "",
      address: "",
      phone: "",
    };

    this.users = [
      ...this.users,
      newUser,
    ];
    return this.userWhitoutPassword(newUser);
  }

  async updateUser(id: number, updateUserDto: Partial<Omit<User, "id">>) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }
  
  const updatedUser = {
    ...this.users[userIndex],
    ...updateUserDto,
  };

  this.users = [
    ...this.users.slice(0, userIndex),
    updatedUser,
    ...this.users.slice(userIndex + 1),
  ];

  return this.userWhitoutPassword(updatedUser);
}

async deleteUser(id: number): Promise<{ message: string; }> {
  const index = this.users.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new Error('User not found');
  }

  this.users.splice(index, 1);

  return { message: 'User deleted successfully' };
  }
}

