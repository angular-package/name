// Interface.
import { PrefixSettings } from './prefix-settings.interface';
/**
 * The property of prefix configuration.
 */
export interface PrefixConfiguration<
  Min extends number = number,
  Max extends number = number,
> {
  [index: string]: PrefixSettings<Min, Max>;
}
