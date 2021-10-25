import { MinMax, guardNumber, guardNumberBetween } from '@angular-package/type';
import { Maximum } from './maximum.class';
import { Minimum } from './minimum.class';
import { Range } from './range.class';
/**
 *
 */
export class Length<
  Value extends number,
  Min extends number,
  Max extends number
> extends Number {
  //#region static properties.
  //#region public static properties.
  public static get get(): number {
    return this.#length?.valueOf();
  }

  public static set set(length: number) {
    guardNumber(length) && (this.#length = new Length(length));
  }

  public static get value(): number {
    return this.#length?.valueOf();
  }

  public static set value(length: number) {
    this.set = length;
  }
  //#endregion public static properties.

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'minimum'` for static `Minimum`.
   */
  static get [Symbol.toStringTag](): string {
    return 'length';
  }

  //#region private static properties.
  static #length: Length<any, any, any>;
  static #maximum: Maximum<any>;
  static #minimum: Minimum<any>;
  //#endregion private static properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * The property `get` returns the primitive value of `Minimum`.
   */
  public get get(): number {
    return super.valueOf() as number;
  }

  #range!: Range<Min, Max>;
  //#endregion instance properties.

  //#region public static methods.
  public static getLength<
    Value extends number,
    Min extends number,
    Max extends number
  >(): Length<Value, Min, Max> {
    return this.#length;
  }

  public static setLength<Min extends number, Max extends number>(
    length: number,
    range: Range<Min, Max> = {
      max: this.getMaximum<Max>(),
      min: this.getMinimum<Min>(),
    }
  ): typeof Length {
    guardNumberBetween(length, range) && (this.set = length);
    return this;
  }

  public static getMaximum<Max extends number>(): Max {
    return this.#maximum?.get;
  }

  public static setMaximum(maximum: number): typeof Length {
    this.#maximum = new Minimum(maximum);
    return this;
  }

  public static getMinimum<Min extends number>(): Min {
    return this.#minimum?.get;
  }

  public static setMinimum(minimum: number): typeof Length {
    this.#minimum = new Minimum(minimum);
    return this;
  }
  //#endregion public static methods.

  //#region constructor.
  constructor(length: Value, range: MinMax<Min, Max> = {}) {
    super(guardNumberBetween(length, range) ? length : undefined);
    this.#range = new Range(range);
  }
  //#endregion constructor.

  public getMaximum(): Maximum<Max> {
    return this.#range.getMaximum();
  }

  public getMinimum(): Minimum<Min> {
    return this.#range.getMinimum();
  }

  public getRange(): Range<Min, Max> {
    return this.#range;
  }

  public valueOf(): number {
    return super.valueOf();
  }
}

const m = new Length(4, { min: 3, max: 27 });

console.log(m.get);

// const n = Length.setMinimum(9).setMaximum(27).setLength(10).getLength<9, 27>();

// console.log(Length.getLength(), Length.get, Length.value);

// Length.setMinimum(9).setMaximum(27);
// console.log(Length.getMinimum(), Length.getMaximum());

