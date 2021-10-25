// @angular-package/type.
import { MinMax, isDefined } from '@angular-package/type';
// @angular-package/testing.
import {
  Testing,
  TestingToBeMatchers,
  randomNumber,
  randomString,
} from '@angular-package/testing';
// Prefix.
import { Prefix } from '../src/prefix.class';
// Spec.
import { specPrefix } from '../../../test/spec-prefix.func';
/**
 * Initialize testing.
 */
const testing = new Testing(false, true);
const toBe = new TestingToBeMatchers();
/**
 * Specs.
 */
testing.describe(`Prefix`, () => {
  let length: MinMax<any, any>;
  let min = randomNumber(32);
  let max = randomNumber(100) + min;
  let affix: string = randomString(min);
  let pattern: RegExp;

  beforeEach(() => {
    min = randomNumber(32);
    max = randomNumber(100) + min;
    affix = randomString(min);
    length = { min, max };
    pattern = /[^a-zA-Z$_]/g;
  });

  testing
    .describe(`static`, () => {
      testing

        /**
         * .definePrefix()
         */
        .it(`.definePrefix()`, () =>
          specPrefix(Prefix.definePrefix(affix, { length, pattern }), {
            length,
            pattern,
          })
        )

        /**
         * .setMaxLength()
         * .getMaxLength()
         * .setMinLength()
         * .getMinLength()
         * .setLength()
         * .getLength()
         */
        .it(`.setMaxLength() .getMaxLength()`, () => {
          Prefix.setMaxLength(max, (result, value, payload) => {
            toBe.true(result).number(value);
            expect(value).toEqual(max);
            return result;
          });

          expect(Prefix.getMaxLength()).toEqual(max);
          toBe.number(Prefix.getMaxLength());

          // Clears.
          Prefix.setLength({});
        })

        /**
         * .setMinLength()
         * .getMinLength()
         */
        .it(`.setMinLength() .getMinLength()`, () => {
          Prefix.setMinLength(min, (result, value, payload) => {
            toBe.true(result).number(value);
            expect(value).toEqual(min);
            return result;
          });

          expect(Prefix.getMinLength()).toEqual(min);
          toBe.number(Prefix.getMinLength());

          // Clears.
          Prefix.setLength({});
        })

        /**
         * .setLength()
         * .getLength()
         */
        .it(`.setLength() .getLength()`, () => {
          Prefix.setLength({ min: 333, max: 666 }, (result, value, payload) => {
            toBe.true(result).object(value).number(value.max).number(value.min);
            expect(value.max).toEqual(666);
            expect(value.min).toEqual(333);
            return result;
          });
          expect(Prefix.getMinLength()).toEqual(333);
          expect(Prefix.getLength()?.min).toEqual(333);
          expect(Prefix.getMaxLength()).toEqual(666);
          expect(Prefix.getLength()?.max).toEqual(666);
          expect(Prefix.getLength()).toEqual({ min: 333, max: 666 });
          toBe.object(Prefix.getLength());

          // Clears.
          Prefix.setLength({});
        })

        /**
         * .setLength()
         * .getLength()
         */
        .it(`.setLength() .getLength()`, () => {
          Prefix.setLength({ min, max }, (result, value, payload) => {
            toBe.true(result).object(value).number(value.max).number(value.min);
            expect(value.max).toEqual(max);
            expect(value.min).toEqual(min);
            return result;
          });
          expect(Prefix.getMinLength()).toEqual(min);
          expect(Prefix.getLength()?.min).toEqual(min);
          expect(Prefix.getMaxLength()).toEqual(max);
          expect(Prefix.getLength()?.max).toEqual(max);
          expect(Prefix.getLength()).toEqual({ min, max });
          toBe.object(Prefix.getLength());
        })

        /**
         * .getConfiguration()
         * .setPrefix()
         * .getPrefix()
         */
        .it(`.setPrefix(), .getPrefix() .getConfiguration()`, () => {
          // expect(Prefix.getConfiguration()).toBeUndefined();
          // toBe.undefined(Prefix.getConfiguration());
          // expect(Prefix.getConfiguration()).toBeDefined();
          // toBe.defined(Prefix.getConfiguration());

          Prefix.setPrefix(affix, { length, pattern });

          // Test.
          const prefix1 = Prefix.getPrefix();
          const configuration1 = Prefix.getPrefix()?.getConfiguration();
          expect(prefix1).toBeDefined();
          expect(configuration1).toBeDefined();
          isDefined(prefix1) &&
            isDefined(configuration1) &&
            specPrefix(prefix1, configuration1);

          // Test.
          const prefix2 = Prefix.setLength({ min: 5, max: 10 })
            .setPrefix(randomString(5), { length: { min: 5, max: 10 } })
            .setLength({})
            .getPrefix();
          const configuration2 = Prefix.getPrefix()?.getConfiguration();
          expect(prefix2).toBeDefined();
          expect(configuration2).toBeDefined();
          isDefined(prefix2) &&
            isDefined(configuration2) &&
            specPrefix(prefix2, configuration2);
        })

        /**
         * .setPattern()
         * .getPattern()
         */
        .it(`.setPattern() .getPattern()`, () => {
          Prefix.setPattern(null as any, (result, value, payload) => {
            expect(value).toBeNull();
            toBe.false(result).null(value);
            return result;
          });
          expect(Prefix.getPattern()).toEqual(/[^a-zA-Z0-9$_]/g);

          Prefix.setPattern(/[^a-z]/g, (result, value, payload) => {
            expect(value).toEqual(/[^a-z]/g);
            toBe.true(result).regexp(value);
            return result;
          });
          expect(Prefix.getPattern()).toEqual(/[^a-z]/g);
        })

        /**
         * .isPrefix()
         */
        .it(`isPrefix() equal to true`, () =>
          expect(Prefix.isPrefix(new Prefix(''))).toBeTrue()
        )
        .it(`isPrefix() equal to false`, () =>
          expect(Prefix.isPrefix(null as any)).toBeFalse()
        );
    })

    /**
     * `Prefix` instance.
     */
    .describe(`instance`, () => {
      testing
        .it(
          `specPrefix(new Prefix(affix, { length, pattern }), { length, pattern })`,
          () =>
            specPrefix(new Prefix(affix, { length, pattern }), {
              length,
              pattern,
            })
        )
        .it(`specPrefix({ length, pattern })`, () =>
          specPrefix(affix, { length, pattern })
        )
        .it(`specPrefix({ length })`, () => {
          specPrefix(affix, { length }, (prefix) => {
            expect(prefix.getPattern()).toBeUndefined();
            toBe
              .object(prefix.getLength())
              .objectKeys(prefix.getLength(), ['min', 'max'])
              .undefined(prefix?.getPattern());
          });
        })

        .it(`specPrefix({ pattern })`, () => {
          specPrefix(affix, { pattern }, (prefix) => {
            expect(prefix.getLength()).toBeUndefined();
            expect(prefix.getMaxLength()).toBeUndefined();
            expect(prefix.getMinLength()).toBeUndefined();
            expect(prefix.getPattern()).toBeDefined();
            toBe
              .undefined(prefix.getLength())
              .undefined(prefix.getMaxLength())
              .undefined(prefix.getMinLength())
              .defined(prefix.getPattern());
          });
        });
    });
});
