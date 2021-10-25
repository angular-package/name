import { Testing, randomString, TestingToBeMatchers } from '@angular-package/testing';
import { MinMax } from '@angular-package/type';
import { Name } from '../lib/name.class';
import { specName } from './spec-name.func';
/**
 * Initialize Testing.
 */
const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();
/**
 * 
 */
testing.describe(`Name`, () => {

  let name = '';
  let max: number;
  let min: number;
  let length: {};
  let pattern: RegExp;

  beforeEach(() => {
    name = randomString(10);
    max = name.length;
    min = 0;
    length = {
      max,
      min
    };
    pattern = /^[a-z]/g;
  });

  testing
  .describe(`static`, () => {
    testing.it(``, () => {
    });
  })
  .describe(`instance`, () => {
    testing.it(``, () => {
      // specName(name);
      specName(name, { length, pattern });
    });
  });
});
