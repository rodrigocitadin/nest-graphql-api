import { Field, ID, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransformer } from '../common/helpers/crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    transformer: hashPasswordTransformer
  })
  password: string;
}
