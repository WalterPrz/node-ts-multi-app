import fs from 'fs';
import { SaveFile } from './save-file.use-case';
import exp from 'constants';
import { beforeEach } from 'node:test';


describe('SaveFileUseCase', () => {

    afterEach(() => {
        const outputFolderExist = fs.existsSync('outputs')
        if (outputFolderExist) fs.rmSync('outputs', { recursive: true });
    })
    beforeEach(()=>{
        jest.clearAllMocks(); //no funciona para los spys, o funciones jest.fn();
    })
    test('Should save file with default values', () => {
        const filePath = 'outputs/table.txt'
        const saveFile = new SaveFile
        const options = {
            fileContent: 'test content'
        }
        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        expect(result).toBeTruthy();
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent)
    });
    test('Should save file with custom values', () => {

        const saveFile = new SaveFile
        const options = {
            fileContent: 'custom value content',
            destination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        }
        const filePath = `${options.destination}/${options.fileName}.txt`
        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        expect(result).toBeTruthy();
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent)
    })
    test('Should sreturn false if directory could not be created', () => {

        const saveFile = new SaveFile

        //mockImplementation cambia la funcion de mkdirsync por lo que esta adentro.
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is custom error message for testing'); }
        )
        const options = {
            fileContent: 'custom value content',
            destination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        }
        const filePath = `${options.destination}/${options.fileName}.txt`
        const result = saveFile.execute(options);
        expect(result).toBe(false)
        mkdirSpy.mockRestore();
    })
    test('Should sreturn false if file could not be created', () => {

        const saveFile = new SaveFile

        //mockImplementation cambia la funcion de mkdirsync por lo que esta adentro.
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is custom error message for testing'); }
        )
        const options = {
            fileContent: 'custom value content',
            destination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        }
        const filePath = `${options.destination}/${options.fileName}.txt`
        const result = saveFile.execute({fileContent: 'hola'});
        expect(result).toBe(false)
        writeFileSpy.mockRestore()
    })
})