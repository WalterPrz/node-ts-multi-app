import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// npx ts-node src/app --base 10
export const yarg = yargs(hideBin(process.argv))
    .options('b', {
        alias: 'base',
        type: 'number',
        demandOption: true, //es para que sea obligatorio enviarlo,
        describe: 'Multiplication table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit',
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .check((argv, options) => {
        if (argv.b < 1) throw 'Error: base must be greater than 0';
        return true;
    })
    .options('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'File name'
    })
    .options('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'File destination'
    })
    .parseSync()
