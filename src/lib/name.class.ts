import {
  ResultCallback,
  isDefined,
  isObject,
  isString,
  isTrue,
} from '@angular-package/type';
import { randomString } from '@angular-package/testing';

import { Prefix } from '../affix/prefix/src/prefix.class';
import { Suffix } from '../affix/suffix/src/suffix.class';
import { PrefixSettings } from '../affix/prefix/interface/prefix-settings.interface';
import { SuffixSettings } from '../affix/suffix/interface/suffix-settings.interface';
import { NameSettings } from '../interface/name-settings.interface';
import { Affix } from '../affix/src/affix.class';
import { PrefixConfiguration } from '../affix/prefix/interface/prefix-configuration.interface';
import { SuffixConfiguration } from '../affix/suffix/interface/suffix-configuration.interface';
import { StringOfLength } from '@angular-package/type';
import { NameConfiguration } from '../interface/name-configuration.interface';

// type NameLength<Min extends number, Max extends number> = MinMax<Min, Max>;

export class Name<Min extends number, Max extends number> extends Affix<
  Min,
  Max
> {
  //#region properties.
  //#region static properties.
  /**
   * 
   */
  static #defaultPrefix: Prefix<any, any> | undefined;

  /**
   * 
   */
  static #defaultSuffix: Suffix<any, any> | undefined;

  /**
   * 
   */
  static #name$: Name<any, any>;
  //#endregion static methods.

  //#region instance properties.
  /**
   * Returns the exact length of the primitive value of the `Name` instance.
   */
  public get length(): number {
    return super.length;
  }

  /**
   * 
   */
  public get name(): string {
    return this.#name;
  }

  /**
   * 
   */
  public get prefix(): string | undefined {
    return this.#prefix?.get;
  }

  /**
   * 
   */
  public get suffix(): string | undefined {
    return this.#suffix?.get;
  }

  //#region instance private properties.
  /**
   * 
   */
  #name = '';

  /**
   * 
   */
  #prefix: Prefix<any, any> | undefined;

  /**
   * 
   */
  #suffix: Suffix<any, any> | undefined;
  //#endregion instance private properties.
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.
  //#region static public methods.
  /**
   * 
   * @param name 
   * @param settings 
   * @param callback 
   * @returns 
   */
  public static defineName<Min extends number, Max extends number>(
    name: string,
    settings?: NameSettings<Min, Max>,
    callback?: ResultCallback<string, NameSettings<Min, Max>>
  ): Name<Min, Max> {
    return new Name(name, this.#pickSettings(settings), callback);
  }

  /**
   * 
   * @returns 
   */
  public static getName<Min extends number, Max extends number>():
    | Name<Min, Max>
    | undefined {
    return this.#name$;
  }

  /**
   * 
   * @returns 
   */
  public static getPrefix<Min extends number, Max extends number>():
    | Prefix<Min, Max>
    | undefined {
    return this.#defaultPrefix;
  }

  /**
   * 
   * @returns 
   */
  public static getSuffix<Min extends number, Max extends number>():
    | Suffix<Min, Max>
    | undefined {
    return this.#defaultSuffix;
  }

  /**
   * 
   * @param name 
   * @param settings 
   * @param callback 
   * @returns 
   */
  public static setName<Min extends number, Max extends number>(
    name: string,
    settings?: NameSettings<Min, Max>,
    callback?: ResultCallback<string, NameSettings<Min, Max>>
  ): typeof Name {
    this.#name$ = new Name(name, settings, callback);
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
    prefix: string | Prefix<Min, Max>,
    settings?: PrefixSettings<Min, Max>,
    callback?: ResultCallback<string | Prefix<Min, Max>>
  ): typeof Name {
    this.#defaultPrefix = isString(prefix, callback)
      ? new Prefix(prefix, settings)
      : prefix;
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
    suffix: string | Suffix<Min, Max>,
    settings?: SuffixSettings<Min, Max>,
    callback?: ResultCallback<string | Suffix<Min, Max>>
  ): typeof Name {
    this.#defaultSuffix = isString(suffix, callback)
      ? new Suffix(suffix, settings)
      : suffix;
    return this;
  }
  //#endregion static public methods.

  //#region static private methods.
  /**
   * 
   * @param settings 
   * @returns 
   */
  static #pickSettings<Min extends number, Max extends number>(
    settings?: NameSettings<Min, Max>
  ): NameSettings<Min, Max> | undefined {
    return {
      ...{ prefix: this.#defaultPrefix },
      ...{ suffix: this.#defaultSuffix },
      ...settings,
    };
  }
  //#endregion static private methods.
  //#endregion static methods.

  //#region constructor.
  /**
   * 
   * @param name 
   * @param settings 
   * @param callback 
   */
  constructor(
    name: string,
    settings?: NameSettings<Min, Max>,
    callback?: ResultCallback<string, NameSettings<Min, Max>>
  ) {
    super(name, settings, callback);
    this.#setPrefix(settings?.prefix)
      .#setSuffix(settings?.suffix)
      .#setName(this.get);
  }
  //#endregion constructor.

  //#region instance methods.
  //#region instance public methods.
  /**
   * 
   * @returns 
   */
  public getConfiguration(): NameConfiguration<Min, Max>['default'] {
    return {
      ...(isDefined(this.getLength()) && { length: this.getLength() }),
      ...(isDefined(this.getPattern()) && { pattern: this.getPattern() }),
      ...(isDefined(this.getPrefix()) && { prefix: this.getPrefix()?.get }),
      ...(isDefined(this.getSuffix()) && { suffix: this.getSuffix()?.get }),
    };
  }

  /**
   * 
   * @returns 
   */
  public getPrefix(): Prefix<any, any> | undefined {
    return this.#prefix;
  }

  /**
   * 
   * @returns 
   */
  public getSuffix(): Suffix<any, any> | undefined {
    return this.#suffix;
  }

  /**
   * 
   * @returns 
   */
  public valueOf(): string {
    return super.valueOf();
  }
  //#endregion instance public methods.

  //#region instance private methods.
  /**
   * 
   * @param name 
   * @returns 
   */
  #setName(name: string): this {
    this.#name = `${isDefined(this.#prefix) ? this.#prefix.get : ''}${name}${
      isDefined(this.#suffix) ? this.#suffix.get : ''
    }`;
    return this;
  }

  /**
   * 
   * @param prefix 
   * @returns 
   */
  #setPrefix(prefix?: string | Prefix<any, any>): this {
    isDefined(prefix) &&
      ((isString(prefix) && (this.#prefix = new Prefix(prefix))) ||
        (Prefix.isPrefix(prefix) && (this.#prefix = prefix)));
    return this;
  }

  /**
   * 
   * @param suffix 
   * @returns 
   */
  #setSuffix(suffix?: string | Suffix<any, any>): this {
    isDefined(suffix) &&
      ((isString(suffix) && (this.#suffix = new Suffix(suffix))) ||
        (Suffix.isSuffix(suffix) && (this.#suffix = suffix)));
    return this;
  }
  //#endregion instance private methods.
  //#endregion instance methods.
}

Name
  .setPrefix('database_')
  .setSuffix('_1');


// console.log(
//   Name.getPrefix(),
//   Name.getSuffix(),
//   Name.defineName('cities', { prefix: 'PREFIX_', suffix: '_SUFFIX' }),
//   Name.defineName('users')
// );

const c = Name.defineName('cities', {
  length: { max: 3 },
  prefix: 'PREFIX_',
  suffix: '_SUFFIX',
});
console.log(c);

// const name1 = new Name(randomString(12), {
//   length: { min: 3, max: 12 },
//   pattern: /[^a-z0-9_]/g,
//   prefix: 'PREFIXED_',
//   suffix: '_SUFFIXED',
// });

// console.log(name1);

// const testPrefix = new Prefix('prx_', {
//   length: { min: 0, max: 5 },
//   pattern: /[^a-z0-9_]/g,
// });
// const testSuffix = new Suffix('_sfx');

// // Name.setPrefix('prefix_').setSuffix('_suffix');
// const instanceAffix = new Name(randomString(33), {
//   length: { min: 0, max: 33 },
//   prefix: testPrefix,
//   suffix: testSuffix,
//   // pattern: /[^a-z0-9]/g
// });

// console.log(instanceAffix);

// const stringAffix = new Name(randomString(33), {
//   length: { min: 0, max: 33 },
//   prefix: '$$$$$$_',
//   suffix: '______',
//   pattern: /[^a-z0-9]/g
// });

// console.log(stringAffix);

// console.group(`properties`);

// console.log(`get: `,    myName.get);
// console.log(`length: `, myName.length);
// console.log(`prefix: `, myName.prefix);
// console.log(`suffix: `, myName.suffix);

// console.groupEnd();

// console.group(`methods`);

// console.log(myName.getConfiguration());
// // console.log(myName.generateName(true, false));
// console.log(myName.getPrefixedName());
// console.log(myName.getSuffixedName());
// console.log(myName.getLength());
// console.log(myName.getMaxLength());
// console.log(myName.getMinLength());
// console.log(myName.getPattern());
// console.log(myName.getPrefix());
// console.log(myName.getSuffix());
// console.log(myName.valueOf());

// console.groupEnd();
