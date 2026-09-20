import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserViewModel } from "../viewModels/user.viewModel";


export interface UserListResponse {
    Message: string;
    Status: string;
    Data: UserViewModel[];
    Pagination: {
        Page: number;
        Limit: number;
        Total: number;
        TotalPages: number;
    };
}

@Injectable({
    providedIn: 'root',
})

export class AdminServices {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000/api/users';


    getUsers(
        page: number = 1,
        limit: number = 10,
        search: string = '',
        role: string = ''
    ): Observable<UserListResponse> {

        let params = new HttpParams()
            .set('page', page)
            .set('limit', limit);

        if (search.trim()) {
            params = params.set('search', search.trim());
        }

        if (role) {
            params = params.set('role', role);
        }

        return this.http.get<UserListResponse>(
            `${this.baseUrl}/admin/users`,
            { params }
        );
    }

}