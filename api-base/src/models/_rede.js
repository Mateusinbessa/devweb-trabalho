import { BaseModel } from './index.js';

const RedeModel = () => {
    const base = BaseModel(
		{
        	model: 'rede',
        	junctionTable: ''
    	})
    return {
        ...base
    }
}

export default { RedeModel }
export { RedeModel }
