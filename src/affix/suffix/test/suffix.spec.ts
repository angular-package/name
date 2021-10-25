import { MinMax, isDefined } from '@angular-package/type';
import {
  Testing,
  TestingToBeMatchers,
  randomNumber,
  randomString,
} from '@angular-package/testing';
import { Suffix } from '../src/suffix.class';
import { specSuffix } from '../../../test/spec-suffix.func';
/**
 *
 */
const testing = new Testing(false, true);
const toBe = new TestingToBeMatchers();
/**
 *
 */
testing.describe(`Suffix`, () => {
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
         * .defineSuffix()
         */
        .it(`.defineSuffix()`, () =>
          specSuffix(Suffix.defineSuffix(affix, { length, pattern }), {
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
          Suffix.setMaxLength(max, (result, value, payload) => {
            toBe.true(result).number(value);
            expect(value).toEqual(max);
            return result;
          });

          expect(Suffix.getMaxLength()).toEqual(max);
          toBe.number(Suffix.getMaxLength());

          // Clears.
          Suffix.setLength({});
        })

        /**
         * .setMinLength()
         * .getMinLength()
         */
        .it(`.setMinLength() .getMinLength()`, () => {
          Suffix.setMinLength(min, (result, value, payload) => {
            toBe.true(result).number(value);
            expect(value).toEqual(min);
            return result;
          });

          expect(Suffix.getMinLength()).toEqual(min);
          toBe.number(Suffix.getMinLength());

          // Clears.
          Suffix.setLength({});
        })

        /**
         * .setLength()
         * .getLength()
         */
        .it(`.setLength() .getLength()`, () => {
          Suffix.setLength({ min: 333, max: 666 }, (result, value, payload) => {
            toBe.true(result).object(value).number(value.max).number(value.min);
            expect(value.max).toEqual(666);
            expect(value.min).toEqual(333);
            return result;
          });
          expect(Suffix.getMinLength()).toEqual(333);
          expect(Suffix.getLength()?.min).toEqual(333);
          expect(Suffix.getMaxLength()).toEqual(666);
          expect(Suffix.getLength()?.max).toEqual(666);
          expect(Suffix.getLength()).toEqual({ min: 333, max: 666 });
          toBe.object(Suffix.getLength());

          // Clears.
          Suffix.setLength({});
        })

        /**
         * .setLength()
         * .getLength()
         */
        .it(`.setLength() .getLength()`, () => {

          Suffix.setLength({ min, max }, (result, value, payload) => {
            toBe.true(result).object(value).number(value.max).number(value.min);
            expect(value.max).toEqual(max);
            expect(value.min).toEqual(min);
            return result;
          });
          expect(Suffix.getMinLength()).toEqual(min);
          expect(Suffix.getLength()?.min).toEqual(min);
          expect(Suffix.getMaxLength()).toEqual(max);
          expect(Suffix.getLength()?.max).toEqual(max);
          expect(Suffix.getLength()).toEqual({ min, max });
          toBe.object(Suffix.getLength());
        })

        /**
         * .getConfiguration()
         * .setSuffix()
         * .getSuffix()
         */
        .it(`.setSuffix(), .getSuffix() .getConfiguration()`, () => {
          // expect(Suffix.getConfiguration()).toBeUndefined();
          // toBe.undefined(Suffix.getConfiguration());
          // expect(Suffix.getConfiguration()).toBeDefined();
          // toBe.defined(Suffix.getConfiguration());
          Suffix.setSuffix(affix, { length, pattern });

          // Test.
          const suffix1 = Suffix.getSuffix();
          const configuration1 = Suffix.getSuffix()?.getConfiguration();
          expect(suffix1).toBeDefined();
          expect(configuration1).toBeDefined();
          isDefined(suffix1) &&
            isDefined(configuration1) &&
            specSuffix(suffix1, configuration1);

          // Test.
          const suffix2 = Suffix.setLength({ min: 5, max: 10 })
            .setSuffix(randomString(5), { length: { min: 5, max: 10 } })
            .setLength({})
            .getSuffix();
          const configuration2 = Suffix.getSuffix()?.getConfiguration();
          expect(suffix2).toBeDefined();
          expect(configuration2).toBeDefined();
          isDefined(suffix2) &&
            isDefined(configuration2) &&
            specSuffix(suffix2, configuration2);
        })

        /**
         * .setPattern()
         * .getPattern()
         */
        .it(`.setPattern() .getPattern()`, () => {
          Suffix.setPattern(null as any, (result, value, payload) => {
            expect(value).toBeNull();
            toBe.false(result).null(value);
            return result;
          });
          expect(Suffix.getPattern()).toEqual(/[^a-zA-Z0-9$_]/g);

          Suffix.setPattern(/[^a-z]/g, (result, value, payload) => {
            expect(value).toEqual(/[^a-z]/g);
            toBe.true(result).regexp(value);
            return result;
          });
          expect(Suffix.getPattern()).toEqual(/[^a-z]/g);
        })

        /**
         * .isSuffix()
         */
        .it(`isSuffix() equal to true`, () =>
          expect(Suffix.isSuffix(new Suffix(''))).toBeTrue()
        )
        .it(`isSuffix() equal to false`, () =>
          expect(Suffix.isSuffix(null as any)).toBeFalse()
        );
    })

    /**
     * `Suffix` instance.
     */
    .describe(`instance`, () => {
      testing
        .it(
          `specSuffix(new Suffix(affix, { length, pattern }), { length, pattern })`,
          () =>
            specSuffix(new Suffix(affix, { length, pattern }), {
              length,
              pattern,
            })
        )
        .it(`specSuffix({ length, pattern })`, () =>
          specSuffix(affix, { length, pattern })
        )
        .it(`specSuffix({ length })`, () => {
          specSuffix(affix, { length }, (suffix: any) => {
            expect(suffix.getPattern()).toBeUndefined();
            toBe
              .object(suffix.getLength())
              .objectKeys(suffix.getLength(), ['min', 'max'])
              .undefined(suffix?.getPattern());
          });
        })

        .it(`specSuffix({ pattern })`, () => {
          specSuffix(affix, { pattern }, (suffix) => {
            expect(suffix.getLength()).toBeUndefined();
            expect(suffix.getMaxLength()).toBeUndefined();
            expect(suffix.getMinLength()).toBeUndefined();
            expect(suffix.getPattern()).toBeDefined();
            toBe
              .undefined(suffix.getLength())
              .undefined(suffix.getMaxLength())
              .undefined(suffix.getMinLength())
              .defined(suffix.getPattern());
          });
        });
    });
});
