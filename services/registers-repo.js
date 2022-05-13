
// registers in JSON file for simplicity, store in a db for production applications
import { supabase } from './supabaseClient'


export const users = {
    getUser: async (email) => await supabase.from('Users').select('*').eq('email', email),
    getAll: async (email) => await supabase.from('Users').select('*'),
    create: async (register) => await supabase.from('Users').insert(register),
    update: async (id, params) => await supabase.from('Users').update(params).match({id}),
    delete: _delete
};





function _delete(id) {
    // filter out deleted register and save
    registers = registers.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}
