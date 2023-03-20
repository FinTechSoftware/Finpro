import FinproElement from './finpro-element';

type UpdateHandler = (prev?: unknown, next?: unknown) => void;

type NonUndefined<A> = A extends undefined ? never : A;

type UpdateHandlerFunctionKeys<T extends object> = {
    [K in keyof T]-?: NonUndefined<T[K]> extends UpdateHandler ? K : never;
}[keyof T];

interface WatchOptions {
    waitUntilFirstUpdate?: boolean;
}

export function watch(propertyName: string | string[], options?: WatchOptions) {
    const resolvedOptions: Required<WatchOptions> = {
        waitUntilFirstUpdate: false,
        ...options
    };
    return <ElemClass extends FinproElement>(proto: ElemClass, decoratedFnName: UpdateHandlerFunctionKeys<ElemClass>) => {
        // @ts-expect-error - update is a protected property
        const { update } = proto;
        const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];

        // @ts-expect-error - update is a protected property
        proto.update = function (this: ElemClass, changedProps: Map<keyof ElemClass, ElemClass[keyof ElemClass]>) {
            watchedProperties.forEach(property => {
                const key = property as keyof ElemClass;
                if (changedProps.has(key)) {
                    const oldValue = changedProps.get(key);
                    const newValue = this[key];

                    if (oldValue !== newValue) {
                        if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                            (this[decoratedFnName] as unknown as UpdateHandler)(oldValue, newValue);
                        }
                    }
                }
            });

            update.call(this, changedProps);
        };
    };
}