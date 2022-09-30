import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
}

type UserOptions = {
  email: string;
  encryptedPassword: string;
  role: UserRole;
};

@Entity()
export class User extends BaseEntity {
  constructor(UserOptions: UserOptions) {
    super();
    if (UserOptions) {
      this.email = UserOptions.email;
      this.encryptedPassword = UserOptions.encryptedPassword;
      this.role = UserOptions.role;
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

  @Column({ default: UserRole.ADMIN })
  public role: UserRole;
}
