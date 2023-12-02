import { i18n } from '.';

describe('i18n', () => {
  const i18nValue = {
    es: {
      'text.plain': 'Un recorrido por las maravillas de la mente',
      'interpolation.props':
        '¡Bienvenido a {name}!, esperamos poder crecer juntos',
      'interpolation.array': 'Felicitaciones a {0} y {1} por la victoria'
    },
    en: {
      'text.plain': 'A tour of the wonders of the mind',
      'interpolation.props': 'Welcome to {name}! We hope to grow together',
      'interpolation.array': 'Congratulations to {0} and {1} for the victory'
    }
  };

  const translate = i18n(i18nValue);

  it('should generate values with language default', () => {
    expect(translate('text.plain')).toBe(
      'Un recorrido por las maravillas de la mente'
    );

    expect(
      translate('interpolation.props', {
        interpolators: {
          name: 'Google'
        }
      })
    ).toBe('¡Bienvenido a Google!, esperamos poder crecer juntos');

    expect(
      translate('interpolation.array', {
        interpolators: ['Benzema', 'Cristiano Ronaldo']
      })
    ).toBe('Felicitaciones a Benzema y Cristiano Ronaldo por la victoria');
  });

  it('should generate values on change with language EN', () => {
    const translate = i18n(i18nValue);

    expect(translate('text.plain', { language: 'en' })).toBe(
      'A tour of the wonders of the mind'
    );

    expect(
      translate('interpolation.props', {
        language: 'en',
        interpolators: {
          name: 'Microsoft'
        }
      })
    ).toBe('Welcome to Microsoft! We hope to grow together');

    expect(
      translate('interpolation.array', {
        language: 'en',
        interpolators: ['Bale', 'Modric']
      })
    ).toBe('Congratulations to Bale and Modric for the victory');
  });

  it('should generate values on change language in execution', () => {
    expect(translate('text.plain', { language: 'en' })).toBe(
      'A tour of the wonders of the mind'
    );

    expect(
      translate('interpolation.props', {
        language: 'en',
        interpolators: {
          name: 'Google'
        }
      })
    ).toBe('Welcome to Google! We hope to grow together');

    expect(
      translate('interpolation.array', {
        language: 'en',
        interpolators: ['Cristiano Ronaldo', 'Benzema']
      })
    ).toBe('Congratulations to Cristiano Ronaldo and Benzema for the victory');

    expect(translate('text.plain')).toBe(
      'Un recorrido por las maravillas de la mente'
    );

    expect(
      translate('interpolation.props', {
        interpolators: {
          name: 'Apple'
        }
      })
    ).toBe('¡Bienvenido a Apple!, esperamos poder crecer juntos');

    expect(
      translate('interpolation.array', { interpolators: ['Modric', 'Bale'] })
    ).toBe('Felicitaciones a Modric y Bale por la victoria');
  });
});
