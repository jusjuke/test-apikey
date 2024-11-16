import { createClient } from '@supabase/supabase-js';



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;



if (!supabaseUrl || !supabaseAnonKey) {

    throw new Error('Missing Supabase environment variables');

}



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {

    auth: {

        persistSession: true,

        autoRefreshToken: true,

    },

    db: {

        schema: 'public'

    },

    global: {

        headers: {

            'x-my-custom-header': 'my-app-name',

        },

    },

});



// 연결 테스트

supabase.from('api_keys').select('count').then(({ data, error }) => {

    if (error) {

        console.error('Supabase connection test failed:', error.message);

    } else {

        console.log('Supabase connection test successful');

    }

}); 


