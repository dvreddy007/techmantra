import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'columnheadercamel',
    pure: false
})

export class ColumnHeaderCamelCase {
    transform(value: string) {
        if ((typeof value) !== 'string') {
            return value;
        }
        value = value.replace(/_/g, " ");
        value = value.split(/(?=[A-Z])/).join(' ');
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
} 