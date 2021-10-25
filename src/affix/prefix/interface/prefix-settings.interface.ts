// Interface.
import { AffixSettings } from '../../interface/affix-settings.interface';
/**
 * The settings shape with `length` and `pattern` for the `affix`.
 */
export interface PrefixSettings<
  Min extends number = number,
  Max extends number = number
> extends AffixSettings<Min, Max> {}
