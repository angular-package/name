// @angular-package/range.
import { Range } from '@angular-package/range';
// @angular-package/type.
import {
  // Type.
  MinMax,
  ResultCallback,
  // Function.
  guardRegExp,
  guardNumber,
  isDefined,
  isInstance,
  isObjectSomeKeys,
} from '@angular-package/type';
// Class.
import { Affix } from '../../src/affix.class';
// Interface.
import { PrefixConfiguration } from '../interface/prefix-configuration.interface';
import { PrefixSettings } from '../interface/prefix-settings.interface';
/**
 *
 */
export class Prefix<Min extends number, Max extends number> extends Affix<
  Min,
  Max
> {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  static get [Symbol.toStringTag](): string {
    return 'prefix';
  }
  //#endregion static public properties.

  //#region static private properties.
  /**
   *
   */
  static #length: Range<any, any> = new Range({ min: 0, max: 5 });

  /**
   *
   */
  static #pattern: RegExp | undefined = new RegExp(/[^a-zA-Z0-9$_]/g);

  /**
   *
   */
  static #prefix: Prefix<any, any> | undefined;
  //#endregion static private properties.
  //#endregion static properties.

  //#region instance public properties.
  /**
   * Gets the primitive value of an `Prefix` instance.
   */
  public get get(): string {
    return super.get;
  }

  /**
   * Returns the exact length of the primitive value of the `Prefix` instance.
   */
  public get length(): number {
    return super.length;
  }

  get [Symbol.toStringTag](): string {
    return 'prefix';
  }
  //#endregion instance public properties.
  //#endregion properties.

  //#region static methods.
  //#region static public methods.
  public static clearConfiguration(): typeof Prefix {
    (this.#length = new Range({})), (this.#pattern = undefined);
    return this;
  }

  public static definePrefix<Min extends number, Max extends number>(
    prefix: string,
    settings?: PrefixSettings<Min, Max>,
    callback?: ResultCallback<string, PrefixSettings<Min, Max>>
  ): Prefix<Min, Max> {
    return new Prefix(
      prefix,
      {
        length: {
          ...this.#length.get,
          ...settings?.length,
        },
        pattern: settings?.pattern || this.#pattern,
      },
      callback
    );
  }

  /**
   *
   * @returns
   */
  public static getConfiguration<Min extends number, Max extends number>():
    | PrefixConfiguration<Min, Max>['default']
    | undefined {
    return {
      ...(isObjectSomeKeys(this.#length.get, ['min', 'max']) && {
        length: this.#length.get,
      }),
      ...(isDefined(this.#pattern) && { pattern: this.#pattern }),
    };
  }

  /**
   *
   * @returns
   */
  public static getLength<Min extends number, Max extends number>():
    | MinMax<Min, Max>
    | undefined {
    return this.#length.get;
  }

  /**
   *
   * @returns
   */
  public static getMaxLength<Max extends number>(): Max | undefined {
    return this.#length.getMax();
  }

  /**
   *
   * @returns
   */
  public static getMinLength<Min extends number>(): Min | undefined {
    return this.#length.getMin();
  }

  /**
   *
   * @returns
   */
  public static getPattern(): RegExp | undefined {
    return this.#pattern;
  }

  /**
   *
   * @returns
   */
  public static getPrefix<Min extends number, Max extends number>():
    | Prefix<Min, Max>
    | undefined {
    return this.#prefix;
  }

  /**
   * Checks if any value is an instance of a `Prefix`.
   * @param value The value of any type to check.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `value` is an instance of a `Prefix`.
   * @returns The return value is a `boolean` indicating whether the provided `value` is an instance of a `Prefix`.
   */
  public static isPrefix<Min extends number, Max extends number>(
    value: any,
    callback?: ResultCallback<any>
  ): value is Prefix<Min, Max> {
    return isInstance(value, Prefix, callback);
  }

  /**
   *
   */
  public static setConfiguration<Min extends number, Max extends number>(
    settings: PrefixSettings<Min, Max>,
    callback?: ResultCallback<PrefixSettings<Min, Max>>
  ): typeof Prefix {
    isDefined(settings.length) && this.setLength(settings.length);
    isDefined(settings.pattern) && this.setPattern(settings.pattern);
    return this;
  }

  /**
   *
   * @param length
   * @param callback
   * @returns
   */
  public static setLength<Min extends number, Max extends number>(
    length: MinMax<Min, Max>,
    callback?: ResultCallback<MinMax<Min, Max>>
  ): typeof Prefix {
    this.#length = new Range({ ...this.#length.get, ...length }, callback);
    return this;
  }

  /**
   *
   * @param max
   * @returns
   */
  public static setMaxLength<Max extends number>(
    max: Max,
    callback?: ResultCallback<Max>
  ): typeof Prefix {
    guardNumber(max, callback) &&
      (this.#length = new Range({ min: this.#length.min, max }));
    return this;
  }

  /**
   *
   * @param min
   * @returns
   */
  public static setMinLength<Min extends number>(
    min: Min,
    callback?: ResultCallback<Min>
  ): typeof Prefix {
    guardNumber(min, callback) &&
      (this.#length = new Range({ min, max: this.#length.max }));
    return this;
  }

  /**
   *
   * @param pattern
   * @param callback
   * @returns
   */
  public static setPattern(
    pattern: RegExp,
    callback?: ResultCallback<RegExp>
  ): typeof Prefix {
    guardRegExp(pattern, callback) && (this.#pattern = pattern);
    return this;
  }

  /**
   *
   * @param prefix
   * @param settings
   * @param callback
   * @returns
   */
  public static setPrefix<Min extends number, Max extends number>(
    prefix: string,
    settings?: PrefixSettings<Min, Max>,
    callback?: ResultCallback<string, PrefixSettings<Min, Max>>
  ): typeof Prefix {
    this.#prefix = new Prefix(
      prefix,
      {
        length: {
          ...this.#length.get,
          ...settings?.length,
        },
        pattern: settings?.pattern || this.#pattern,
      },
      callback
    );
    return this;
  }
  //#endregion static public methods.

  //#region static private methods.
  //#endregion static private methods.
  //#endregion static methods.

  //#region constructor.
  /**
   * 
   * @param prefix 
   * @param settings 
   * @param callback 
   */
  constructor(
    prefix: string,
    settings?: PrefixSettings<Min, Max>,
    callback?: ResultCallback<string, PrefixSettings<Min, Max>>
  ) {
    super(prefix, settings, callback);
  }
  //#endregion constructor.

  //#region instance methods.
  //#region instance public methods.
  /**
   * Returns the actual configuration for the `prefix` of a `Prefix` instance.
   * @returns The return value is an `object` of a `AffixSettings` interface.
   * @angularpackage
   */
  public getConfiguration(): PrefixConfiguration<Min, Max>['default'] {
    return super.getConfiguration();
  }
  /**
   *
   * @returns
   */
  public valueOf(): string {
    return super.valueOf();
  }
  //#endregion instance public methods.
  //#endregion instance methods.
}
