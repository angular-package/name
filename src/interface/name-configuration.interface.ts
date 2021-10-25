import { NameSettings } from './name-settings.interface';

export interface NameConfiguration<Min extends number, Max extends number> {
  [index: string]: NameSettings<Min, Max>;
}