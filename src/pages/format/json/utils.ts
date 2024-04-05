export const getJsonType = (value: unknown) => {
    if (value === null) {
        return 'string';
    } else if (Array.isArray(value)) {
        return 'array';
    } else if (typeof value === 'object') {
        return 'object';
    }

    switch (typeof value) {
        case'string':
            return 'string';
        case'boolean':
            return 'boolean';
        case 'number':
            return 'number';
        default:
            return 'string';
    }
}