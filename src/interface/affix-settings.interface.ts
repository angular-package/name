// Interface.
import { Settings } from '../interface/settings.interface';
/**
 * The settings shape with `length` and `pattern` for the `affix`.
 */
export interface AffixSettings<
  Min extends number = number,
  Max extends number = number
> extends Partial<Settings<Min, Max>> {}
