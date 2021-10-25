// Interface.
import { AffixSettings } from './affix-settings.interface';
/**
 * The property of prefix configuration.
 */
export interface PrefixConfiguration<
  Min extends number = number,
  Max extends number = number
> extends AffixSettings<Min, Max> {}
