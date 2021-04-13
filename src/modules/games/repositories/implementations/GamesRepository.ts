import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.
      createQueryBuilder('games').where(`lower(games.title) like '%${param.toLowerCase()}%'`).getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {    
    const users: any = await this.repository
      .createQueryBuilder()
      .select('users')
      .from('users', 'users')
      .innerJoin('users.games', 'games')
      .where(`games.id = '${id}'`)
      .getMany();
    return users;
      // Complete usando query builder
  }
}
