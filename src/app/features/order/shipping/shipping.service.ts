import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddressViewModel } from "../../../viewModels/address.ViewModel";
import { HttpClient } from "@angular/common/http";


interface AddressResponse {
    Addresses: AddressViewModel[];
    UserID: string

}

interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

@Injectable({
    providedIn: 'root',
})



export class ShippingService {

    private apiUrl = 'http://localhost:3000/api/addresses';
    private http = inject(HttpClient);

    getAddresses(): Observable<ApiResponse<AddressResponse>> {
        return this.http.get<ApiResponse<AddressResponse>>(this.apiUrl)
    }

    createAddress(record: AddressViewModel): Observable<ApiResponse<AddressViewModel>> {
        return this.http.post<ApiResponse<AddressViewModel>>(this.apiUrl, record)
    }

    updateAddress(
        addressId: string,
        address: AddressViewModel
    ): Observable<ApiResponse<AddressViewModel>> {

        return this.http.put<ApiResponse<AddressViewModel>>(
            `${this.apiUrl}/${addressId}`,
            address
        );
    }
}