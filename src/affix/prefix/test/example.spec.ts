// import { randomString } from '@angular-package/testing';
// import { PrefixSettings } from '../interface/prefix-settings.interface';
// import { PrefixConfiguration } from '../interface/prefix-configuration.interface';
// import { Prefix } from '../src/prefix.class';

// /**
//  * Example.
//  */
// class Prefixes {
//   static #configuration: Map<string, PrefixSettings> = new Map();

//   public static setConfiguration<Min extends number, Max extends number>(
//     name: string,
//     settings: PrefixSettings<Min, Max>
//   ): typeof Prefixes {
//     this.#configuration.set(name, settings);
//     return this;
//   }

//   public static getConfiguration<
//     Min extends number,
//     Max extends number,
//     Name extends string = string
//   >(name: Name): PrefixConfiguration<Min, Max>[Name] {
//     return this.#configuration.get(name) as PrefixConfiguration<Min, Max>;
//   }

//   constructor(prefix: string) {}
// }

// Prefixes.setConfiguration('name', {
//   length: { min: 9, max: 27 },
//   pattern: /[^a-zA-Z0-9$_]/g,
// });

// console.log(`aaaa: `, Prefixes.getConfiguration<0, 9>('name').length);


// /**
//  * MORE !
//  */
// // const first = new Prefix('first');
// // console.log(first);
// Prefix.setConfiguration({ length: { max: 12 }, pattern: /[^a-z]/g});
// // console.log(Prefix.getConfiguration());
// // Prefix.clearConfiguration();
// console.log(Prefix.getConfiguration());
// console.log(Prefix.definePrefix(randomString(12)));
// console.log(Prefix.setPrefix(randomString(12)).getPrefix()?.getConfiguration());


// const prefixPersonConfiguration: PrefixConfiguration['default'] = {
//   length: { min: 0, max: 5 },
//   pattern: /[^a-z]/g
// }

// class PersonPrefix extends Prefix<any, any> {
//   constructor(prefix: string, callback?: ResultCallback<string>) {
//     super(prefix, prefixPersonConfiguration, callback);
//   }
// }

// console.log(new PersonPrefix('bla3', (result, value) => {
//   console.log(result, value);
//   return result;
// }));