// Interface.
import { Settings } from '../interface/settings.interface';
/**
 * The property of affix configuration.
 */
export interface AffixConfiguration<
  Min extends number = number,
  Max extends number = number
> extends Partial<Settings<Min, Max>> {}
