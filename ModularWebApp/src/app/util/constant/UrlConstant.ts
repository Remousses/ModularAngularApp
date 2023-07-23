import { environment } from "../../../environments/environment";

export class UrlConstant {
    
  static readonly pageUrl: string = environment.apiUrl + 'pages/';
  static readonly componentUrl: string = environment.apiUrl + 'custom-components/';
}