import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    server_url = 'http://127.0.0.1:4000';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.server_url}/users/`);
    }
    getById(id) {
        return this.http.get<User>(`${this.server_url}/users/${id}`);
    }
    update(user: User) {
        return this.http.put(`${this.server_url}/users/${user.id}`, user);
    }
    register(user: User) {
        return this.http.post(`${this.server_url}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.server_url}/users/${id}`);
    }
}