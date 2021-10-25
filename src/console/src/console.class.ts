import { ConsoleColor } from '../type/console-color.type';
import { ConsoleStyle } from '../type/console-style.type';

export class ConsoleClass {
  #colors = {
    default: '\x1b[0m',
    reset: '\x1b[0m',

    // text color
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    // background color
    defaultBg: '\x1b[39m',
    blackBg: '\x1b[40m',
    redBg: '\x1b[41m',
    greenBg: '\x1b[42m',
    yellowBg: '\x1b[43m',
    blueBg: '\x1b[44m',
    magentaBg: '\x1b[45m',
    cyanBg: '\x1b[46m',
    whiteBg: '\x1b[47m',
  };

  #styles: { [index: string]: string } = {
    bold: '\x1b[1m',
    reset: '\x1b[0m',
    faint: '\x1b[2m',
    italic: ''
  };

  #text = '';

  blue(text: string, style?: ConsoleStyle): this {
    this.#prepare(text, 'blue', style);

    return this;
  }

  green(text: string, style?: ConsoleStyle): this {
    this.#prepare(text, 'green', style);

    return this;
  }

  info(): this {
    console.info(`${this.#text}`);
    this.#text = '';

    return this;
  }

  log(display: boolean = true): this {
    (display === true) && console.log(`${this.#styles.reset}${this.#text} ${this.#styles.reset}`);
    this.#text = '';

    return this;
  }

  red(text: string, style?: ConsoleStyle): this {
    this.#prepare(text, 'red', style);

    return this;
  }

  text<Style extends ConsoleStyle>(text: string, color?: ConsoleColor, style?: Style): this {
    this.#prepare(text, color, style);

    return this;
  }

  yellow(text: string, style?: ConsoleStyle): this {
    this.#prepare(text, 'yellow', style);

    return this;
  }

  #prepare(
    text: string,
    color: ConsoleColor = 'reset',
    style?: ConsoleStyle
  ): string {
    let styles = '';
    (style) && style.forEach((s: string) => {
      styles = `${styles}${this.#styles[s]}`;
    });

    return (this.#text = `${this.#text}${this.#colors[color]}${styles}${text}${
      this.#styles.reset
    }`);
  }
}
