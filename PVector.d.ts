export interface VectorFactory<T> {
    (...values: T[]): Vector<T>;
    empty(): Vector<T>;
    fromArray(values: T[]): Vector<T>;
}
export interface Vector<T> {
    toArray(): T[];
    length: number;
    get(index: number): T;
    exists(index: number): boolean;
    first(): T;
    last(): T;
    set(index: number, value: T): Vector<T>;
    push(...values: T[]): Vector<T>;
    pop(): Vector<T>;
    remove(index: number): Vector<T>;
    unshift(...values: T[]): Vector<T>;
    shift(): Vector<T>;
    reverse(): Vector<T>;
    concat(vec: Vector<T>): Vector<T>;
    slice(begin: number, end?: number): Vector<T>;
    splice(index: number, removeNum: number, ...values: T[]): Vector<T>;
    indexOf(value: T): number;
    forEach(fn: (value: T, index: number, vector: Vector<T>) => any, thisArg?: any): void;
    map<R>(fn: (value: T, index: number, vector: Vector<T>) => R, thisArg?: any): Vector<R>;
}
export declare class PVector<T> implements Vector<T> {
    constructor(...values: T[]);
    static empty(): PVector<any>;
    static fromArray<T>(values: T[]): PVector<T>;
    public toArray(): T[];
    public length: number;
    public get(index: number): T;
    public exists(index: number): boolean;
    public first(): T;
    public last(): T;
    public set(index: number, value: T): PVector<T>;
    public push(...values: T[]): PVector<T>;
    public pop(): PVector<T>;
    public remove(index: number): PVector<T>;
    public unshift(...values: T[]): PVector<T>;
    public shift(): PVector<T>;
    public reverse(): PVector<T>;
    public concat(...vectors: PVector<T>[]): PVector<T>;
    public slice(begin: number, end?: number): PVector<T>;
    public splice(index: number, removeNum: number, ...values: T[]): PVector<T>;
    public indexOf(searchValue: T): number;
    public forEach(fn: (value: T, index: number, vector: PVector<T>) => any, thisArg?: any): void;
    public map<R>(fn: (value: T, index: number, vector: PVector<T>) => R, thisArg?: any): PVector<R>;
    private _origin;
    private _size;
    private _level;
    private _root;
    private _tail;
    private static _make<T>(origin, size, level, root, tail);
    private _arrayFor(rawIndex);
}
