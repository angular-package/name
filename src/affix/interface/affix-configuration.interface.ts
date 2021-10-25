// Interface.
import { AffixSettings } from './affix-settings.interface';
/**
 * The property of affix configuration.
 */
export interface AffixConfiguration<
  Min extends number = number,
  Max extends number = number
> {
  [index: string]: AffixSettings<Min, Max>;
}
