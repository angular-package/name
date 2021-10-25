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
import { SuffixConfiguration } from '../interface/suffix-configuration.interface';
import { SuffixSettings } from '../interface/suffix-settings.interface';
/**
 *
 */
export class Suffix<Min extends number, Max extends number> extends Affix<
  Min,
  Max
> {
  //#region properties.
  //#region static properties.
  //#region static public properties.
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
  static #suffix: Suffix<any, any> | undefined;
  //#endregion static public properties.
  //#endregion static properties.

  //#region instance public properties.
  /**
   * Gets the primitive value of an `Suffix` instance.
   */
  public get get(): string {
    return super.get;
  }

  /**
   * Returns the exact length of the primitive value of the `Suffix` instance.
   */
  public get length(): number {
    return super.length;
  }
  //#endregion instance public properties.
  //#endregion properties.

  //#region static methods.
  //#region static public methods.
  public static clearConfiguration(): typeof Suffix {
    (this.#length = new Range({})), (this.#pattern = undefined);
    return this;
  }

  public static defineSuffix<Min extends number, Max extends number>(
    suffix: string,
    settings?: SuffixSettings<Min, Max>,
    callback?: ResultCallback<string, SuffixSettings<Min, Max>>
  ): Suffix<Min, Max> {
    return new Suffix(suffix, this.#pickConfiguration(settings), callback);
  }

  /**
   *
   * @returns
   */
  public static getConfiguration<Min extends number, Max extends number>():
    | SuffixConfiguration<Min, Max>['default']
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
  public static getSuffix<Min extends number, Max extends number>():
    | Suffix<Min, Max>
    | undefined {
    return this.#suffix;
  }

  /**
   * Checks if any value is an instance of a `Suffix`.
   * @param value The value of any type to check.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `value` is an instance of a `Suffix`.
   * @returns The return value is a `boolean` indicating whether the provided `value` is an instance of a `Suffix`.
   */
  public static isSuffix<Min extends number, Max extends number>(
    value: any,
    callback?: ResultCallback<any>
  ): value is Suffix<Min, Max> {
    return isInstance(value, Suffix, callback);
  }

  /**
   *
   */
  public static setConfiguration<Min extends number, Max extends number>(
    settings: SuffixSettings<Min, Max>,
    callback?: ResultCallback<SuffixSettings<Min, Max>>
  ): typeof Suffix {
    this.setLength(this.#pickLength(settings), callback as any).setPattern(
      this.#pickPattern(settings) as RegExp,
      callback as any
    );
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
  ): typeof Suffix {
    this.#length = new Range(length, callback);
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
  ): typeof Suffix {
    guardNumber(max, callback) &&
      (this.#length = new Range({
        ...(isDefined(this.#length.min) && { min: this.#length.min }),
        max,
      }));
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
  ): typeof Suffix {
    guardNumber(min, callback) &&
      (this.#length = new Range({
        min,
        ...(isDefined(this.#length.max) && { max: this.#length.max }),
      }));
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
  ): typeof Suffix {
    guardRegExp(pattern, callback) && (this.#pattern = pattern);
    return this;
  }

  /**
   *
   * @param suffix
   * @param settings
   * @param callback
   * @returns
   */
  public static setSuffix<Min extends number, Max extends number>(
    suffix: string,
    settings?: SuffixSettings<Min, Max>,
    callback?: ResultCallback<string, SuffixSettings<Min, Max>>
  ): typeof Suffix {
    this.#suffix = new Suffix(
      suffix,
      this.#pickConfiguration(settings),
      callback
    );
    return this;
  }
  //#endregion static public methods.

  //#region static private methods.
  /**
   *
   * @param settings
   * @returns
   */
  static #pickConfiguration<Min extends number, Max extends number>(
    settings?: SuffixSettings<Min, Max>
  ): SuffixConfiguration<Min, Max>['default'] {
    return {
      length: this.#pickLength(settings),
      pattern: this.#pickPattern(settings),
    };
  }

  /**
   *
   * @param settings
   * @returns
   */
  static #pickLength<Min extends number, Max extends number>(
    settings?: SuffixSettings<Min, Max>
  ): MinMax<Min, Max> {
    return { ...this.#length.get, ...settings?.length };
  }

  /**
   *
   * @param settings
   * @returns
   */
  static #pickPattern(settings?: SuffixSettings): RegExp | undefined {
    return settings?.pattern || this.#pattern;
  }
  //#endregion static private methods.
  //#endregion static methods.

  //#region constructor.
  /**
   *
   * @param suffix
   * @param settings
   * @param callback
   */
  constructor(
    suffix: string,
    settings?: SuffixSettings<Min, Max>,
    callback?: ResultCallback<string, SuffixSettings<Min, Max>>
  ) {
    super(suffix, settings, callback);
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Returns the actual configuration for the `suffix` of a `Suffix` instance.
   * @returns The return value is an `object` of a `AffixSettings` interface.
   * @angularpackage
   */
  public getConfiguration(): SuffixConfiguration<Min, Max>['default'] {
    return super.getConfiguration();
  }
  /**
   *
   * @returns
   */
  public valueOf(): string {
    return super.valueOf();
  }
  //#endregion static public methods.
}
