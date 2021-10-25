// Interface.
import { AffixSettings } from '../../interface/affix-settings.interface';
/**
 * The property of suffix configuration.
 */
export interface SuffixConfiguration<
  Min extends number = number,
  Max extends number = number
> {
  [index: string]: AffixSettings<Min, Max>;
}
