import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ nullable: true })
    username?: string;

    @Column({ nullable: true })
    password?: string;
}
