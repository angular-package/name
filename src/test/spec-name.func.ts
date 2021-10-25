import { NameSettings } from '../interface/name-settings.interface';
import { Name } from '../lib/name.class';
import { ResultCallback } from '@angular-package/type';

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
  expect(nameInstance.get).toEqual(name);
  expect(nameInstance.length).toEqual(name.length);
  expect(nameInstance.getConfiguration()).toEqual(settings as any);
};
