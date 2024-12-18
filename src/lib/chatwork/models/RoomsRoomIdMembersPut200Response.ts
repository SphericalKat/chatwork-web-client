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
 * @interface RoomsRoomIdMembersPut200Response
 */
export interface RoomsRoomIdMembersPut200Response {
    /**
     * 
     * @type {Array<number>}
     * @memberof RoomsRoomIdMembersPut200Response
     */
    admin?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof RoomsRoomIdMembersPut200Response
     */
    member?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof RoomsRoomIdMembersPut200Response
     */
    readonly?: Array<number>;
}

/**
 * Check if a given object implements the RoomsRoomIdMembersPut200Response interface.
 */
export function instanceOfRoomsRoomIdMembersPut200Response(value: object): value is RoomsRoomIdMembersPut200Response {
    return true;
}

export function RoomsRoomIdMembersPut200ResponseFromJSON(json: any): RoomsRoomIdMembersPut200Response {
    return RoomsRoomIdMembersPut200ResponseFromJSONTyped(json, false);
}

export function RoomsRoomIdMembersPut200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomsRoomIdMembersPut200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'admin': json['admin'] == null ? undefined : json['admin'],
        'member': json['member'] == null ? undefined : json['member'],
        'readonly': json['readonly'] == null ? undefined : json['readonly'],
    };
}

  export function RoomsRoomIdMembersPut200ResponseToJSON(json: any): RoomsRoomIdMembersPut200Response {
      return RoomsRoomIdMembersPut200ResponseToJSONTyped(json, false);
  }

  export function RoomsRoomIdMembersPut200ResponseToJSONTyped(value?: RoomsRoomIdMembersPut200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'admin': value['admin'],
        'member': value['member'],
        'readonly': value['readonly'],
    };
}

