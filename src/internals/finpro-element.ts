import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type EventTypeRequiresDetail<T> = T extends keyof GlobalEventHandlersEventMap
    ?
    GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>>
    ?
    GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>>
    ? never
    :
    Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail']
    ? never
    : T
    : never
    : never;

type EventTypeDoesNotRequireDetail<T> = T extends keyof GlobalEventHandlersEventMap
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>>
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>>
    ? T
    : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail']
    ? T
    : never
    : T
    : T;

type EventTypesWithRequiredDetail = {
    [EventType in keyof GlobalEventHandlersEventMap as EventTypeRequiresDetail<EventType>]: true;
};

type EventTypesWithoutRequiredDetail = {
    [EventType in keyof GlobalEventHandlersEventMap as EventTypeDoesNotRequireDetail<EventType>]: true;
};

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type FpEventInit<T> = T extends keyof GlobalEventHandlersEventMap
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>>
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>>
    ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
    : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail']
    ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>
    : WithRequired<CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>, 'detail'>
    : CustomEventInit
    : CustomEventInit;

type GetCustomEventType<T> = T extends keyof GlobalEventHandlersEventMap
    ? GlobalEventHandlersEventMap[T] extends CustomEvent<unknown>
    ? GlobalEventHandlersEventMap[T]
    : CustomEvent<unknown>
    : CustomEvent<unknown>;

type ValidEventTypeMap = EventTypesWithRequiredDetail | EventTypesWithoutRequiredDetail;

export default class FinproElement extends LitElement {
    @property() dir: string;
    @property() lang: string;

    emit<T extends string & keyof EventTypesWithoutRequiredDetail>(
        name: EventTypeDoesNotRequireDetail<T>,
        options?: FpEventInit<T> | undefined
    ): GetCustomEventType<T>;
    emit<T extends string & keyof EventTypesWithRequiredDetail>(
        name: EventTypeRequiresDetail<T>,
        options: FpEventInit<T>
    ): GetCustomEventType<T>;
    emit<T extends string & keyof ValidEventTypeMap>(
        name: T,
        options?: FpEventInit<T> | undefined
    ): GetCustomEventType<T> {
        const event = new CustomEvent(name, {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {},
            ...options
        });

        this.dispatchEvent(event);

        return event as GetCustomEventType<T>;
    }
}