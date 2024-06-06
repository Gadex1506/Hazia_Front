import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SemilleroService {
    apiUri = '/api/semilleros';
    apiUriRegistro = '/api/registroSemillero';
    apiUriEliminarS = '/api/eliminarSemilleros';
    apiUriActualizarS = '/api/actualizarSemilleros';

    constructor(private http: HttpClient) {}

    getAllSemillerosData(token: any): Observable<any> {
        return this.http.get(this.apiUri, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    newSemillero(token: any, data: any): Observable<any> {
        return this.http.post<any>(this.apiUriRegistro, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    updateSemillero(token: any, id: any, data: any): Observable<any> {
        console.log(data);
        return this.http.put<any>(this.apiUriActualizarS + '/' + id, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    getOneSemillero(token: any, id: any): Observable<any> {
        return this.http.get<any>(this.apiUri + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    deleteSemillero(token: any, id: any) {
        return this.http.delete<any>(this.apiUriEliminarS + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: `${token}`,
        },
        });
    }

    addNewMember(token: any, id: any) {
        return this.http.put<any>(this.apiUri + '/' + id + 'estudiantes', {
            headers: {
                'Content-Type': 'application/json',
                accessToken: `${token}`,
            },
        });
    }
}
