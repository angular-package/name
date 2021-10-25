// Interface.
import { AffixSettings } from './affix-settings.interface';
/**
 * The property of suffix configuration.
 */
export interface SuffixConfiguration<
  Min extends number = number,
  Max extends number = number
> extends AffixSettings<Min, Max> {}
