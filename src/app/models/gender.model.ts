export interface GenderOption {
    value: string;
    label: string;
}

export const GENDER_OPTIONS: GenderOption[] = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' },
    { value: 'prefiero-no-decir', label: 'Prefiero no decir' }
];
