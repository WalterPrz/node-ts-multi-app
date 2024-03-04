import exp from "constants";
import { ServerApp } from "./server-app"
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { option } from "yargs";

describe('Test server-app', () => {
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-filename',
        destination: 'test-destination'
    }
    test('should create ServerApp instance', async () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe('function')

    })
    test('should run serverApp with options', async () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute')
        ServerApp.run(options)
        expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledWith('Server running')
        expect(logSpy).toHaveBeenCalledWith('File created!')
        expect(createTableSpy).toHaveBeenCalledTimes(1)
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, "limit": options.limit })
        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: options.destination,
            fileName: options.name
        })


    })

    test('should run with custom values mocked', async () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 1 = 1') //*son funciones si una funcion fue llamada, es similar a un spy.
        const saveFileMock = jest.fn()
        console.log = logMock
        console.error = logErrorMock
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        ServerApp.run(options)
        expect(logMock).toHaveBeenCalledWith('Server running...')
        expect(createMock).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit })
        expect(saveFileMock).toHaveBeenCalledWith({ destination: "test-destination", fileContent: "1 x 1 = 1", fileName: "test-filename" })
        //expect(logMock).toHaveBeenCalledWith('File created!');
    })

})