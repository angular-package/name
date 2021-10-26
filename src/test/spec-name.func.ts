// @angular-package/type.
import { isDefined, isString } from '@angular-package/type';
import { TestingToBeMatchers } from '@angular-package/testing';
// Class.
import { Name } from '../lib/name.class';
import { Prefix } from '../affix/prefix/src/prefix.class';
import { Suffix } from '../affix/suffix/src/suffix.class';
// Interface.
import { NameSettings } from '../interface/name-settings.interface';
/**
 * Initialize matchers.
 */
const toBe = new TestingToBeMatchers();
/**
 *
 * @param name
 * @param settings
 */
export const specName = <Min extends number, Max extends number>(
  name: string,
  settings?: NameSettings<Min, Max>
) => {
  const nameInstance = new Name(name, settings, (result, value, payload) => {
    console.log(result, value, payload);
    expect(result).toBeTrue();
    expect(value).toEqual(name);
    expect(payload?.length).toEqual(settings?.length);
    return result;
  });

  /**
   * set `Prefix` instance.
   */
  const prefix = isString(settings?.prefix)
    ? new Prefix(settings?.prefix || '')
    : settings?.prefix;

  /**
   * set `Suffix` instance.
   */
  const suffix = isString(settings?.suffix)
    ? new Suffix(settings?.suffix || '')
    : settings?.suffix;

  console.log(prefix?.getConfiguration(), suffix?.getConfiguration());

  //#region instance properties.
  /**
   * .get
   */
  expect(nameInstance.get).toEqual(name.replace(settings?.pattern || '', ''));

  /**
   * .name
   */
  expect(nameInstance.name).toEqual(
    `${isDefined(prefix) ? prefix?.get : ''}${name.replace(
      settings?.pattern || '',
      ''
    )}${isDefined(suffix) ? suffix.get : ''}`
  );

  /**
   * .length
   */
  expect(nameInstance.length).toEqual(
    name.replace(settings?.pattern || '', '').length
  );
  //#endregion instance properties.

  //#region instance methods.
  /**
   * .getConfiguration()
   */
  expect(nameInstance.getConfiguration()).toEqual(settings as any);
  toBe
    .object(nameInstance.getConfiguration())
    .regexp(nameInstance.getConfiguration().pattern)
    .number(nameInstance.getConfiguration().length?.max)
    .number(nameInstance.getConfiguration().length?.min)
    .string(nameInstance.getConfiguration().prefix)
    .string(nameInstance.getConfiguration().suffix);

  /**
   * .getLength()
   */
  expect(nameInstance.getLength()).toEqual(settings?.length);
  toBe
    .object(nameInstance.getLength())
    .number(nameInstance.getLength()?.max)
    .number(nameInstance.getLength()?.min);

  /**
   * .getMaxLength()
   */
  expect(nameInstance.getMaxLength()).toEqual(settings?.length?.max);
  toBe.number(nameInstance.getMaxLength());

  /**
   * .getMinLength()
   */
  expect(nameInstance.getMinLength()).toEqual(settings?.length?.min);
  toBe.number(nameInstance.getMinLength());

  /**
   * .getPattern()
   */
  expect(nameInstance.getPattern()).toEqual(settings?.pattern);
  toBe.regexp(nameInstance.getPattern());

  /**
   * .getPrefix()
   */
  nameInstance.getPrefix();
  expect(nameInstance.getPrefix()).toEqual(prefix);

  /**
   * .getSuffix()
   */
  nameInstance.getSuffix();
  expect(nameInstance.getSuffix()).toEqual(suffix);

  /**
   * .valueOf()
   */
  expect(nameInstance.valueOf()).toEqual(
    name.replace(settings?.pattern || '', '')
  );
  //#endregion instance methods.
};
