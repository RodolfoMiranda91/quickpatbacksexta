import { Injectable } from "@nestjs/common";





export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userID: 1,
            username: 'admin1',
            password: 'admin1',
        },
        {
            userID: 2,
            username: 'admin2',
            password: 'admin2',
        }
    ];
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
