import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tableheadercamel',
    pure: false
})

export class TableHeaderCamelCase {
    transform(value: string) {
        if ((typeof value) !== 'string') {
            return value;
        }
        value = value.split(/(?=[A-Z])/).join(' ');
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
} 