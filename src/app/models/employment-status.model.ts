export interface EmploymentStatusOption {
    value: string;
    label: string;
}

export const EMPLOYMENT_STATUS_OPTIONS: EmploymentStatusOption[] = [
    { value: 'empleado', label: 'Empleado' },
    { value: 'desempleado', label: 'Desempleado' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'emprendedor', label: 'Emprendedor' },
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'jubilado', label: 'Jubilado' }
];
