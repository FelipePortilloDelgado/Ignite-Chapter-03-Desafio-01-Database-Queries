import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    //const { first_name, games } = await this.repository
    const user = await this.repository
      .createQueryBuilder('users')
      .select(['users', 'games'])
      //.select(['users.first_name', 'users.last_name', 'users.email', 'games.title'])
      .innerJoin('users.games', 'games')
      .where(`users.id = '${user_id}'`)
      .orderBy('games.id')
      .getOne();

      //const {title} = games;
      //console.log(games)

      //console.log(user);

      if(user){
        const a: User = user;
        return a;
      } else {
        throw new Error('User not found!');
      }
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('select * from users order by first_name asc'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`select * from users where lower(first_name)='${first_name.toLowerCase()}' and lower(last_name)='${last_name.toLowerCase()}'`); // Complete usando raw query
  }
}
