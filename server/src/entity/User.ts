import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

type UserOptions = {
  email: string;
  encryptedPassword: string;
};
@Entity({name: "user"})
export class User extends BaseEntity {
  constructor(UserOptions: UserOptions) {
    super();
    if (UserOptions) {
      this.email = UserOptions.email;
      this.encryptedPassword = UserOptions.encryptedPassword;
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;
  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public email: string;
  @Column()
  public encryptedPassword: string;
}
