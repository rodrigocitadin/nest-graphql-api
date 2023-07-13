import { User } from '../../user/user.entity';

interface userData {
  id?: number,
  name?: string,
  email?: string,
  password?: string,
}

export default class TestUtils {
  static giveAnUser(data?: userData): User {
    const user = new User();

    user.id = data?.id.toString() || '1';
    user.name = data?.name || 'valid name';
    user.email = data?.email || 'valid@email.com';
    user.password = data?.password || 'Password123!'

    return user;
  }
}
