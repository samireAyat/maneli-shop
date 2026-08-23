import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddressViewModel } from "../../../viewModels/address.ViewModel";
import { HttpClient } from "@angular/common/http";


interface AddressResponse {
    Addresses: AddressViewModel[];
    UserID: string

}

@Injectable({
    providedIn: 'root',
})



export class ShippingService {

    private apiUrl = 'http://localhost:3000/api/addresses';
    private http = inject(HttpClient);

    getAddresses(): Observable<AddressResponse> {
        return this.http.get<AddressResponse>(this.apiUrl)
    }

    createAddress(record: AddressViewModel) {
        return this.http.post<AddressViewModel>(this.apiUrl, record)
    }
}