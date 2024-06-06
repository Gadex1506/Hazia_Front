import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SemilleroService {
    apiUri = '/api/lideres';
    apiUriRegistro = '/api/registroLider';
    apiUriEliminarL = '/api/eliminarLider';
    apiUriActualizarL = '/api/actualizarLider';

    constructor(private http: HttpClient) {}

    getAllLideresData(token: any): Observable<any> {
        return this.http.get(this.apiUri, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    newAnimal(token: any, data: any): Observable<any> {
        return this.http.post<any>(this.apiUriRegistro, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    updateAnimal(token: any, id: any, data: any): Observable<any> {
        console.log(data);
        return this.http.put<any>(this.apiUriActualizarL + '/' + id, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    getOneAnimal(token: any, id: any): Observable<any> {
        return this.http.get<any>(this.apiUri + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    deleteAnimal(token: any, id: any) {
        return this.http.delete<any>(this.apiUriEliminarL + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }
}
