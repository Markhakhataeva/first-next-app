import {
    Container,
    MantineThemeComponent,
    MantineThemeOverride,
    rem,
    TextInput,
} from '@mantine/core'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
})

const CONTAINER_SIZES: Record<string, string> = {
    xs: rem(400),
    sm: rem(500),
    md: rem(600),
    lg: rem(900),
    xl: rem(1400),
}

const inputs = [
    'Input',
    'InputBase',
    'TextInput',
    'PasswordInput',
    'NumberInput',
    'Select',
    'MultiSelect',
    'DatePickerInput',
]
const defaultInputs: Record<string, MantineThemeComponent> = {}

inputs.forEach(x => {
    defaultInputs[x] = TextInput.extend({
        defaultProps: {
            size: 'md',
        },
    })
})

export const theme: MantineThemeOverride = {
    fontFamily: montserrat.style.fontFamily,
    fontSizes: {
        xsm: rem(14),
    },
    defaultRadius: 'md',
    black: '#2C2F3A',
    colors: {
        'old-blue': [
            '',
            '#F8FAFE',
            '#EDF6FA',
            '#DDF2FD',
            '#63BAFF',
            '',
            '#277EFF',
            '',
            '#2659CD',
            '',
        ],
    },
    components: {
        Container: Container.extend({
            vars: (_, { size, fluid }) => ({
                root: {
                    '--container-size': fluid
                        ? '100%'
                        : size !== undefined && size in CONTAINER_SIZES
                            ? CONTAINER_SIZES[size]
                            : rem(size),
                },
            }),
            defaultProps: {
                size: 'xl',
            },
        }),
        ...defaultInputs,
    },
}