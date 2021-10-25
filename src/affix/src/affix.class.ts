// @angular-package/type.
import {
  // Type.
  MinMax,
  ResultCallback,
  // Function,
  guardObjectSomeKeys,
  guardRegExp,
  guardStringLength,
  isDefined,
} from '@angular-package/type';
// Class.
import { Range } from '@angular-package/range';
// Interface.
import { AffixConfiguration } from '../interface/affix-configuration.interface';
import { AffixSettings } from '../interface/affix-settings.interface';
/**
 * Manages settings for the `affix` of a string type.
 */
export abstract class Affix<
  Min extends number = number,
  Max extends number = number
> extends String {
  //#region instance properties.
  //#region instance public properties.
  /**
   * Gets the primitive value of an instance.
   */
  public get get(): string {
    return super.valueOf();
  }
  //#endregion instance public properties.

  //#region instance private properties.
  /**
   * The maximum length of a `number` type.
   */
  #length: Range<Min, Max> | undefined;

  /**
   * The pattern of a `RegExp` type for the affix.
   */
  #pattern: RegExp | undefined;

  /**
   * Private (independent) property indicates the actual configuration of an instance.
   */
  get #configuration(): AffixConfiguration<Min, Max>['default'] {
    return {
      ...(isDefined(this.getLength()) && { length: this.getLength() }),
      ...(isDefined(this.getPattern()) && { pattern: this.getPattern() }),
    };
  }
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static private methods.
  /**
   *
   * @param affix
   * @param settings
   * @param callback
   * @returns
   */
  static #defineAffix<Min extends number, Max extends number>(
    affix: string,
    settings?: AffixSettings<Min, Max>,
    callback?: ResultCallback<string, AffixSettings<Min, Max>>
  ): string {
    return guardStringLength(affix, settings?.length || {}, callback, settings)
      ? affix.replace(settings?.pattern || '', '')
      : '';
  }
  //#endregion static private methods.

  //#region constructor.
  /**
   * Manages the affix.
   * Creates an instance and initially sets the affix `length` and `pattern`.
   * @angularpackage
   */
  constructor(
    affix: string,
    settings?: AffixSettings<Min, Max>,
    callback?: ResultCallback<string, AffixSettings<Min, Max>>
  ) {
    super(Affix.#defineAffix(affix, settings, callback));
    isDefined(settings) && this.#setSettings(settings);
  }
  //#endregion constructor.

  //#region instance methods.
  //#region instance public methods.
  /**
   * Returns the actual configuration for the `prefix` of a `Prefix` instance.
   * @returns The return value is an `object` of a `AffixSettings` interface.
   * @angularpackage
   */
  public getConfiguration(): AffixConfiguration<Min, Max>['default'] {
    return this.#configuration;
  }

  /**
   * Returns `pattern` of the actual settings for the affix, which by default is set to `/[^a-zA-Z0-9$_]/g`.
   * @returns The return value is a privately stored regular expression of a `RegExp` type.
   * @angularpackage
   */
  public getPattern(): RegExp | undefined {
    return this.#pattern;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public getMaxLength(): MinMax<Min, Max>['max'] | undefined {
    return this.#length?.max;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public getMinLength(): MinMax<Min, Max>['min'] | undefined {
    return this.#length?.min;
  }

  /**
   * Returns the maximum `length` of the actual settings for the affix, which by default is set to `3`.
   * @returns The return value is a privately stored maximum length of the affix of a `number` type.
   * @angularpackage
   */
  public getLength(): MinMax<Min, Max> | undefined {
    return this.#length?.valueOf();
  }
  //#endregion instance public methods.

  //#region instance private methods.
  /**
   * Sets the length of the affix, which by default is set to `3`.
   * The method works if an instance is not locked by the `lock()` method.
   * @param length A `number` type value, that indicates the maximum `length` of the affix.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the length is
   * of a `number` type.
   * @returns The return value is a child class instance for the chaining.
   * @angularpackage
   */
  #setLength(
    length: MinMax<Min, Max>,
    callback?: ResultCallback<MinMax<Min, Max>>
  ): this {
    this.#length = new Range(length, callback);
    return this;
  }

  /**
   * Sets the pattern of a `RegExp` for the affix. The method works if an instance is not locked by the `lock()` method.
   * @param pattern A `RegExp` type value used to filter the affix.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `pattern`
   * is of a `RegExp` type.
   * @returns The return value is a child class instance for the chaining.
   * @angularpackage
   */
  #setPattern(pattern: RegExp, callback?: ResultCallback<RegExp>): this {
    guardRegExp(pattern, callback) && (this.#pattern = pattern);
    return this;
  }

  /**
   *
   * @param settings
   * @returns
   * @angularpackage
   */
  #setSettings(settings: AffixSettings<Min, Max>): this {
    guardObjectSomeKeys(settings, ['length', 'pattern']) &&
      (isDefined(settings.length) && this.#setLength(settings.length),
      isDefined(settings.pattern) && this.#setPattern(settings.pattern));
    return this;
  }
  //#endregion instance private methods.
  //#endregion instance methods.
}
