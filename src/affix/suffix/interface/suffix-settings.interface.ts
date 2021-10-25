// Interface.
import { AffixSettings } from '../../interface/affix-settings.interface';
/**
 * The settings shape with `length` and `pattern` for the `Suffix`.
 */
export interface SuffixSettings<
  Min extends number = number,
  Max extends number = number
> extends AffixSettings<Min, Max> {}
