import { UrlConstant } from "./constant/url.constant";

export class QueryBuilderUtil {

    static getCustomQueryUrl(tableName: string) {
        return `${UrlConstant.apiUrl}${QueryBuilderUtil.kebabCase(tableName)}/getCustomQuery`;
    }

    private static kebabCase(str: string): string {
        return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).substring(1) + 's';
    }
}