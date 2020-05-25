import { Tag, Apply } from 'hkt';
// Unixtype
// TODO: Topology must take three type arguments to support different entities for interpreter
export interface Topology<T extends Tag> {
    interface: <O>(n: string, o: { [K in keyof O]: Apply<T, O[K]> }) => Apply<T, O>,
    ref: <U>(f: () => Apply<T, U>) => Apply<T, U>,
    maybe: <U>(p: Apply<T, U>) => Apply<T, U | undefined>,
    string: Apply<T, string>,
    unixTime: Apply<T, number>,
    number: Apply<T, number>,

}

export const memo = <O>(f: <T extends Tag>(t: Topology<T>) => Apply<T, O>) => {
    const memory = new Map();
    return <T extends Tag>(t: Topology<T>): Apply<T, O> => {
        const result = memory.get(t)
        if (result) {
            return result;
        }
        const toMemo = f(t);
        memory.set(t, toMemo);
        return toMemo;
    }
};

export type Maybe<T> = T | undefined;
