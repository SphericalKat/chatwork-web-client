/* tslint:disable */
/* eslint-disable */
/**
 * Chatwork API
 * API for interacting with Chatwork services
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Account } from './Account';
import {
    AccountFromJSON,
    AccountFromJSONTyped,
    AccountToJSON,
    AccountToJSONTyped,
} from './Account';

/**
 * 
 * @export
 * @interface ModelFile
 */
export interface ModelFile {
    /**
     * 
     * @type {number}
     * @memberof ModelFile
     */
    fileId?: number;
    /**
     * 
     * @type {Account}
     * @memberof ModelFile
     */
    account?: Account;
    /**
     * 
     * @type {string}
     * @memberof ModelFile
     */
    messageId?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelFile
     */
    filename?: string;
    /**
     * 
     * @type {number}
     * @memberof ModelFile
     */
    filesize?: number;
    /**
     * 
     * @type {number}
     * @memberof ModelFile
     */
    uploadTime?: number;
}

/**
 * Check if a given object implements the ModelFile interface.
 */
export function instanceOfModelFile(value: object): value is ModelFile {
    return true;
}

export function ModelFileFromJSON(json: any): ModelFile {
    return ModelFileFromJSONTyped(json, false);
}

export function ModelFileFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelFile {
    if (json == null) {
        return json;
    }
    return {
        
        'fileId': json['file_id'] == null ? undefined : json['file_id'],
        'account': json['account'] == null ? undefined : AccountFromJSON(json['account']),
        'messageId': json['message_id'] == null ? undefined : json['message_id'],
        'filename': json['filename'] == null ? undefined : json['filename'],
        'filesize': json['filesize'] == null ? undefined : json['filesize'],
        'uploadTime': json['upload_time'] == null ? undefined : json['upload_time'],
    };
}

  export function ModelFileToJSON(json: any): ModelFile {
      return ModelFileToJSONTyped(json, false);
  }

  export function ModelFileToJSONTyped(value?: ModelFile | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'file_id': value['fileId'],
        'account': AccountToJSON(value['account']),
        'message_id': value['messageId'],
        'filename': value['filename'],
        'filesize': value['filesize'],
        'upload_time': value['uploadTime'],
    };
}
