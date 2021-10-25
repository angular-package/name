import { Prefix } from '../affix/prefix/src/prefix.class';
import { Settings } from './settings.interface';
import { Suffix } from '../affix/suffix/src/suffix.class';
/**
 * Settings with `callback`, `length`, `pattern`, `prefix`, and `suffix` options for the name.
 */
export interface NameSettings<Min extends number, Max extends number> extends Partial<Settings<Min, Max>> {
  /**
   * Prefix of a `string` type or an instance of a `Prefix`.
   */
  prefix?: string | Prefix<any, any>;

  /**
   * Suffix of a `string` type or an instance of a `Suffix`.
   */
  suffix?: string | Suffix<any, any>;
}
