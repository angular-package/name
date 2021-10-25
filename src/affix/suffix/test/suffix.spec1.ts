// // @angular-package/testing.
// import { Testing } from '@angular-package/testing';
// // External import: Type.
// import { ResultCallback } from '@angular-package/type';
// // Import: Class.
// import { Suffix } from '../lib/suffix.class';
// // Interface.
// import { AffixSettings } from '../interface/affix-settings.interface';
// /**
//  * Initialize.
//  */
// const testing = new Testing(false, true);

// /**
//  * Tests.
//  * ------
//  * Suffix.define()
//  * + new Suffix()
//  * + new Suffix().config()
//  * + new Suffix().get
//  * + new Suffix().length()
//  * + new Suffix().lock()
//  * + new Suffix().pattern()
//  * + new Suffix().set()
//  */
// testing.describe(Suffix.name, () => {
//   // Constant.
//   const callback: ResultCallback = (result: boolean, value: any): boolean => {
//     if (result === true) {
//       throw new Error('Result is string');
//     }
//     return result;
//   };
//   const length = 8;
//   const pattern = /[^0-9$_]/g;
//   const initialSuffix = '$$!@#';
//   const config: AffixSettings = {
//     pattern,
//     length
//   };

//   // Variable.
//   let nameSuffix: Suffix;
//   let suffix = 'database';

//   beforeEach(() => nameSuffix = new Suffix());
//   beforeEach(() => suffix = 'database');


//   it('is DEFINED', () => expect(nameSuffix).toBeDefined());

//   // Default callback.
//   it('has default callback', () => {
//     try {
//       const n: any = 5;
//       nameSuffix.set(n);
//     } catch (e) {
//       expect(e.message).toContain(`Suffix must be a \`string\` type`);
//     }
//   });

//   // Custom callback.
//   it('has custom callback', () => {
//     try {
//       nameSuffix.set('$$$', callback);
//     } catch (e) {
//       expect(e.message).toEqual('Result is string');
//     }
//   });

//   // Initial.
//   describe('initially', () => {
//     it (`set suffix to ${initialSuffix} but pattern change it to '$$'`, () => expect(new Suffix(initialSuffix).get).toEqual('$$'));
//     it (`set suffix to ${initialSuffix} with config`, () => expect(new Suffix(initialSuffix, config).get).toEqual('$$'));
//   });

//   // Instance.
//   describe(`instance`, () => {
//     // .set()
//     it(`set(${suffix})`, () => expect(nameSuffix.set(suffix).get).toEqual('dat'));
//     // set().length()
//     it(`set(${suffix}).length(${length})`, () => expect(nameSuffix.setLength(length).set(suffix).get).toEqual(suffix));
//     // set().pattern()
//     it(`set(${suffix}27).pattern(${pattern})`, () => expect(nameSuffix.setPattern(pattern).set(`${suffix}27`).get).toEqual('27'));
//     // set().config()
//     it(`set(${suffix}27).config(${ {length, pattern} })`, () =>
//       expect(nameSuffix.configure({ length, pattern }).set(`${suffix}27`).get).toEqual('27'));
//   });

//   describe(`instance lock()`, () => {
//     // set(suffix).length(length)
//     it(`cannot change set(${suffix}).length(${length})`, () => {
//       expect(nameSuffix.setLength(length).set(suffix).get).toEqual(suffix);
//       expect(nameSuffix.lock().isLocked).toBeTrue();
//       expect(nameSuffix.setLength(1).pick.length).toEqual(length);
//     });
//     // set(suffix).pattern(pattern)
//     it(`cannot change set(${suffix}27).pattern(${pattern})`, () => {
//       expect(nameSuffix.setPattern(pattern).set(`${suffix}27`).get).toEqual('27');
//       expect(nameSuffix.lock().isLocked).toBeTrue();
//       expect(nameSuffix.setPattern(/[]/g).pick.pattern).toEqual(pattern);
//     });
//   });

//   // Static `define()`.
//   describe('define', () => {
//     // define()
//     it(`define(${suffix})`, () => expect(Suffix.define(suffix)).toEqual('dat'));
//     // define(suffix, {length})
//     it(`define(${suffix}, ${ { length } })`, () => expect(Suffix.define(suffix, { length })).toEqual('database'));
//     // define(suffix, {pattern})
//     it(`define(${suffix}27, ${ { pattern } })`, () => expect(Suffix.define(`${suffix}27`, { pattern })).toEqual('27'));
//     // define(suffix, {length,pattern})
//     it(`define(${suffix}27, ${ { length, pattern } })`, () => expect(Suffix.define(`${suffix}27`, { length, pattern })).toEqual('27'));
//   });
// });
