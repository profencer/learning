declare const BugNotGenericEnough: unique symbol;
export interface Hkt<T> {
    // this is to detect cases when there is only one 
    // higher kinded type in a map, and seemingly generic
    // code can access its fields
    [BugNotGenericEnough]: {};
}
export type Tag = keyof Hkt<any>
export type Apply<K extends Tag, T> = Hkt<T>[K]

export interface HktMeta<T extends Tag> {
    // this is to detect cases when there is only one 
    // higher kinded type in a map, and seemingly generic
    // code can access its fields
    [BugNotGenericEnough]: {};
}
export type TagMeta = keyof HktMeta<any>
export type ApplyMeta<K extends TagMeta, T extends Tag> = HktMeta<T>[K]

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type ApplyHkts<T extends Tag, TF extends Record<string, TagMeta>> = UnionToIntersection<{ [U in keyof TF]: ApplyMeta<TF[U], T> }[keyof TF]>
type ApplyHkts2<T extends Tag, TF extends TagMeta[]> = ApplyHkts<T, { [P in Exclude<keyof TF, keyof []>]: TF[P] extends TagMeta ? TF[P] : never }>;

export const createMemo = <TF extends TagMeta[]>() => {
    return <O>(f: <T extends Tag>(t: ApplyHkts2<T, TF>) => Apply<T, O>) => {
        const memory = new Map();
        return <T extends Tag>(t: ApplyHkts2<T, TF>): Apply<T, O> => {
            const result = memory.get(t)
            if (result) {
                return result;
            }
            const toMemo = f(t);
            memory.set(t, toMemo);
            return toMemo;
        };
    }
}
