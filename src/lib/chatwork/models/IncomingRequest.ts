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
/**
 * 
 * @export
 * @interface IncomingRequest
 */
export interface IncomingRequest {
    /**
     * 
     * @type {number}
     * @memberof IncomingRequest
     */
    requestId?: number;
    /**
     * 
     * @type {number}
     * @memberof IncomingRequest
     */
    accountId?: number;
    /**
     * 
     * @type {string}
     * @memberof IncomingRequest
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof IncomingRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof IncomingRequest
     */
    chatworkId?: string;
    /**
     * 
     * @type {number}
     * @memberof IncomingRequest
     */
    organizationId?: number;
    /**
     * 
     * @type {string}
     * @memberof IncomingRequest
     */
    organizationName?: string;
    /**
     * 
     * @type {string}
     * @memberof IncomingRequest
     */
    department?: string;
    /**
     * 
     * @type {string}
     * @memberof IncomingRequest
     */
    avatarImageUrl?: string;
}

/**
 * Check if a given object implements the IncomingRequest interface.
 */
export function instanceOfIncomingRequest(value: object): value is IncomingRequest {
    return true;
}

export function IncomingRequestFromJSON(json: any): IncomingRequest {
    return IncomingRequestFromJSONTyped(json, false);
}

export function IncomingRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): IncomingRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'requestId': json['request_id'] == null ? undefined : json['request_id'],
        'accountId': json['account_id'] == null ? undefined : json['account_id'],
        'message': json['message'] == null ? undefined : json['message'],
        'name': json['name'] == null ? undefined : json['name'],
        'chatworkId': json['chatwork_id'] == null ? undefined : json['chatwork_id'],
        'organizationId': json['organization_id'] == null ? undefined : json['organization_id'],
        'organizationName': json['organization_name'] == null ? undefined : json['organization_name'],
        'department': json['department'] == null ? undefined : json['department'],
        'avatarImageUrl': json['avatar_image_url'] == null ? undefined : json['avatar_image_url'],
    };
}

  export function IncomingRequestToJSON(json: any): IncomingRequest {
      return IncomingRequestToJSONTyped(json, false);
  }

  export function IncomingRequestToJSONTyped(value?: IncomingRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'request_id': value['requestId'],
        'account_id': value['accountId'],
        'message': value['message'],
        'name': value['name'],
        'chatwork_id': value['chatworkId'],
        'organization_id': value['organizationId'],
        'organization_name': value['organizationName'],
        'department': value['department'],
        'avatar_image_url': value['avatarImageUrl'],
    };
}
