// @angular-package/type.
import {
  isDefined,
  isInstance,
  isStringType,
} from '@angular-package/type';
// @angular-package/testing.
import { TestingToBeMatchers } from '@angular-package/testing';
// Class.
import { Prefix } from '../src/lib/prefix.class';
// Interface.
import { PrefixSettings } from '../src/interface/prefix-settings.interface';
/**
 * Initialize matchers.
 */
const toBe = new TestingToBeMatchers();
/**
 * The function to test `Prefix` instance.
 * @param affix Prefix string.
 * @param settings The settings.
 * @param additionalSpec Additional specs.
 */
export const specPrefix = <Min extends number, Max extends number>(
  affix: string | Prefix<Min, Max>,
  settings: PrefixSettings<Min, Max>,
  additionalSpec?: (prefix: Prefix<any, any>) => void
) => {
  let prefix!: Prefix<Min, Max>;

  isStringType(affix) &&
    (console.group(`new Prefix(${affix}, ${JSON.stringify(settings)})`),
    (prefix = new Prefix(affix, settings, (result, value, payload) => {
      toBe.true(result).string(value).object(payload);
      console.group(`callback(result, value, payload)`);
      console.log(`result: `, result);
      console.log(`value: `, value);
      console.log(`payload: `, payload);
      console.groupEnd();
      return result;
    })));

  isInstance(affix, Prefix) &&
    (console.group(affix, settings), (prefix = affix));

  isDefined(additionalSpec) && additionalSpec(prefix);

  /**
   * .get
   */
  console.log(`.get: `, prefix.get);
  console.log(settings.length);
  toBe
    .objectKeyIn(prefix, 'get')
    .string(prefix.get)
    .stringOfLength(prefix.get, { max: settings.length?.max });

  /**
   * .length
   */
  console.log(`.length: `, prefix.length);
  expect(prefix.length).toEqual(prefix.get.length);

  /**
   * .getConfiguration()
   */
  console.log(`.getConfiguration(): `, prefix.getConfiguration());
  toBe.object(prefix.getConfiguration());
  expect(prefix.getConfiguration()).toEqual(settings as any);

  /**
   * .getLength()
   */
  console.log(`.getLength(): `, prefix.getLength());
  isDefined(settings?.length) &&
    (toBe
      .objectKeys(prefix.getLength(), ['min', 'max'])
      .number(prefix.getLength()?.max)
      .number(prefix.getLength()?.min)
      .object(prefix.getLength()),
    expect(prefix.getLength()).toEqual(settings.length));

  /**
   * .getPattern()
   */
  console.log(`.getPattern(): `, prefix.getPattern());
  isDefined(settings) &&
    settings.pattern &&
    expect(prefix.getPattern()).toEqual(settings.pattern) &&
    toBe.regexp(prefix.getPattern());

  /**
   * .valueOf()
   */
  console.log(`.valueOf(): `, prefix.valueOf());
  toBe
    .string(prefix.valueOf())
    .stringOfLength(prefix.valueOf(), { max: settings?.length?.max } || {});
  expect(prefix.valueOf()).toEqual(prefix.get);

  console.groupEnd();
};
