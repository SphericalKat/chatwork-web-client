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
 * @interface RoomsPost200Response
 */
export interface RoomsPost200Response {
    /**
     * 
     * @type {number}
     * @memberof RoomsPost200Response
     */
    roomId?: number;
}

/**
 * Check if a given object implements the RoomsPost200Response interface.
 */
export function instanceOfRoomsPost200Response(value: object): value is RoomsPost200Response {
    return true;
}

export function RoomsPost200ResponseFromJSON(json: any): RoomsPost200Response {
    return RoomsPost200ResponseFromJSONTyped(json, false);
}

export function RoomsPost200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomsPost200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'roomId': json['room_id'] == null ? undefined : json['room_id'],
    };
}

  export function RoomsPost200ResponseToJSON(json: any): RoomsPost200Response {
      return RoomsPost200ResponseToJSONTyped(json, false);
  }

  export function RoomsPost200ResponseToJSONTyped(value?: RoomsPost200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'room_id': value['roomId'],
    };
}

