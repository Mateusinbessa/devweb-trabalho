import { BaseModel } from './index.js';

const TesteModel = () => {
    const base = BaseModel(
		{
        	model: 'teste',
        	junctionTable: ''
    	})
    return {
        ...base
    }
}

export default { TesteModel }
export { TesteModel }
