import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../../core/services/auth.service";
import { Observable } from "rxjs";


export interface FavoriteResponseViewModel {
    message: string;
    Items: any[];
    status: string;
    IsFavorite: boolean

}

@Injectable({
    providedIn: 'root',
})

export class favoriteService {
    private apiUrl = 'http://localhost:3000/api/favorite';
    private http = inject(HttpClient);
    private authService = inject(AuthService);




    addToFavorite(
        productId: string
    ): Observable<FavoriteResponseViewModel> {

        return this.http.post<FavoriteResponseViewModel>(
            this.apiUrl,
            {
            ProductID: productId
            }
        );

    }

    getFavorite() : Observable<FavoriteResponseViewModel> {
        return this.http.get<FavoriteResponseViewModel>(this.apiUrl)
    }

        deleteFavorite( productId: string) : Observable<FavoriteResponseViewModel> {
        return this.http.delete<FavoriteResponseViewModel>(`${this.apiUrl}/${productId}`)
    }


}