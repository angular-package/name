import { MinMax } from '@angular-package/type';
/**
 * Common settings.
 */
export interface Settings<Min extends number, Max extends number> {
  /**
   * Length of the name.
   */
  length: MinMax<Min, Max>;

  /**
   * Pattern to filter provided name.
   */
  pattern: RegExp;
}
