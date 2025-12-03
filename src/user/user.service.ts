import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
constructor(
  @InjectRepository(User)
  private repo: Repository<User>,
) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.repo.create(createUserDto);
    return this.repo.save(newUser);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(username: string) {
    return this.repo.findOne({ where: { username: username } });
  }

  findByIds(id: number) {
    return this.repo.findBy({ userId: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.repo.findOne({ where: { username: updateUserDto.username } }) == null ? 
    this.repo.update(id, updateUserDto) : "id not found"

    return this.findByIds(id);
  
  }
  
  remove(id: number) {
    !this.repo.findOne({ where: { userId: id } }) ? 
    this.repo.delete(id) : "id not found"
    return this.findAll();

  }
}
