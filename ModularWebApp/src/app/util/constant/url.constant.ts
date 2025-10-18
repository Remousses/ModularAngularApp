import { environment } from "../../../environments/environment";

export class UrlConstant {
    
  static readonly apiUrl: string = environment.apiUrl;
  static readonly pageUrl: string = environment.apiUrl + 'pages/';
  static readonly componentUrl: string = environment.apiUrl + 'custom-components/';
  static readonly tableInformation: string = environment.apiUrl + 'table-informations/';
}