import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../../config/cosmo.config';
import { blogModel } from '../models/cosmic.model';
import { registerModel } from '../models/cosmic.model';

@Injectable({
  providedIn: 'root'
})
export class CosmicService {
  data;
  message;
  URL = config.bucket_slug;
  bucket_slug = config.bucket_slug;

  constructor(private _http: HttpClient, private router: Router) { }

  /* get user details */
  getUser(registerModel: registerModel) {
    return this._http.get(this.URL+this.bucket_slug+"/object-type/registerusers/search", {
     params: {
        metafield_key: 'username',
        metafield_value: registerModel.username,
        limit: 1,
        read_key: config.read_key
      }
    })
    .map(res => {
      return res;
    })
  }
  /* register new user */
  addUser(registerModel: registerModel)
  {
    return this._http.post(this.URL+this.bucket_slug+"/add-object", {
      title: registerModel.username, slug: registerModel.username, type_slug: 'registerusers', write_key: config.write_key,
      metafields: [
        {
        key: "username",
        type: "text",
        value: registerModel.username
      },
      {
        key: "email",
        type: "text",
        value: registerModel.email
      }
      {
        key: "fullName",
        type: "text",
        value: registerModel.fullName
      }
      ]
    })
  }
}
