import {test,describe,vi, expect,Mocked} from 'vitest'
import {testFn,request} from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios=axios as Mocked<typeof axios>

describe('functions',()=>{
    test('creaate a mock function',()=>{
        const callback=vi.fn()
        testFn(12,callback)
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledWith(12)
    })
    test('spy on method',()=>{
        const obj={
            getName:()=>1
        }
        const spy=vi.spyOn(obj,'getName')
        obj.getName()
        expect(spy).toHaveBeenCalled()
        obj.getName()
        expect(spy).toHaveBeenCalledTimes(2)
    })
    test('mock third party modelt',async()=>{
        // mockedAxios.get.mockImplementation(()=>Promise.resolve({data:123}))
        mockedAxios.get.mockResolvedValue({data:1234})
        const result=await request()
        expect(result).toBe(123)
    })
})