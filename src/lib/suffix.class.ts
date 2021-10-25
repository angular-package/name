// // @angular-package/type.
// import {
//   // Type.
//   ResultCallback,
//   // Function.
//   guardObject,
//   guardString,
//   isDefined,
//   isInstance,
// } from '@angular-package/type';
// // Class.
// import { Affix } from './affix.class';
// // Interface.
// import { AffixSettings } from '../interface/affix-settings.interface';
// /**
//  * Manages the `suffix` of a string type for the name.
//  */
// export class Suffix extends Affix {
//   //#region public properties
//   /**
//    * Returns privately stored `suffix`.
//    */
//   public get get(): string {
//     return this.#suffix;
//   }

//   /**
//    * Pick attributes of the `suffix` from the settings.
//    */
//   public get pick(): Pick<AffixSettings, 'length' | 'pattern'> {
//     return {
//       length: this.getLength(),
//       pattern: this.getPattern(),
//     };
//   }
//   //#endregion

//   //#endregion private properties
//   /**
//    * Privately stored `suffix` of a `string` type.
//    */
//   #suffix = '';
//   //#endregion

//   //#region static methods
//   /**
//    * Returns defined string-type `suffix` filtered with the specified regular expression of a specified maximum `length`.
//    * @param suffix A `string` type value as the `suffix`.
//    * @param settings An optional `object` of a `AffixSettings` interface to configure the provided `suffix`.
//    * @returns The return value is a `suffix` of a `string` type or an empty string if the `suffix` is not a `string` type.
//    */
//    static define(suffix: string, settings?: AffixSettings): string {
//     return guardString(
//       suffix,
//       settings?.callback ? settings.callback : undefined
//     )
//       ? suffix
//           .replace(settings?.pattern ? settings.pattern : /[^a-zA-Z0-9$_]/g, '')
//           .slice(0, settings?.length ? settings.length : 3)
//       : '';
//   }

//   /**
//    * Checks if any value is an instance of a `suffix`.
//    * @param value Any `value` to check.
//    * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the
//    * `value` is an instance of a `suffix`.
//    * @returns The return value is a `boolean` indicating whether or not the value is an instance of a `Suffix`.
//    */
//   static isSuffix(value: any, callback?: ResultCallback): value is Suffix {
//     return isInstance(value, Suffix, callback);
//   }
//   //#endregion

//   /**
//    * Manages the `suffix` for the name of a string type.
//    * Initially sets the `suffix` with optional settings.
//    * @param suffix An optional `string` type value to initially set the `suffix`.
//    * @param settings An optional object of a `AffixSettings` interface to customize the provided `suffix`.
//    */
//   constructor(suffix?: string, settings?: AffixSettings) {
//     super();
//     if (isDefined(suffix)) {
//       if (isDefined(settings)) {
//         this.configure(settings);
//       }
//       this.set(suffix);
//     }
//   }

//   //#region instance methods
//   /**
//    * Configures `callback`, `length`, and `pattern` options of the settings.
//    * @param settings An `object` of a `AffixSettings` interface.
//    * @returns The return value is an instance of a `Suffix` for the chaining.
//    */
//   public configure(settings: AffixSettings): this {
//     if (guardObject(settings)) {
//       if (isDefined(settings.length)) {
//         this.setLength(settings.length);
//       }
//       if (isDefined(settings.pattern)) {
//         this.setPattern(settings.pattern);
//       }
//     }
//     return this;
//   }

//   /**
//    * Defines the `suffix` with the actual settings.
//    * @param suffix A `string` type value.
//    * @param callback A `ResultCallback` function to handle the result of the check whether or not the `suffix` is a `string` type.
//    * @returns The return value is a `suffix` of a  `string` type or an empty string if the `suffix` is not a `string` type.
//    */
//   public define(
//     suffix: string,
//     callback?: ResultCallback
//   ): string {
//     return Suffix.define(suffix, {
//       callback,
//       length: this.getLength(),
//       pattern: this.getPattern(),
//     });
//   }

//   /**
//    * Returns the actual settings of a `Suffix` instance.
//    * @returns The return value is an `object` of a `AffixSettings` interface.
//    */
//   public getSettings(): AffixSettings {
//     return {
//       length: this.getLength(),
//       pattern: this.getPattern(),
//     };
//   }

//   /**
//    * Sets the `suffix` with the actual settings.
//    * The method works if an instance is not locked by the `lock()` method.
//    * @param suffix A `string` type value.
//    * @param callback A `ResultCallback` function to handle the result of the check whether or not the `suffix` is a `string`.
//    * @returns The return value is an instance of a `Suffix` for the chaining.
//    */
//   public set(
//     suffix: string,
//     callback?: ResultCallback
//   ): this {
//     this.#suffix = Suffix.define(suffix, {
//       ...callback,
//       ...this.pick,
//     });
//     return this;
//   }

//   /**
//    * Update privately stored `suffix` with the actual settings.
//    * The method works if an instance is not locked by the `lock()` method.
//    * @returns The return value is a `Suffix` instance for the chaining.
//    */
//   public updateSuffix(): this {
//     this.set(this.#suffix);
//     return this;
//   }
//   //#endregion
// }
