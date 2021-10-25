// @angular-package/type.
import {
  isDefined,
  isInstance,
  isStringType,
} from '@angular-package/type';
// @angular-package/testing.
import { TestingToBeMatchers } from '@angular-package/testing';
// Class.
import { Suffix } from '../affix/suffix/src/suffix.class';
// Interface.
import { SuffixSettings } from '../affix/suffix/interface/suffix-settings.interface';
/**
 * Initialize matchers.
 */
const toBe = new TestingToBeMatchers();
/**
 * The function to test `Suffix` instance.
 * @param affix Suffix string.
 * @param settings The settings.
 * @param additionalSpec Additional specs.
 */
export const specSuffix = <Min extends number, Max extends number>(
  affix: string | Suffix<Min, Max>,
  settings: SuffixSettings<Min, Max>,
  additionalSpec?: (suffix: Suffix<any, any>) => void
) => {
  let suffix!: Suffix<Min, Max>;

  isStringType(affix) &&
    (console.group(`new Suffix(${affix}, ${JSON.stringify(settings)})`),
    (suffix = new Suffix(affix, settings, (result, value, payload) => {
      toBe.true(result).string(value).object(payload);
      console.group(`callback(result, value, payload)`);
      console.log(`result: `, result);
      console.log(`value: `, value);
      console.log(`payload: `, payload);
      console.groupEnd();
      return result;
    })));

  isInstance(affix, Suffix) &&
    (console.group(affix, settings), (suffix = affix));

  isDefined(additionalSpec) && additionalSpec(suffix);

  /**
   * .get
   */
  console.log(`.get: `, suffix.get);
  console.log(settings.length);
  toBe
    .objectKeyIn(suffix, 'get')
    .string(suffix.get)
    .stringOfLength(suffix.get, { max: settings.length?.max });

  /**
   * .length
   */
  console.log(`.length: `, suffix.length);
  expect(suffix.length).toEqual(suffix.get.length);

  /**
   * .getConfiguration()
   */
  console.log(`.getConfiguration(): `, suffix.getConfiguration());
  // toBe.object(suffix.getConfiguration());
  // expect(suffix.getConfiguration()).toEqual(settings as any);

  /**
   * .getLength()
   */
  console.log(`.getLength(): `, suffix.getLength());
  isDefined(settings?.length) &&
    (toBe
      .objectKeys(suffix.getLength(), ['min', 'max'])
      .number(suffix.getLength()?.max)
      .number(suffix.getLength()?.min)
      .object(suffix.getLength()),
    expect(suffix.getLength()).toEqual(settings.length));

  /**
   * .getPattern()
   */
  console.log(`.getPattern(): `, suffix.getPattern());
  isDefined(settings) &&
    settings.pattern &&
    expect(suffix.getPattern()).toEqual(settings.pattern) &&
    toBe.regexp(suffix.getPattern());

  /**
   * .valueOf()
   */
  console.log(`.valueOf(): `, suffix.valueOf());
  toBe
    .string(suffix.valueOf())
    .stringOfLength(suffix.valueOf(), { max: settings?.length?.max } || {});
  expect(suffix.valueOf()).toEqual(suffix.get);

  console.groupEnd();
};
