import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: string;

  @Column()
  name: string;

  @Column()
  createAt: Date;
}
